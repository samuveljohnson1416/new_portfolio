// Data types for the portfolio admin system
export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  link: string;
  image?: string;
  description?: string;
  category?: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  level: number; // 0-100
  description?: string;
  dateAdded: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  duration: string;
  description: string;
  technologies: string[];
  link?: string;
  type: 'work' | 'project' | 'volunteer';
}

export interface PortfolioData {
  certificates: Certificate[];
  skills: Skill[];
  experiences: Experience[];
  lastUpdated: string;
}

export interface AdminUser {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
  role: 'admin' | 'editor';
  createdAt: string;
  lastLogin?: string;
}

export interface AuthResponse {
  success: boolean;
  token?: string;
  user?: Omit<AdminUser, 'passwordHash'>;
  message?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
