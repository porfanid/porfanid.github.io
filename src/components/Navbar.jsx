import React, { useEffect, useState } from "react";
import { profile } from "../data/profile.js";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar({ theme, onToggleTheme }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [theme]);

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <a href="#home" className="logo">
          <span
            style={{
              width: 34,
              height: 34,
              borderRadius: "50%",
              background: "var(--primary)",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 15,
            }}
          >
            PO
          </span>
          {profile.name}
        </a>

        <ul className={`nav-links ${open ? "open" : ""}`}>
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={() => setOpen(false)}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <button
            className="mode-btn"
            aria-label="Toggle dark / light mode"
            onClick={onToggleTheme}
          >
            <i className={`mdi ${theme === "dark" ? "mdi-white-balance-sunny" : "mdi-weather-night"}`} />
          </button>
          <a
            href={profile.links.cvEn}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary"
            style={{ padding: "10px 20px", fontSize: 14 }}
          >
            Resume
          </a>
          <button className="nav-toggle" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            <i className="mdi mdi-menu" />
          </button>
        </div>
      </div>
    </nav>
  );
}
