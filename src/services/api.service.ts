import { adminApi } from '../store/adminStore';
import axios from 'axios';
import type {
  AuthResponse,
  AuthLoginResponse,
  AuthVerifyResponse,
  Blog,
  BlogFormData,
  BlogsResponse,
  BlogResponse,
  Project,
  ProjectFormData,
  ProjectsResponse,
  ProjectResponse,
  MessageResponse,
  PaginatedBlogsResponse,
  DashboardStats,
  RecentActivity
} from '../types/api';

const API_URL = import.meta.env.VITE_API_URL || 'https://api.nikolozkuridze.com';

// Public API instance (no auth required)
const publicApi = axios.create({
  baseURL: API_URL
});

// Authentication Services
export const authService = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await adminApi.post<AuthLoginResponse>('/auth/login', {
      email,
      password
    });

    if (!response.data.success) {
      throw new Error(response.data.message || 'Login failed');
    }

    return {
      admin: response.data.admin,
      token: response.data.token
    };
  },

  verify: async (): Promise<AuthResponse> => {
    const response = await adminApi.post<AuthVerifyResponse>('/auth/verify');

    if (!response.data.success) {
      throw new Error('Token verification failed');
    }

    return {
      admin: response.data.admin,
      token: '' // Token is already stored in adminStore
    };
  },

  changePassword: async (currentPassword: string, newPassword: string): Promise<void> => {
    const response = await adminApi.post<MessageResponse>('/auth/change-password', {
      currentPassword,
      newPassword
    });

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to change password');
    }
  }
};

// Admin Blog Services (require authentication)
export const blogService = {
  getAll: async (): Promise<Blog[]> => {
    const response = await adminApi.get<BlogsResponse>('/blogs/all');

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to fetch blogs');
    }

    return response.data.blogs;
  },

  getById: async (id: string): Promise<Blog> => {
    const response = await adminApi.get<BlogResponse>(`/blogs/${id}`);

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to fetch blog');
    }

    return response.data.blog;
  },

  create: async (data: BlogFormData): Promise<Blog> => {
    const response = await adminApi.post<BlogResponse>('/blogs', data);

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to create blog');
    }

    return response.data.blog;
  },

  update: async (id: string, data: BlogFormData): Promise<Blog> => {
    const response = await adminApi.put<BlogResponse>(`/blogs/${id}`, data);

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to update blog');
    }

    return response.data.blog;
  },

  delete: async (id: string): Promise<void> => {
    const response = await adminApi.delete<MessageResponse>(`/blogs/${id}`);

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to delete blog');
    }
  }
};

// Public Blog Services (no authentication required)
export const publicBlogService = {
  getPublished: async (params?: {
    page?: number;
    limit?: number;
    category?: string;
    featured?: boolean;
  }): Promise<PaginatedBlogsResponse> => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.category) queryParams.append('category', params.category);
    if (params?.featured !== undefined) queryParams.append('featured', params.featured.toString());

    const url = `/blogs${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    const response = await publicApi.get<PaginatedBlogsResponse>(url);

    if (!response.data.success) {
      throw new Error('Failed to fetch published blogs');
    }

    return response.data;
  },

  getBySlug: async (slug: string): Promise<Blog> => {
    const response = await publicApi.get<BlogResponse>(`/blogs/${slug}`);

    if (!response.data.success) {
      throw new Error('Failed to fetch blog');
    }

    return response.data.blog;
  }
};

// Admin Project Services (require authentication)
export const projectService = {
  getAll: async (): Promise<Project[]> => {
    const response = await adminApi.get<ProjectsResponse>('/projects/all');

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to fetch projects');
    }

    return response.data.projects;
  },

   getPublished: async (): Promise<Project[]> => {
    const response = await adminApi.get<ProjectsResponse>('/projects');

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to fetch projects');
    }

    return response.data.projects;
  },

  getById: async (id: string): Promise<Project> => {
    const response = await adminApi.get<ProjectResponse>(`/projects/${id}`);

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to fetch project');
    }

    return response.data.project;
  },

  create: async (data: ProjectFormData): Promise<Project> => {
    const response = await adminApi.post<ProjectResponse>('/projects', data);

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to create project');
    }

    return response.data.project;
  },

  update: async (id: string, data: ProjectFormData): Promise<Project> => {
    const response = await adminApi.put<ProjectResponse>(`/projects/${id}`, data);

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to update project');
    }

    return response.data.project;
  },

  delete: async (id: string): Promise<void> => {
    const response = await adminApi.delete<MessageResponse>(`/projects/${id}`);

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to delete project');
    }
  }
};

// Public Project Services (no authentication required)
export const publicProjectService = {
  getPublished: async (params?: {
    featured?: boolean;
    category?: string;
  }): Promise<Project[]> => {
    const queryParams = new URLSearchParams();
    if (params?.featured !== undefined) queryParams.append('featured', params.featured.toString());
    if (params?.category) queryParams.append('category', params.category);

    const url = `/projects${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    const response = await publicApi.get<ProjectsResponse>(url);

    if (!response.data.success) {
      throw new Error('Failed to fetch published projects');
    }

    return response.data.projects;
  },

  getById: async (id: string): Promise<Project> => {
    const response = await publicApi.get<ProjectResponse>(`/projects/${id}`);

    if (!response.data.success) {
      throw new Error('Failed to fetch project');
    }

    return response.data.project;
  }
};

// Dashboard Services (calculated from blogs and projects)
export const dashboardService = {
  getStats: async (): Promise<DashboardStats> => {
    // Fetch blogs and projects in parallel
    const [blogs, projects] = await Promise.all([
      blogService.getAll(),
      projectService.getAll()
    ]);

    // Calculate stats
    const publishedBlogs = blogs.filter(blog => blog.published).length;
    const totalViews = blogs.reduce((sum, blog) => sum + (blog.views || 0), 0);

    return {
      totalBlogs: blogs.length,
      publishedBlogs,
      totalProjects: projects.length,
      totalViews
    };
  },

  getRecentActivity: async (): Promise<RecentActivity[]> => {
    // Fetch blogs and projects in parallel
    const [blogs, projects] = await Promise.all([
      blogService.getAll(),
      projectService.getAll()
    ]);

    // Combine and sort by date
    const activities: RecentActivity[] = [];

    // Add blog activities
    blogs.slice(0, 5).forEach(blog => {
      activities.push({
        type: 'blog',
        title: blog.title.en,
        time: new Date(blog.updatedAt).toISOString(),
        status: blog.published ? 'published' : 'draft'
      });
    });

    // Add project activities
    projects.slice(0, 5).forEach(project => {
      activities.push({
        type: 'project',
        title: project.title.en,
        time: new Date(project.updatedAt).toISOString(),
        status: project.published ? 'published' : 'draft'
      });
    });

    // Sort by time (most recent first) and return top 10
    return activities
      .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
      .slice(0, 10);
  }
};
