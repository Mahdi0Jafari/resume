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
  const apiUrl = process.env.INTERNAL_API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  const url = `${apiUrl}/api/v1/github/projects`;
  const timeout = 15000; 

  for (let i = 0; i < 3; i++) {
    try {
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), timeout);

      const res = await fetch(url, {
        cache: 'no-store',
        signal: controller.signal
      });
      
      clearTimeout(id);
      if (!res.ok) throw new Error(`Status ${res.status}`);

      return await res.json();
    } catch (error) {
      console.warn(`Attempt ${i + 1} failed to fetch projects:`, error);
      if (i === 2) return [];
      await new Promise(r => setTimeout(r, 1000));
    }
  }
  return [];
}
