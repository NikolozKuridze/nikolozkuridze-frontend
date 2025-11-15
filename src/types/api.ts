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
}

export interface AuthVerifyResponse {
  success: boolean;
  admin: Admin;
}

export interface BlogsResponse {
  success: boolean;
  blogs: Blog[];
}

export interface BlogResponse {
  success: boolean;
  blog: Blog;
}

export interface ProjectsResponse {
  success: boolean;
  projects: Project[];
}

export interface ProjectResponse {
  success: boolean;
  project: Project;
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

// Blog Types
export interface Blog {
  _id: string;
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
  author: Author;
  published: boolean;
  featured: boolean;
  views: number;
  createdAt: string;
  updatedAt: string;
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
  author: Author;
  published: boolean;
  featured: boolean;
}

// Project Types
export interface Project {
  _id: string;
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
