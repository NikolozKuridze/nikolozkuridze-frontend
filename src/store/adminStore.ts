import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

interface Admin {
  id: string;
  email: string;
  name: string;
}

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
          const response = await axios.post(`${API_URL}/auth/login`, {
            email,
            password
          });

          if (response.data.success) {
            set({
              admin: response.data.admin,
              token: response.data.token,
              isAuthenticated: true
            });
          }
        } catch {
          throw new Error('Invalid credentials');
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
          const response = await axios.post(
            `${API_URL}/auth/verify`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          );

          if (response.data.success) {
            set({
              admin: response.data.admin,
              isAuthenticated: true
            });
            return true;
          }
          return false;
        } catch {
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
