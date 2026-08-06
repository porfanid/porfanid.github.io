import React from "react";
import { profile, githubUsername } from "../data/profile.js";
import { useGithubData } from "../hooks/useGithubData.js";

export default function Projects() {
  const gh = useGithubData(githubUsername);
  const projects = gh.projects.length ? gh.projects : profile.fallbackProjects;

  return (
    <section className="section" id="projects">
      <div className="container">
        <div className="projects-header">
          <div>
            <h2 style={{ marginBottom: 4 }}>My Latest Work</h2>
            <p style={{ margin: 0 }}>
              Live from GitHub &mdash; my non-fork repos, sorted by stars.
              {gh.stale && " (cached copy)"}
            </p>
          </div>
          <a href={profile.links.github} target="_blank" rel="noreferrer" className="project-link">
            More on GitHub <i className="mdi mdi-arrow-right" />
          </a>
        </div>

        <div className="projects-grid">
          {gh.loading &&
            [1, 2, 3].map((i) => (
              <div className="project-card" key={i} style={{ opacity: 0.4 }}>
                <span className="project-tag">Loading</span>
                <h5>&nbsp;</h5>
                <p style={{ fontSize: 14, margin: 0 }}>&nbsp;</p>
              </div>
            ))}

          {!gh.loading &&
            projects.map((p) => (
              <div className="project-card" key={p.name}>
                <span className="project-tag">{p.tag}</span>
                <h5>{p.name}</h5>
                <p style={{ fontSize: 14, margin: 0 }}>{p.description}</p>
                <div className="project-footer">
                  <a href={p.url} target="_blank" rel="noreferrer" className="project-link">
                    View repo <i className="mdi mdi-open-in-new" />
                  </a>
                  <span className="project-stars">
                    <i className="mdi mdi-star-outline" /> {p.stars}
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
