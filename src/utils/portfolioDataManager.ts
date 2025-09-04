import type { PortfolioData, Certificate, Skill, Experience } from '../types/admin';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';

/**
 * Utility class for managing portfolio data
 */
export class PortfolioDataManager {
  private static instance: PortfolioDataManager;
  private cache: PortfolioData | null = null;
  private cacheExpiry: number = 0;
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  static getInstance(): PortfolioDataManager {
    if (!PortfolioDataManager.instance) {
      PortfolioDataManager.instance = new PortfolioDataManager();
    }
    return PortfolioDataManager.instance;
  }

  /**
   * Fetch portfolio data with caching
   */
  async getData(forceRefresh = false): Promise<PortfolioData> {
    const now = Date.now();
    
    if (!forceRefresh && this.cache && now < this.cacheExpiry) {
      return this.cache as PortfolioData;
    }

    try {
      const response = await fetch(`${API_BASE}/api/data`);
      const result = await response.json();
      
      if (result.success) {
        this.cache = result.data;
        this.cacheExpiry = now + this.CACHE_DURATION;
        return this.cache as PortfolioData;
      } else {
        throw new Error(result.message || 'Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching portfolio data:', error);
      
      // Return cached data if available, otherwise return empty data
      if (this.cache) {
        return this.cache as PortfolioData;
      }
      
      return {
        certificates: [],
        skills: [],
        experiences: [],
        lastUpdated: new Date().toISOString()
      };
    }
  }

  /**
   * Clear cache to force refresh
   */
  clearCache(): void {
    this.cache = null;
    this.cacheExpiry = 0;
  }

  /**
   * Get certificates with optional filtering
   */
  async getCertificates(category?: string): Promise<Certificate[]> {
    const data = await this.getData();
    
    if (!category) {
      return data.certificates;
    }
    
    return data.certificates.filter(cert => 
      cert.category?.toLowerCase() === category.toLowerCase()
    );
  }

  /**
   * Get skills with optional filtering and sorting
   */
  async getSkills(options?: {
    category?: string;
    sortBy?: 'name' | 'level' | 'date';
    limit?: number;
  }): Promise<Skill[]> {
    const data = await this.getData();
    let skills = [...data.skills];
    
    // Filter by category
    if (options?.category) {
      skills = skills.filter(skill => 
        skill.category.toLowerCase() === options.category!.toLowerCase()
      );
    }
    
    // Sort
    if (options?.sortBy) {
      switch (options.sortBy) {
        case 'name':
          skills.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'level':
          skills.sort((a, b) => b.level - a.level);
          break;
        case 'date':
          skills.sort((a, b) => 
            new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
          );
          break;
      }
    }
    
    // Limit results
    if (options?.limit) {
      skills = skills.slice(0, options.limit);
    }
    
    return skills;
  }

  /**
   * Get experiences with optional filtering
   */
  async getExperiences(type?: 'work' | 'project' | 'volunteer'): Promise<Experience[]> {
    const data = await this.getData();
    
    if (!type) {
      return data.experiences;
    }
    
    return data.experiences.filter(exp => exp.type === type);
  }

  /**
   * Get portfolio statistics
   */
  async getStats(): Promise<{
    totalCertificates: number;
    totalSkills: number;
    totalExperiences: number;
    categories: string[];
    lastUpdated: string;
  }> {
    const data = await this.getData();
    
    const categories = Array.from(new Set([
      ...data.certificates.map(c => c.category).filter(Boolean),
      ...data.skills.map(s => s.category)
    ])) as string[];
    
    return {
      totalCertificates: data.certificates.length,
      totalSkills: data.skills.length,
      totalExperiences: data.experiences.length,
      categories,
      lastUpdated: data.lastUpdated
    };
  }

  /**
   * Search across all portfolio data
   */
  async search(query: string): Promise<{
    certificates: Certificate[];
    skills: Skill[];
    experiences: Experience[];
  }> {
    const data = await this.getData();
    const lowerQuery = query.toLowerCase();
    
    const certificates = data.certificates.filter(cert =>
      cert.title.toLowerCase().includes(lowerQuery) ||
      cert.issuer.toLowerCase().includes(lowerQuery) ||
      cert.description?.toLowerCase().includes(lowerQuery) ||
      cert.category?.toLowerCase().includes(lowerQuery)
    );
    
    const skills = data.skills.filter(skill =>
      skill.name.toLowerCase().includes(lowerQuery) ||
      skill.category.toLowerCase().includes(lowerQuery) ||
      skill.description?.toLowerCase().includes(lowerQuery)
    );
    
    const experiences = data.experiences.filter(exp =>
      exp.role.toLowerCase().includes(lowerQuery) ||
      exp.company.toLowerCase().includes(lowerQuery) ||
      exp.description.toLowerCase().includes(lowerQuery) ||
      exp.technologies.some(tech => tech.toLowerCase().includes(lowerQuery))
    );
    
    return { certificates, skills, experiences };
  }
}

// Export singleton instance
export const portfolioDataManager = PortfolioDataManager.getInstance();

/**
 * Helper functions for common data operations
 */
export const portfolioHelpers = {
  /**
   * Format date for display
   */
  formatDate: (dateString: string, format: 'short' | 'long' = 'short') => {
    const date = new Date(dateString);
    
    if (format === 'long') {
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
    
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    });
  },

