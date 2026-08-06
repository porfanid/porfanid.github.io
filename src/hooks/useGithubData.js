import { useEffect, useState } from "react";
import { fetchWithCache } from "./fetchWithCache.js";

const GITHUB_API = "https://api.github.com";

function computeSkills(repos) {
  const counts = {};
  repos
    .filter((r) => !r.fork && r.language)
    .forEach((r) => {
      counts[r.language] = (counts[r.language] || 0) + 1;
    });

  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  const max = sorted[0]?.[1] || 1;

  return sorted.slice(0, 6).map(([name, count]) => ({
    name,
    value: Math.max(30, Math.round((count / max) * 100)),
  }));
}

function computeProjects(repos) {
  return repos
    .filter((r) => !r.fork)
    .sort((a, b) => {
      if (b.stargazers_count !== a.stargazers_count) return b.stargazers_count - a.stargazers_count;
      return new Date(b.updated_at) - new Date(a.updated_at);
    })
    .slice(0, 6)
    .map((r) => ({
      name: r.name,
      tag: r.language ? (r.archived ? `${r.language} \u00b7 Archived` : r.language) : (r.archived ? "Archived" : "Project"),
      description: r.description || "No description provided.",
      url: r.html_url,
      stars: r.stargazers_count,
    }));
}

export function useGithubData(username) {
  const [state, setState] = useState({
    loading: true,
    error: null,
    stale: false,
    ghProfile: null,
    stats: [],
    projects: [],
    skills: [],
  });

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetchWithCache(`${GITHUB_API}/users/${username}`, { key: `gh-user-${username}` }),
          fetchWithCache(`${GITHUB_API}/users/${username}/repos?per_page=100&type=owner`, {
            key: `gh-repos-${username}`,
          }),
        ]);

        if (cancelled) return;

        const user = userRes.data;
        const repos = Array.isArray(reposRes.data) ? reposRes.data : [];
        const nonForkRepos = repos.filter((r) => !r.fork);
        const totalStars = nonForkRepos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0);

        setState({
          loading: false,
          error: null,
          stale: userRes.stale || reposRes.stale,
          ghProfile: {
            name: user.name,
            bio: user.bio,
            avatarUrl: user.avatar_url,
            htmlUrl: user.html_url,
            followers: user.followers,
            publicRepos: user.public_repos,
          },
          stats: [
            { label: "Public Repositories", value: String(user.public_repos ?? "\u2014") },
            { label: "Followers", value: String(user.followers ?? "\u2014") },
            { label: "Stars Earned", value: String(totalStars) },
            { label: "Original Projects", value: String(nonForkRepos.length) },
          ],
          projects: computeProjects(repos),
          skills: computeSkills(repos),
        });
      } catch (err) {
        if (!cancelled) {
          setState((s) => ({ ...s, loading: false, error: err.message }));
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [username]);

  return state;
}
