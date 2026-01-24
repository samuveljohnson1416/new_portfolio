/**
 * GitHub API Service
 * Fetches all public repositories from GitHub automatically
 */

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  topics: string[];
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  private: boolean;
  archived: boolean;
  fork: boolean;
}

export interface ProjectData {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  tech: string[];
  github: string;
  live: string;
  image: string;
  featured: boolean;
  category: 'fullstack' | 'frontend' | 'backend' | 'other';
  status: string;
  stars: number;
  forks: number;
  language: string;
  lastUpdated: string;
}

const GITHUB_USERNAME = 'samuveljohnson1416';
const GITHUB_API_BASE = 'https://api.github.com';

/**
 * Fetch all public repositories for the user
 */
export async function fetchGitHubRepositories(): Promise<GitHubRepo[]> {
  try {
    const token = import.meta.env.VITE_GITHUB_TOKEN;
    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json',
    };

    // Add authorization if token is available (increases rate limit)
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(
      `${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`,
      { headers }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const repos: GitHubRepo[] = await response.json();

    // Filter: only public, non-archived, non-fork repositories
    return repos.filter(repo =>
      !repo.private &&
      !repo.archived &&
      !repo.fork
    );
  } catch (error) {
    console.error('Error fetching GitHub repositories:', error);
    throw error;
  }
}

/**
 * Determine project category based on languages and topics
 */
function determineCategory(repo: GitHubRepo): ProjectData['category'] {
  const topics = repo.topics.map(t => t.toLowerCase());
  const language = repo.language?.toLowerCase() || '';

  // Check topics first
  if (topics.includes('fullstack') || topics.includes('full-stack')) {
    return 'fullstack';
  }
  if (topics.includes('frontend') || topics.includes('front-end')) {
    return 'frontend';
  }
  if (topics.includes('backend') || topics.includes('back-end')) {
    return 'backend';
  }

  // Infer from language
  const frontendLanguages = ['javascript', 'typescript', 'html', 'css', 'vue', 'react'];
  const backendLanguages = ['java', 'python', 'go', 'rust', 'php', 'ruby', 'c#', 'c++'];

  if (frontendLanguages.includes(language)) {
    // Check if it has backend indicators
    if (topics.some(t => ['node', 'express', 'api', 'mongodb', 'mysql', 'database'].includes(t))) {
      return 'fullstack';
    }
    return 'frontend';
  }

  if (backendLanguages.includes(language)) {
    return 'backend';
  }

  return 'other';
}

/**
 * Determine if a project should be featured
 * Based on stars, recent activity, and specific criteria
 */
function shouldBeFeatured(repo: GitHubRepo): boolean {
  const hasStars = repo.stargazers_count > 0;
  const hasHomepage = !!repo.homepage;
  const hasDescription = !!repo.description;
  const hasTopics = repo.topics.length > 0;

  // Recent activity (updated within last year)
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
  const isRecent = new Date(repo.updated_at) > oneYearAgo;

  // Feature if it meets multiple criteria
  const score = [hasStars, hasHomepage, hasDescription, hasTopics, isRecent]
    .filter(Boolean).length;

  return score >= 3;
}

/**
 * Transform GitHub repository data to project data format
 */
export function transformRepoToProject(repo: GitHubRepo): ProjectData {
  const tech = repo.topics.length > 0
    ? repo.topics.map(t => t.charAt(0).toUpperCase() + t.slice(1))
    : repo.language
      ? [repo.language]
      : ['GitHub'];

  return {
    id: repo.id,
    title: repo.name
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
      .replace(/_/g, ' '),
    description: repo.description || 'A GitHub repository project',
    longDescription: repo.description || 'No detailed description available.',
    tech: tech,
    github: repo.html_url,
    live: repo.homepage || repo.html_url,
    image: '', // No longer using images
    featured: shouldBeFeatured(repo),
    category: determineCategory(repo),
    status: 'completed',
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    language: repo.language || 'Unknown',
    lastUpdated: new Date(repo.updated_at).toLocaleDateString(),
  };
}

/**
 * Main function to get all projects
 */
export async function getAllProjects(): Promise<ProjectData[]> {
  const repos = await fetchGitHubRepositories();
  const projects = repos.map(transformRepoToProject);

  // Sort by: featured first, then by stars, then by recent updates
  return projects.sort((a, b) => {
    if (a.featured !== b.featured) {
      return a.featured ? -1 : 1;
    }
    if (a.stars !== b.stars) {
      return b.stars - a.stars;
    }
    return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
  });
}

/**
 * Get the count of public repositories (for stats display)
 */
export async function getProjectCount(): Promise<string> {
  try {
    const repos = await fetchGitHubRepositories();
    return `${repos.length}+`;
  } catch (error) {
    console.error('Error fetching project count:', error);
    return '6+'; // Fallback value
  }
}

/**
 * Get rate limit information
 */
export async function getRateLimit(): Promise<any> {
  try {
    const token = import.meta.env.VITE_GITHUB_TOKEN;
    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${GITHUB_API_BASE}/rate_limit`, { headers });
    return await response.json();
  } catch (error) {
    console.error('Error fetching rate limit:', error);
    return null;
  }
}
