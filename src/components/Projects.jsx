import React, { useEffect, useState } from 'react';
import anime from 'animejs/lib/anime.es.js';
import ProjectCard from './ProjectCard'; // Εισάγουμε το component της κάρτας
import { useScrollAnimation } from '../hooks/useScrollAnimation';

// Δημόσια REST endpoints του GitHub (χωρίς token)
const REST_REPOS_ENDPOINT = (username) => `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`;

function Projects() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pinnedRepos, setPinnedRepos] = useState([]);
  const [otherRepos, setOtherRepos] = useState([]);

  const username = 'porfanid';

  // Scroll-activated animations
  const sectionAnimationRef = useScrollAnimation({
    targets: '.section-title',
    translateY: [24, 0],
    opacity: [0, 1],
    duration: 900,
    easing: 'easeOutExpo',
  });

  const pinnedGridAnimationRef = useScrollAnimation({
    targets: '#pinned-projects-grid .project-card',
    translateY: [40, 0],
    opacity: [0, 1],
    delay: anime.stagger(90),
    duration: 800,
    easing: 'easeOutExpo',
  });

  const otherGridAnimationRef = useScrollAnimation({
    targets: '#other-projects-grid .project-card',
    translateY: [40, 0],
    opacity: [0, 1],
    delay: anime.stagger(70),
    duration: 750,
    easing: 'easeOutExpo',
  });

  useEffect(() => {
    let isMounted = true;

    async function fetchProjects() {
      setLoading(true);
      setError(null);

      try {
        // 1) Φέρνουμε όλα τα public repos μέσω REST (χωρίς token)
        const resp = await fetch(REST_REPOS_ENDPOINT(username));
        if (!resp.ok) {
          throw new Error(`GitHub API Error: ${resp.status} ${resp.statusText}`);
        }
        const allRepos = await resp.json();

        if (!isMounted) return;

        // 2) Επιλέγουμε "favorite" ως τα 6 με τα περισσότερα stars (fallback αντί για GraphQL pinned)
        const sortedByStars = [...allRepos].sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0));
        const favorites = sortedByStars.slice(0, 6);
        setPinnedRepos(favorites);

        // 3) Τα υπόλοιπα (εξαιρούμε τα favorites με βάση το όνομα)
        const favoriteNames = new Set(favorites.map(r => r.name));
        const others = allRepos.filter(r => !favoriteNames.has(r.name));
        setOtherRepos(others);
      } catch (e) {
        if (!isMounted) return;
        setError(e.message);
      } finally {
        if (!isMounted) return;
        setLoading(false);
      }
    }

    fetchProjects();
    return () => { isMounted = false; };
  }, [username]);
  
  // Helper function για να περάσουμε τα σωστά δεδομένα στην κάρτα
  const normalizeRepoData = (repo) => ({
    name: repo.name,
    description: repo.description,
    url: repo.html_url || repo.url,
    homepageUrl: repo.homepage || repo.homepageUrl,
    stars: repo.stargazers_count ?? repo.stargazerCount,
    forks: repo.forks_count ?? repo.forkCount,
    language: repo.language ?? repo.primaryLanguage?.name,
    languageColor: repo.primaryLanguage?.color, // Δεν είναι διαθέσιμο από REST — αν λείπει, το αφήνουμε undefined
  });

  return (
    <div id="projects-container" ref={sectionAnimationRef}>
      {loading && (
        <div className="loader"><div className="spinner" /></div>
      )}
      
      {error && !loading && (
        <p style={{ textAlign: 'center' }}>Could not load repositories: {error}</p>
      )}

      {!loading && !error && (
        <>
          {/* Ενότητα για τα Favorite Projects (fallback των pinned) */}
          <h2 className="section-title" style={{ marginTop: '2rem' }}>Favorite Projects</h2>
          <div id="pinned-projects-grid" className="projects-grid" ref={pinnedGridAnimationRef}>
            {pinnedRepos.map(repo => <ProjectCard key={repo.html_url || repo.url} repo={normalizeRepoData(repo)} />)}
          </div>

          <hr style={{ margin: '3rem 0', borderColor: 'rgba(173, 186, 199, 0.2)' }} />

          {/* Ενότητα για όλα τα υπόλοιπα Projects */}
          <h2 className="section-title">All Projects</h2>
          <div id="other-projects-grid" className="projects-grid" ref={otherGridAnimationRef}>
            {otherRepos.map(repo => <ProjectCard key={repo.html_url || repo.url} repo={normalizeRepoData(repo)} />)}
          </div>
        </>
      )}
    </div>
  );
}

export default Projects;
