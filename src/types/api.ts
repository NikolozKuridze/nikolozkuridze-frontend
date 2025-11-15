// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
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
  longDescription: {
    en: string;
    ka: string;
  };
  category: string;
  technologies: string[];
  imageUrl?: string;
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
  longDescription: {
    en: string;
    ka: string;
  };
  category: string;
  technologies: string[];
  imageUrl?: string;
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
