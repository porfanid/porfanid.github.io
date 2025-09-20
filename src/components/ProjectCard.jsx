import React from 'react';

function ProjectCard({ repo }) {
  // Αυτό το component δέχεται ένα "repo" object και το εμφανίζει.
  // Τα δεδομένα είναι ήδη "κανονικοποιημένα" από το Projects.jsx.
  return (
    <div className="project-card">
      <div className="project-content">
        <h3 className="project-title">
          <a href={repo.url} target="_blank" rel="noreferrer">{repo.name}</a>
          {repo.homepageUrl && (
            <a href={repo.homepageUrl} target="_blank" rel="noreferrer" className="pages-badge">
              <i className="fas fa-globe" /> Live Demo
            </a>
          )}
        </h3>
        <p className="project-description">{repo.description || 'No description available'}</p>
        <div className="project-meta">
          {repo.language ? (
            <div className="project-language">
              <span className="language-color" style={{ backgroundColor: repo.languageColor || '#8257e5' }} />
              <span>{repo.language}</span>
            </div>
          ) : <span />}
          <div className="project-stats">
            <div className="project-stat"><i className="far fa-star" /><span>{repo.stars}</span></div>
            <div className="project-stat"><i className="fas fa-code-branch" /><span>{repo.forks}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