  /**
   * Get skill level color
   */
  getSkillLevelColor: (level: number) => {
    if (level >= 90) return 'text-green-400';
    if (level >= 70) return 'text-cyan-400';
    if (level >= 50) return 'text-yellow-400';
    return 'text-orange-400';
  },

  /**
   * Get experience type badge styles
   */
  getExperienceTypeStyles: (type: string) => {
    switch (type) {
      case 'work':
        return 'bg-green-500/20 text-green-300';
      case 'project':
        return 'bg-blue-500/20 text-blue-300';
      case 'volunteer':
        return 'bg-orange-500/20 text-orange-300';
      default:
        return 'bg-gray-500/20 text-gray-300';
    }
  },

  /**
   * Truncate text with ellipsis
   */
  truncateText: (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim() + '...';
  },

  /**
   * Generate unique colors for categories
   */
  getCategoryColor: (category: string) => {
    const colors = [
      'bg-purple-500/20 text-purple-300',
      'bg-cyan-500/20 text-cyan-300',
      'bg-green-500/20 text-green-300',
      'bg-yellow-500/20 text-yellow-300',
      'bg-red-500/20 text-red-300',
      'bg-blue-500/20 text-blue-300',
      'bg-pink-500/20 text-pink-300',
      'bg-indigo-500/20 text-indigo-300'
    ];
    
    const index = category.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[index % colors.length];
  }
};

/**
 * Data validation utilities
 */
export const dataValidation = {
  /**
   * Validate certificate data
   */
  validateCertificate: (cert: Partial<Certificate>): string[] => {
    const errors: string[] = [];
    
    if (!cert.title?.trim()) errors.push('Title is required');
    if (!cert.issuer?.trim()) errors.push('Issuer is required');
    if (!cert.date) errors.push('Date is required');
    if (cert.date && new Date(cert.date) > new Date()) {
      errors.push('Date cannot be in the future');
    }
    if (cert.link && !isValidUrl(cert.link)) {
      errors.push('Link must be a valid URL');
    }
    
    return errors;
  },

  /**
   * Validate skill data
   */
  validateSkill: (skill: Partial<Skill>): string[] => {
    const errors: string[] = [];
    
    if (!skill.name?.trim()) errors.push('Name is required');
    if (!skill.category?.trim()) errors.push('Category is required');
    if (skill.level === undefined || skill.level < 0 || skill.level > 100) {
      errors.push('Level must be between 0 and 100');
    }
    
    return errors;
  },

  /**
   * Validate experience data
   */
  validateExperience: (exp: Partial<Experience>): string[] => {
    const errors: string[] = [];
    
    if (!exp.role?.trim()) errors.push('Role is required');
    if (!exp.company?.trim()) errors.push('Company is required');
    if (!exp.duration?.trim()) errors.push('Duration is required');
    if (!exp.description?.trim()) errors.push('Description is required');
    if (!exp.type || !['work', 'project', 'volunteer'].includes(exp.type)) {
      errors.push('Valid type is required');
    }
    if (exp.link && !isValidUrl(exp.link)) {
      errors.push('Link must be a valid URL');
    }
    
    return errors;
  }
};

/**
 * URL validation helper
 */
function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}
