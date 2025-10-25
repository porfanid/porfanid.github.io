import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation'; // Προαιρετικό animation

function Resume() {
  // Προαιρετικό: Animation για τα timeline items
  const resumeRef = useScrollAnimation({
    targets: '.timeline-item',
    translateX: [-30, 0], // Animation από αριστερά
    opacity: [0, 1],
    delay: (el, i) => i * 100,
    duration: 800,
    easing: 'easeOutExpo',
  });

  return (
    // Χρησιμοποιούμε container για συνέπεια
    <div className="container resume-section" ref={resumeRef}> 
      <h2 className="section-title">Resume</h2>
      <div className="resume-grid"> {/* Χρησιμοποιούμε grid αντί για row/col */}
        
        {/* Education & Certificates */}
        <div className="resume-column">
          <h3 className="resume-subtitle">Education & Certificates</h3>
          <div className="timeline">
            <div className="timeline-item">
              <span className="timeline-date">2017 - Present</span>
              <h5>Computer Science Engineer</h5>
              <p><em>University of Ioannina, Greece</em></p>
            </div>
            <div className="timeline-item">
              <span className="timeline-date">June 2025</span>
              <h5>BCI & Neurotechnology Masterclass</h5>
              <p><em>g.tec medical engineering GmbH</em></p>
            </div>
            <div className="timeline-item">
              <span className="timeline-date">Dec 2024</span>
              <h5>Employability Skills Programme</h5>
              <p><em>King's Trust International</em></p>
            </div>
             {/* Πρόσθεσε κι άλλα αν χρειάζεται */}
          </div>
        </div>

        {/* Work Experience */}
        <div className="resume-column">
          <h3 className="resume-subtitle">Work Experience</h3>
          <div className="timeline">
            <div className="timeline-item">
              <span className="timeline-date">Dec 2023 - Current</span>
              <h5>Application engineer</h5>
              <p><em>Democritus University of Thrace, Greece</em></p>
              <p className="timeline-description">Engineered and implemented a web application for digital near and far vision measurements. Produces well-structured medical reports to support clinical decision-making.</p>
            </div>
            <div className="timeline-item">
              <span className="timeline-date">Aug 2025 - Sep 2025</span>
              <h5>Embedded systems software developer</h5>
              <p><em>Lamda Electronics</em></p>
              <p className="timeline-description">Developed and programmed an IoT system with multiple sensors that use MODBUS-RTU protocol. Data are stored in a sql database and are available through a web page and a json api.</p>
            </div>
            <div className="timeline-item">
              <span className="timeline-date">Mar 2020 - Aug 2020</span>
              <h5>Web application developer</h5>
              <p><em>Democritus University of Thrace, Greece</em></p>
              <p className="timeline-description">Developed and deployed a full-stack web application to digitize and streamline the application process for the "Acquisition of Academic Teaching Experience" program.</p>
            </div>
             {/* Πρόσθεσε κι άλλα αν χρειάζεται */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Resume;
