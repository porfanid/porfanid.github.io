import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

// Accept props: loading, error, education, workExperience
function Resume({ loading, error, education, workExperience }) {

  const resumeRef = useScrollAnimation({ /* ... animation config ... */ });

  // Handle loading state
  if (loading) {
    return <div className="loader"><div className="spinner" /></div>;
  }

  // Handle error state
  if (error) {
    return <p style={{ textAlign: 'center', color: 'red' }}>Could not load resume data: {error}</p>;
  }

  return (
    <div className="container resume-section" ref={resumeRef}>
      <h2 className="section-title">Resume</h2>
      <div className="resume-grid">

        {/* Education & Certificates - Render Dynamically */}
        <div className="resume-column">
          <h3 className="resume-subtitle">Education & Certificates</h3>
          <div className="timeline">
            {education.length > 0 ? (
              education.map((item, index) => (
                <div className="timeline-item" key={`edu-${index}`}>
                  <span className="timeline-date">{item.date}</span>
                  <h5>{item.title}</h5>
                  {item.organisation && <p><em>{item.organisation}</em></p>}
                </div>
              ))
            ) : (
              <p>No education information available.</p>
            )}
          </div>
        </div>

        {/* Work Experience - Render Dynamically */}
        <div className="resume-column">
          <h3 className="resume-subtitle">Work Experience</h3>
          <div className="timeline">
            {workExperience.length > 0 ? (
              workExperience.map((item, index) => (
                <div className="timeline-item" key={`work-${index}`}>
                  <span className="timeline-date">{item.date}</span>
                  <h5>{item.title}</h5>
                  {item.organisation && <p><em>{item.organisation}</em></p>}
                  {item.description && <p className="timeline-description">{item.description}</p>}
                </div>
              ))
            ) : (
              <p>No work experience available.</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Resume;
