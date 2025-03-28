export interface Project {
    id: number;
    title: string;
    description: string;
    image: string;
    technologies: string[];
    link: string;
    type: 'web' | 'backend' | 'corporate' | 'financial';
}

export interface Experience {
    role: string;
    company: string;
    period: string;
    location: string;
    responsibilities: string[];
    technologies: string[];
}

export interface VideoItem {
    id: number;
    title: string;
    thumbnail: string;
    url: string;
    description: string;
}

export interface NavigationItem {
    path: string;
    label: string;
}

export interface ContactFormValues {
    name: string;
    email: string;
    subject: string;
    message: string;
}