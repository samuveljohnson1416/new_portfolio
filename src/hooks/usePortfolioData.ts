import { useState, useEffect } from 'react';
import type { PortfolioData } from '../types/admin';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export function usePortfolioData() {
  const [data, setData] = useState<PortfolioData>({
    certificates: [],
    skills: [],
    experiences: [],
    lastUpdated: new Date().toISOString()
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/api/data`);
      const result = await response.json();
      
      if (result.success) {
        setData(result.data);
        setError(null);
      } else {
        setError(result.message || 'Failed to fetch data');
      }
    } catch (err) {
      console.error('Error fetching portfolio data:', err);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    data,
    loading,
    error,
    refetch: fetchData
  };
}

// Hook for certificates with filtering and sorting
export function useCertificates() {
  const { data, loading, error, refetch } = usePortfolioData();
  
  const getCertificatesByCategory = (category?: string) => {
    if (!category) return data.certificates;
    return data.certificates.filter(cert => cert.category === category);
  };

  const getCertificatesSortedByDate = (ascending = false) => {
    return [...data.certificates].sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return ascending ? dateA - dateB : dateB - dateA;
    });
  };

  return {
    certificates: data.certificates,
    loading,
    error,
    refetch,
    getCertificatesByCategory,
    getCertificatesSortedByDate
  };
}

// Hook for skills with categorization
export function useSkills() {
  const { data, loading, error, refetch } = usePortfolioData();
  
  const getSkillsByCategory = (category?: string) => {
    if (!category) return data.skills;
    return data.skills.filter(skill => skill.category === category);
  };

  const getSkillCategories = () => {
    return [...new Set(data.skills.map(skill => skill.category))];
  };

  const getTopSkills = (limit = 6) => {
    return [...data.skills]
      .sort((a, b) => b.level - a.level)
      .slice(0, limit);
  };

  return {
    skills: data.skills,
    loading,
    error,
    refetch,
    getSkillsByCategory,
    getSkillCategories,
    getTopSkills
  };
}

// Hook for experiences
export function useExperiences() {
  const { data, loading, error, refetch } = usePortfolioData();
  
  const getExperiencesByType = (type?: 'work' | 'project' | 'volunteer') => {
    if (!type) return data.experiences;
    return data.experiences.filter(exp => exp.type === type);
  };

  const getWorkExperience = () => getExperiencesByType('work');
  const getProjects = () => getExperiencesByType('project');
  const getVolunteerWork = () => getExperiencesByType('volunteer');

  return {
    experiences: data.experiences,
    loading,
    error,
    refetch,
    getExperiencesByType,
    getWorkExperience,
    getProjects,
    getVolunteerWork
  };
}
