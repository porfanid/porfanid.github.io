import React, { useState } from "react";
import { profile } from "../data/profile.js";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    const subject = encodeURIComponent(form.subject || `Message from ${form.name}`);
    window.location.href = `mailto:hello@orfanidis.net.gr?subject=${subject}&body=${body}`;
  };

  return (
    <section className="section" id="contact" style={{ background: "var(--bg-alt)" }}>
      <div className="container contact-grid">
        <div>
          <p className="eyebrow">Get In Touch</p>
          <h2>Let's Connect</h2>
          <p>Have a project, an idea, or just want to say hi? I'd love to hear from you.</p>

          <div className="contact-info-item">
            <div className="icon">
              <i className="mdi mdi-map-marker-outline" />
            </div>
            <div>
              <p style={{ fontWeight: 500, margin: 0 }}>Location</p>
              <p style={{ margin: 0 }}>{profile.location}</p>
            </div>
          </div>

          <div className="contact-info-item">
            <div className="icon">
              <i className="mdi mdi-web" />
            </div>
            <div>
              <p style={{ fontWeight: 500, margin: 0 }}>Website</p>
              <a href={profile.links.website} target="_blank" rel="noreferrer">
                orfanidis.net.gr
              </a>
            </div>
          </div>

          <div className="contact-info-item">
            <div className="icon">
              <i className="mdi mdi-linkedin" />
            </div>
            <div>
              <p style={{ fontWeight: 500, margin: 0 }}>LinkedIn</p>
              <a href={profile.links.linkedin} target="_blank" rel="noreferrer">
                in/porfanid
              </a>
            </div>
          </div>

          <div className="contact-info-item">
            <div className="icon">
              <i className="mdi mdi-github" />
            </div>
            <div>
              <p style={{ fontWeight: 500, margin: 0 }}>GitHub</p>
              <a href={profile.links.github} target="_blank" rel="noreferrer">
                @porfanid
              </a>
            </div>
          </div>
        </div>

        <div className="contact-form-box">
          <p className="eyebrow" style={{ marginBottom: 0 }}>
            Let's talk
          </p>
          <h3>Send me a message</h3>
          <p style={{ marginBottom: 24 }}>This opens your email client with the message pre-filled.</p>

          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <input
                className="form-control"
                name="name"
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
                required
              />
              <input
                className="form-control"
                name="email"
                type="email"
                placeholder="Your email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-row" style={{ gridTemplateColumns: "1fr" }}>
              <input
                className="form-control"
                name="subject"
                placeholder="Subject"
                value={form.subject}
                onChange={handleChange}
              />
            </div>
            <div className="form-row" style={{ gridTemplateColumns: "1fr" }}>
              <textarea
                className="form-control"
                name="message"
                placeholder="Your message..."
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
