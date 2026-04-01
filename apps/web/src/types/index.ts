export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  link?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatarUrl?: string;
}

export type ProjectType = 'Web' | 'Mobile' | 'Cloud' | 'AI' | 'Other';

export interface ContactForm {
  id: string;
  name: string;
  email: string;
  projectType: ProjectType | string;
  message: string;
  createdAt: string;
  status: 'pending' | 'reviewed' | 'responded';
}