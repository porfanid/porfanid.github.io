import React, { useState } from "react";
import { profile, githubUsername, orcidId } from "../data/profile.js";
import { useGithubData } from "../hooks/useGithubData.js";
import { useOrcidData } from "../hooks/useOrcidData.js";

const TABS = ["Skills", "Experience & Education"];

export default function About() {
  const [tab, setTab] = useState("Skills");
  const gh = useGithubData(githubUsername);
  const orcid = useOrcidData(orcidId);

  const skills = gh.skills.length ? gh.skills : profile.fallbackSkills;
  const timeline = orcid.timeline.length ? orcid.timeline : profile.fallbackTimeline;

  return (
    <section className="section" id="about" style={{ background: "var(--bg-alt)" }}>
      <div className="container about-grid">
        <div>
          <div className="about-photo">
            <img src={gh.ghProfile?.avatarUrl || profile.avatar} alt={profile.name} />
          </div>
          <div className="quote-box">{profile.quote}</div>
        </div>

        <div>
          <p className="eyebrow">Get To Know</p>
          <h2 style={{ fontSize: 32 }}>About Me</h2>
          <p>{profile.about}</p>

          <div className="tabs">
            {TABS.map((t) => (
              <button
                key={t}
                className={`tab-btn ${tab === t ? "active" : ""}`}
                onClick={() => setTab(t)}
              >
                {t}
              </button>
            ))}
          </div>

          {tab === "Skills" && (
            <div>
              <p style={{ fontSize: 13, marginBottom: 20 }}>
                <i className="mdi mdi-github" style={{ marginRight: 4 }} />
                Computed live from language usage across my public, non-fork repositories.
                {gh.stale && " (showing a cached copy \u2014 GitHub's public API is rate-limited)"}
              </p>
              {gh.loading && <SkeletonBars />}
              {!gh.loading &&
                skills.map((s) => (
                  <div className="skill-item" key={s.name}>
                    <div className="row-between">
                      <span>{s.name}</span>
                      <span>{s.value}%</span>
                    </div>
                    <div className="progress">
                      <div className="progress-bar" style={{ width: `${s.value}%` }} />
                    </div>
                  </div>
                ))}
            </div>
          )}

          {tab === "Experience & Education" && (
            <div>
              <p style={{ fontSize: 13, marginBottom: 20 }}>
                <i className="mdi mdi-orcid" style={{ marginRight: 4 }} />
                Pulled live from my{" "}
                <a href={profile.links.orcid} target="_blank" rel="noreferrer" style={{ color: "var(--primary)" }}>
                  ORCID record
                </a>
                .{orcid.stale && " (showing a cached copy)"}
              </p>
              {orcid.loading && <SkeletonBars />}
              {!orcid.loading && timeline.length === 0 && (
                <p>No public employment or education entries on ORCID yet.</p>
              )}
              {!orcid.loading &&
                timeline.map((item, i) => (
                  <div className="timeline-item" key={`${item.title}-${i}`}>
                    <h5>
                      {item.title}
                      {item.org && item.title !== item.org ? ` \u2014 ${item.org}` : ""}
                    </h5>
                    <p className="period">
                      {item.type}
                      {item.period ? ` \u00b7 ${item.period}` : ""}
                    </p>
                    {item.description && <p>{item.description}</p>}
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function SkeletonBars() {
  return (
    <div>
      {[1, 2, 3].map((i) => (
        <div className="skill-item" key={i}>
          <div className="progress">
            <div className="progress-bar" style={{ width: "40%", opacity: 0.3 }} />
          </div>
        </div>
      ))}
    </div>
  );
}
