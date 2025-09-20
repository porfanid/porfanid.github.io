import React from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import Joke from './Joke';

function Footer({ username }) {
  const year = new Date().getFullYear()

  const footerRef = useScrollAnimation({
    translateY: [20, 0],
    opacity: [0, 1],
    duration: 700,
    easing: 'easeOutQuad',
  })

  return (
    <footer ref={footerRef}>
      <div className="container">
<Joke /> 

        <hr style={{ margin: '2rem 0', borderColor: 'rgba(173, 186, 199, 0.1)' }} />

        <p className="footer-text">© {year} | Built with <i className="fas fa-heart" style={{ color: '#ff6b6b' }}></i> by <a href={`https://github.com/${username}`}>{username}</a></p>
        <p className="footer-text">Powered by GitHub API</p>
      </div>
    </footer>
  )
}

export default Footer
