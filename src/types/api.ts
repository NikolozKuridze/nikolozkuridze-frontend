// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Backend Response Types (direct from API)
export interface AuthLoginResponse {
  success: boolean;
  token: string;
  admin: Admin;
  message?: string;
}

export interface AuthVerifyResponse {
  success: boolean;
  admin: Admin;
  message?: string;
}

export interface BlogsResponse {
  success: boolean;
  blogs: Blog[];
  message?: string;
}

export interface BlogResponse {
  success: boolean;
  blog: Blog;
  message?: string;
}

export interface ProjectsResponse {
  success: boolean;
  projects: Project[];
  message?: string;
}

export interface ProjectResponse {
  success: boolean;
  project: Project;
  message?: string;
}

export interface MessageResponse {
  success: boolean;
  message: string;
}

export interface PaginatedBlogsResponse {
  success: boolean;
  blogs: Blog[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

// Admin Types
export interface Admin {
  id: string;
  email: string;
  name: string;
}

export interface AuthResponse {
  admin: Admin;
  token: string;
}

// Author Type
export interface Author {
  name: string;
  bio?: string;
  avatar?: string;
}

export interface BlogFormData {
  title: {
    en: string;
    ka: string;
  };
  description: {
    en: string;
    ka: string;
  };
  content: {
    en: string;
    ka: string;
  };
  slug: string;
  category: string;
  tags: string[];
  thumbnail?: string;
  author: string; // Changed from Author object to string
  published: boolean;
  featured: boolean;
}

// This is how your Blog type should look when fetched from the API
export interface Blog {
  id: string;
  title: {
    en: string;
    ka: string;
  };
  description: {
    en: string;
    ka: string;
  };
  content: {
    en: string;
    ka: string;
  };
  slug: string;
  category: string;
  tags: string[];
  thumbnail?: string;
  author: string; // This should be string in the database
  published: boolean;
  featured: boolean;
  views: number;
  createdAt: string;
  updatedAt: string;
}

// Project Types
export interface Project {
  id: string;
  title: {
    en: string;
    ka: string;
  };
  description: {
    en: string;
    ka: string;
  };
  longDescription?: {
    en: string;
    ka: string;
  } | null;
  category: string;
  technologies: string[];
  image?: string;
  demoUrl?: string;
  githubUrl?: string;
  published: boolean;
  featured: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectFormData {
  title: {
    en: string;
    ka: string;
  };
  description: {
    en: string;
    ka: string;
  };
  longDescription?: {
    en: string;
    ka: string;
  } | null;
  category: string;
  technologies: string[];
  image?: string;
  demoUrl?: string;
  githubUrl?: string;
  published: boolean;
  featured: boolean;
  order: number;
}

// Stats Types
export interface DashboardStats {
  totalBlogs: number;
  publishedBlogs: number;
  totalProjects: number;
  totalViews: number;
}

export interface RecentActivity {
  type: 'blog' | 'project';
  title: string;
  time: string;
  status: string;
}
