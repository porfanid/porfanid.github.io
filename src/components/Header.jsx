import React, { useEffect, useState, memo } from 'react'
import anime from 'animejs/lib/anime.es.js'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { getCalApi } from "@calcom/embed-react";

function Header({ bio }) {
  const [profile, setProfile] = useState(null)
  
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({"namespace":"meeting"});
      cal("ui", {"hideEventTypeDetails":true,"layout":"month_view"});
    })();
  }, [])
  

  const headerAnimRef = useScrollAnimation({
    targets: '.profile-img, .profile-name, .profile-bio, .profile-stats .stat, .social-links .social-link',
    translateY: [16, 0],
    opacity: [0, 1],
    delay: anime.stagger(60),
    duration: 700,
    easing: 'easeOutExpo',
  })

  

  return (
    <header ref={headerAnimRef}>
      <div className="container">
        <div className="profile">
          <img className="profile-img" src={`https://github.com/porfanid.png`} alt="Profile" />
          <h1 className="profile-name">Pavlos Orfanidis</h1>
          <p className="profile-bio">{bio || 'Loading...'}</p>
          <div className="social-links">
            
            <a href="mailto:pavlos@orfanidis.net.gr" title="Email" className="social-link">
  <i className="fa-solid fa-envelope"></i> {/* Άλλαξε το class σε className */}
</a>

  <a className="social-link" href="https://keys.openpgp.org/vks/v1/by-fingerprint/7F4A64C4D77ADF08A616BEF6666855A91B3897F4" target="_blank" title="PGP Key"><i className="fas fa-key"></i></a>
  
     <a href="/CV_EN.pdf" download className="social-link" title="Download CV (EN)">
    <i className="fas fa-file-arrow-down"></i> {/* Χρησιμοποιούμε Font Awesome */}
  </a>
 
 
<a className="social-link" data-cal-namespace="meeting"
    data-cal-link="porfanid/meeting"
    data-cal-config='{"layout":"month_view","theme":"auto"}'
  ><i className="fas fa-calendar-alt"></i></a>
  
  </div>
  <div className="social-links">
  
  <a className="social-link" href={profile?.html_url || `https://github.com/porfanid`} target="_blank" rel="noreferrer">
              <i className="fab fa-github" />
            </a>
            
            
         
   
   <a href="https://www.linkedin.com/in/porfanid/" target="_blank" rel="noreferrer" className="social-link" title="LinkedIn">
         <i className="fab fa-linkedin"></i> {/* Χρησιμοποιούμε Font Awesome */}
       </a>
  
  <a
            className="social-link"
            href="https://orcid.org/0000-0002-7891-1977"
            target="_blank"
            rel="noreferrer"
            title="ORCID Profile"
          >
            <i className="fab fa-orcid"></i>
          </a>
          
          <a
            className="social-link"
            href="https://www.goodreads.com/user/show/158565203-pavlos-orfanidis"
            target="_blank"
            rel="noreferrer"
            title="Goodreads Profile" 
          >
            <i className="fab fa-goodreads-g"></i> 
          </a>
  

          </div>
        </div>
      </div>
    </header>
  )
}

export default memo(Header);
