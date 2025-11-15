import { adminApi } from '../store/adminStore';
import type {
  ApiResponse,
  AuthResponse,
  Blog,
  BlogFormData,
  Project,
  ProjectFormData,
  DashboardStats,
  RecentActivity
} from '../types/api';

// Authentication Services
export const authService = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await adminApi.post<ApiResponse<AuthResponse>>('/api/auth/login', {
      email,
      password
    });

    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.error || 'Login failed');
    }

    return response.data.data;
  },

  verify: async (): Promise<AuthResponse> => {
    const response = await adminApi.post<ApiResponse<AuthResponse>>('/api/auth/verify');

    if (!response.data.success || !response.data.data) {
      throw new Error('Token verification failed');
    }

    return response.data.data;
  }
};

// Blog Services
export const blogService = {
  getAll: async (): Promise<Blog[]> => {
    const response = await adminApi.get<ApiResponse<Blog[]>>('/api/admin/blogs');

    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.error || 'Failed to fetch blogs');
    }

    return response.data.data;
  },

  getById: async (id: string): Promise<Blog> => {
    const response = await adminApi.get<ApiResponse<Blog>>(`/api/admin/blogs/${id}`);

    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.error || 'Failed to fetch blog');
    }

    return response.data.data;
  },

  create: async (data: BlogFormData): Promise<Blog> => {
    const response = await adminApi.post<ApiResponse<Blog>>('/api/admin/blogs', data);

    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.error || 'Failed to create blog');
    }

    return response.data.data;
  },

  update: async (id: string, data: BlogFormData): Promise<Blog> => {
    const response = await adminApi.put<ApiResponse<Blog>>(`/api/admin/blogs/${id}`, data);

    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.error || 'Failed to update blog');
    }

    return response.data.data;
  },

  delete: async (id: string): Promise<void> => {
    const response = await adminApi.delete<ApiResponse<void>>(`/api/admin/blogs/${id}`);

    if (!response.data.success) {
      throw new Error(response.data.error || 'Failed to delete blog');
    }
  }
};

// Project Services
export const projectService = {
  getAll: async (): Promise<Project[]> => {
    const response = await adminApi.get<ApiResponse<Project[]>>('/api/admin/projects');

    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.error || 'Failed to fetch projects');
    }

    return response.data.data;
  },

  getById: async (id: string): Promise<Project> => {
    const response = await adminApi.get<ApiResponse<Project>>(`/api/admin/projects/${id}`);

    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.error || 'Failed to fetch project');
    }

    return response.data.data;
  },

  create: async (data: ProjectFormData): Promise<Project> => {
    const response = await adminApi.post<ApiResponse<Project>>('/api/admin/projects', data);

    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.error || 'Failed to create project');
    }

    return response.data.data;
  },

  update: async (id: string, data: ProjectFormData): Promise<Project> => {
    const response = await adminApi.put<ApiResponse<Project>>(`/api/admin/projects/${id}`, data);

    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.error || 'Failed to update project');
    }

    return response.data.data;
  },

  delete: async (id: string): Promise<void> => {
    const response = await adminApi.delete<ApiResponse<void>>(`/api/admin/projects/${id}`);

    if (!response.data.success) {
      throw new Error(response.data.error || 'Failed to delete project');
    }
  }
};

// Dashboard Services
export const dashboardService = {
  getStats: async (): Promise<DashboardStats> => {
    const response = await adminApi.get<ApiResponse<DashboardStats>>('/api/admin/dashboard/stats');

    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.error || 'Failed to fetch stats');
    }

    return response.data.data;
  },

  getRecentActivity: async (): Promise<RecentActivity[]> => {
    const response = await adminApi.get<ApiResponse<RecentActivity[]>>('/api/admin/dashboard/activity');

    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.error || 'Failed to fetch recent activity');
    }

    return response.data.data;
  }
};
