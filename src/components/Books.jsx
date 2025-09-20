import React, { useEffect, useMemo, useState } from 'react'
import anime from 'animejs/lib/anime.es.js'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const SHELVES = [
  { id: 'currently-reading', label: 'Currently Reading' },
  { id: 'read', label: 'Read' },
  { id: 'to-read', label: 'To Read' },
]

function Books() {
  const [active, setActive] = useState('currently-reading')
  const [data, setData] = useState({})
  const [loading, setLoading] = useState({})
  const [error, setError] = useState({})

  // Section title animation
  const sectionAnimationRef = useScrollAnimation({
    targets: '.section-title',
    translateY: [24, 0],
    opacity: [0, 1],
    duration: 900,
    easing: 'easeOutExpo',
  })

  // Books grid animation (stagger cards)
  const booksGridAnimationRef = useScrollAnimation({
    targets: '#books-grid .book-card',
    translateY: [36, 0],
    opacity: [0, 1],
    delay: anime.stagger(80),
    duration: 750,
    easing: 'easeOutExpo',
  })

  useEffect(() => {
    // Preload all shelves (like the original), but only once per shelf
    SHELVES.forEach(shelf => {
      if (!data[shelf.id] && !loading[shelf.id]) {
        fetchShelf(shelf.id)
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function fetchShelf(shelf) {
    setLoading(prev => ({ ...prev, [shelf]: true }))
    setError(prev => ({ ...prev, [shelf]: null }))
    try {
      const proxyUrl = 'https://corsproxy.io/?'
      const rssUrl = `https://www.goodreads.com/review/list_rss/158565203?shelf=${encodeURIComponent(shelf)}`
      const res = await fetch(`${proxyUrl}${encodeURIComponent(rssUrl)}`)
      if (!res.ok) {
        const text = await res.text()
        throw new Error(`HTTP ${res.status} - ${text}`)
      }
      const text = await res.text()
      const parser = new DOMParser()
      const xml = parser.parseFromString(text, 'application/xml')
      const items = Array.from(xml.querySelectorAll('item'))
      const books = items.map(item => ({
        title: item.querySelector('title')?.textContent || 'Untitled',
        author: item.querySelector('author_name')?.textContent || 'Unknown',
        link: item.querySelector('link')?.textContent || '#',
        image: item.querySelector('book_large_image_url')?.textContent || '',
      }))
      setData(prev => ({ ...prev, [shelf]: books }))
    } catch (e) {
      setError(prev => ({ ...prev, [shelf]: e.message || String(e) }))
    } finally {
      setLoading(prev => ({ ...prev, [shelf]: false }))
    }
  }

  const shelfTabs = useMemo(() => SHELVES.map(s => (
    <button
      key={s.id}
      className={`tab-button ${active === s.id ? 'active' : ''}`}
      onClick={() => setActive(s.id)}
    >
      {s.label}
    </button>
  )), [active])

  const booksGrid = (shelf) => {
    if (loading[shelf]) return <div className="loader"><div className="spinner" /></div>
    if (error[shelf]) return <p>Could not load books from the "{shelf}" shelf because of {error[shelf]}.</p>
    const books = data[shelf] || []
    if (!books.length) return <p>No books found on this shelf.</p>
    return (
      <div id="books-grid" className="books-grid" ref={booksGridAnimationRef}>
        {books.map((b, idx) => (
          <div className="book-card" key={`${b.link}-${idx}`}>
            <a href={b.link} target="_blank" rel="noreferrer">
              {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
              <img src={b.image} alt={b.title} />
            </a>
            <div className="book-title"><a href={b.link} target="_blank" rel="noreferrer">{b.title}</a></div>
            <div className="book-author">{b.author}</div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div ref={sectionAnimationRef}>
      <h2 className="section-title" style={{ marginTop: '2rem' }}>Books</h2>
      <div className="tabs">{shelfTabs}</div>
      <div className={`tab-content ${active === 'currently-reading' ? 'active' : ''}`}>
        {active === 'currently-reading' && booksGrid('currently-reading')}
      </div>
      <div className={`tab-content ${active === 'read' ? 'active' : ''}`}>
        {active === 'read' && booksGrid('read')}
      </div>
      <div className={`tab-content ${active === 'to-read' ? 'active' : ''}`}>
        {active === 'to-read' && booksGrid('to-read')}
      </div>
    </div>
  )
}

export default Books
