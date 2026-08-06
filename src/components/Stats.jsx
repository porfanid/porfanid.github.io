import React from "react";
import { profile, githubUsername } from "../data/profile.js";
import { useGithubData } from "../hooks/useGithubData.js";

export default function Stats() {
  const gh = useGithubData(githubUsername);
  const stats = gh.stats.length ? gh.stats : profile.fallbackStats;

  return (
    <section className="section" style={{ background: "var(--bg-alt)", paddingTop: 80, paddingBottom: 80 }}>
      <div className="container">
        <div className="stats-grid">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="stat-value">{gh.loading ? "\u2014" : s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
        <p style={{ textAlign: "center", fontSize: 13, marginTop: 24, marginBottom: 0 }}>
          Live from the GitHub API{gh.stale ? " (cached copy)" : ""}
        </p>
      </div>
    </section>
  );
}
