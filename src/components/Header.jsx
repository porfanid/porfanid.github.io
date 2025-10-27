import React, { useEffect, useState, memo } from 'react'
import anime from 'animejs/lib/anime.es.js'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

function Header({ username }) {
  const [profile, setProfile] = useState(null)

  const headerAnimRef = useScrollAnimation({
    targets: '.profile-img, .profile-name, .profile-bio, .profile-stats .stat, .social-links .social-link',
    translateY: [16, 0],
    opacity: [0, 1],
    delay: anime.stagger(60),
    duration: 700,
    easing: 'easeOutExpo',
  })

  useEffect(() => {
    let isMounted = true
    async function run() {
      try {
        const res = await fetch(`https://api.github.com/users/${username}`)
        const data = await res.json()
        if (!isMounted) return
        setProfile({
          name: data.name || username,
          bio: data.bio || 'No bio available',
          avatar: data.avatar_url,
          repos: data.public_repos,
          followers: data.followers,
          following: data.following,
          html_url: data.html_url,
          twitter_username: data.twitter_username,
        })
      } catch (e) {
        if (!isMounted) return
        setProfile({
          name: username,
          bio: 'Could not load profile data',
          avatar: `https://github.com/${username}.png`,
          repos: 0,
          followers: 0,
          following: 0,
          html_url: `https://github.com/${username}`,
        })
      }
    }
    run()
    return () => { isMounted = false }
  }, [username])

  return (
    <header ref={headerAnimRef}>
      <div className="container">
        <div className="profile">
          <img className="profile-img" src={profile?.avatar || `https://github.com/${username}.png`} alt="Profile" />
          <h1 className="profile-name">{profile?.name || 'Loading...'}</h1>
          <p className="profile-bio">{profile?.bio || 'Loading...'}</p>
          <div className="profile-stats">
            <div className="stat">
              <span className="stat-value">{profile?.repos ?? 0}</span>
              <span className="stat-label">Repositories</span>
            </div>
            <div className="stat">
              <span className="stat-value">{profile?.followers ?? 0}</span>
              <span className="stat-label">Followers</span>
            </div>
            <div className="stat">
              <span className="stat-value">{profile?.following ?? 0}</span>
              <span className="stat-label">Following</span>
            </div>
          </div>
          <div className="social-links">
            <a className="social-link" href={profile?.html_url || `https://github.com/${username}`} target="_blank" rel="noreferrer">
              <i className="fab fa-github" />
            </a>
            {profile?.twitter_username && (
              <a className="social-link" href={`https://twitter.com/${profile.twitter_username}`} target="_blank" rel="noreferrer">
                <i className="fab fa-twitter" />
              </a>
            )}
            
              <a href="mailto:pavlos@orfanidis.net.gr" title="Email" className="social-link">
  <i className="fa-solid fa-envelope"></i> {/* Άλλαξε το class σε className */}
</a>
            
            {/* LinkedIn - Αν δεν έρχεται από το API, μπορείς να το έχεις σταθερό */}
  {!profile?.blog && ( // Εμφάνισέ το μόνο αν δεν υπάρχει blog link από το API για να μην είναι διπλό
       <a href="https://www.linkedin.com/in/porfanid/" target="_blank" rel="noreferrer" className="social-link" title="LinkedIn">
         <i className="fab fa-linkedin"></i> {/* Χρησιμοποιούμε Font Awesome */}
       </a>
   )}
   
   <a href="/CV_EN.pdf" download className="social-link" title="Download CV (EN)">
    <i className="fas fa-file-arrow-down"></i> {/* Χρησιμοποιούμε Font Awesome */}
  </a>
  
  <a className="social-link" href="https://keys.openpgp.org/vks/v1/by-fingerprint/7F4A64C4D77ADF08A616BEF6666855A91B3897F4" target="_blank" title="PGP Key"><i className="fas fa-key"></i></a>
          </div>
        </div>
      </div>
    </header>
  )
}

export default memo(Header);
