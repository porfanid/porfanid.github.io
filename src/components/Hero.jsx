import React from "react";
import { profile } from "../data/profile.js";

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="container hero-grid">
        <div>
          <p className="hero-hi">
            Hello there, nice to meet you <span className="heart">&hearts;</span> ,{" "}
            <span style={{ color: "var(--primary)" }}>I am</span>
          </p>
          <h1 className="hero-name">{profile.name}</h1>
          <p className="hero-role">{profile.tagline}</p>
          <p style={{ maxWidth: 480 }}>{profile.heroBlurb}</p>

          <div className="hero-actions">
            <a href="#about" className="btn btn-primary">
              My Story
            </a>
            <a href="#contact" className="btn btn-outline">
              Hire Me
            </a>
          </div>

          <div className="hero-meta">
            <div className="icon">
              <i className="mdi mdi-school-outline" />
            </div>
            <div>
              <p style={{ fontWeight: 500 }}>{profile.affiliation}</p>
              <p>Computer Science &middot; {profile.location}</p>
            </div>
          </div>
        </div>

        <div className="hero-avatar-wrap">
          <img src={profile.avatar} alt={profile.name} className="hero-avatar" />
        </div>
      </div>
    </section>
  );
}
