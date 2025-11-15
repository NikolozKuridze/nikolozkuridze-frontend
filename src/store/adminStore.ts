import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';
import { authService } from '../services/api.service';
import type { Admin } from '../types/api';

const API_URL = import.meta.env.VITE_API_URL || 'https://api.nikolozkuridze.com';

interface AdminState {
  admin: Admin | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  verifyToken: () => Promise<boolean>;
}

export const useAdminStore = create<AdminState>()(
  persist(
    (set, get) => ({
      admin: null,
      token: null,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        try {
          const response = await authService.login(email, password);

          set({
            admin: response.admin,
            token: response.token,
            isAuthenticated: true
          });
        } catch (error) {
          console.error('Login error:', error);
          throw new Error(error instanceof Error ? error.message : 'Invalid credentials');
        }
      },

      logout: () => {
        set({
          admin: null,
          token: null,
          isAuthenticated: false
        });
      },

      verifyToken: async () => {
        const { token } = get();
        if (!token) return false;

        try {
          const response = await authService.verify();

          set({
            admin: response.admin,
            isAuthenticated: true
          });
          return true;
        } catch (error) {
          console.error('Token verification error:', error);
          set({
            admin: null,
            token: null,
            isAuthenticated: false
          });
          return false;
        }
      }
    }),
    {
      name: 'admin-storage'
    }
  )
);

// Create axios instance with auth header
export const adminApi = axios.create({
  baseURL: API_URL
});

adminApi.interceptors.request.use((config) => {
  const token = useAdminStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor for error handling
adminApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      useAdminStore.getState().logout();
    }
    return Promise.reject(error);
  }
);
