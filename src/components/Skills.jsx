import React from "react";
import { profile } from "../data/profile.js";

export default function Skills() {
  return (
    <section className="section" id="skills">
      <div className="container">
        <div className="text-center section-lead">
          <p className="eyebrow">What I Do</p>
          <h2>Where I Can Help</h2>
          <p>A quick map of the areas I spend most of my time in, on the job and in my own projects.</p>
        </div>

        <div className="services-grid">
          {profile.services.map((s) => (
            <div className="service-card" key={s.title}>
              <div className={`service-icon ${s.color}`}>
                <i className={`mdi ${s.icon}`} />
              </div>
              <h6 style={{ fontSize: 17, marginBottom: 10 }}>{s.title}</h6>
              <p style={{ fontSize: 14, margin: 0 }}>{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
