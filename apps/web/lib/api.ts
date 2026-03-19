export interface GitHubProject {
  id: number;
  repo_name: string;
  stars: number;
  commits: number;
  description: string;
  languages: string[];
  url: string;
  last_updated: string;
}

export async function getGitHubProjects(): Promise<GitHubProject[]> {
  try {
    // Determine the API URL depending on server vs client side
    // From a server component inside docker, "http://api:8000" might be needed
    // However, trying NEXT_PUBLIC_API_URL first (which works if the user is running both on host)
    // Wait, the Next.js container connects to the FastAPI container using `http://api:8000` internally.
    // If not inside Docker, it uses localhost. We'll use an environment variable or default to api:8000.
    const apiUrl = process.env.INTERNAL_API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    
    // We use cache: 'no-store' to ensure we always fetch fresh data, bypassing the aggressive Next.js fetch cache.
    const res = await fetch(`${apiUrl}/api/v1/github/projects`, {
      cache: 'no-store'
    });

    if (!res.ok) {
      console.error(`Error fetching GitHub projects: ${res.status} ${res.statusText}`);
      return [];
    }

    const data: GitHubProject[] = await res.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch GitHub projects:', error);
    return [];
  }
}
