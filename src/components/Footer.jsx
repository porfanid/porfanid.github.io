import React from "react";
import { profile } from "../data/profile.js";

const socials = [
  { icon: "mdi-github", href: profile.links.github, label: "GitHub" },
  { icon: "mdi-linkedin", href: profile.links.linkedin, label: "LinkedIn" },
  { icon: "mdi-stack-overflow", href: profile.links.stackoverflow, label: "Stack Overflow" },
  { icon: "mdi-coffee-outline", href: profile.links.kofi, label: "Ko-fi" },
  { icon: "mdi-web", href: profile.links.website, label: "Website" },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="logo" style={{ marginBottom: 8 }}>
              {profile.name}
            </div>
            <p style={{ margin: 0, maxWidth: 320 }}>{profile.tagline}</p>
          </div>
          <div className="social-icons">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="social-icon"
                aria-label={s.label}
              >
                <i className={`mdi ${s.icon}`} />
              </a>
            ))}
          </div>
        </div>

        <div className="bottom-footer">
          <p>
            &copy; {new Date().getFullYear()} {profile.name}. Built with React.
          </p>
        </div>
      </div>
    </footer>
  );
}
