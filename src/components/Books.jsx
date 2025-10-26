import React, { useEffect, useMemo } from 'react';
import anime from 'animejs/lib/anime.es.js';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { NavLink, useSearchParams } from 'react-router-dom';

function Books({ loading, error, shelfData, statusBooks, shelvesToDisplay, statusShelves }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeShelf = searchParams.get('shelf') || shelvesToDisplay[0]?.id || '';

  // Animations (παραμένουν ίδια)
  const sectionAnimationRef = useScrollAnimation({
    targets: '.section-title',
    translateY: [24, 0],
    opacity: [0, 1],
    duration: 900,
    easing: 'easeOutExpo',
  });

  const booksGridAnimationRef = useScrollAnimation({
    targets: '#books-grid .book-card',
    translateY: [36, 0],
    opacity: [0, 1],
    delay: anime.stagger(80),
    duration: 750,
    easing: 'easeOutExpo',
  });

  useEffect(() => {
    // Set default shelf param if none exists
    if (!searchParams.get('shelf') && shelvesToDisplay[0]) {
      setSearchParams({ shelf: shelvesToDisplay[0].id }, { replace: true });
    }
  }, [searchParams, setSearchParams, shelvesToDisplay]);

  const getBookStatus = (book) => {
    if (statusBooks.read?.some(b => b.id === book.id)) {
      return { class: 'read', label: 'Read' };
    }
    if (statusBooks['currently-reading']?.some(b => b.id === book.id)) {
      return { class: 'currently-reading', label: 'Reading' };
    }
    if (statusBooks['to-read']?.some(b => b.id === book.id)) {
      return { class: 'to-read', label: 'To Read' };
    }
    return null;
  };

  // Use NavLink instead of button
  const shelfTabs = useMemo(() => shelvesToDisplay.map(s => (
    <NavLink
      key={s.id}
      // Link to the current path but change the query parameter
      to={`?shelf=${s.id}`}
      // Use className as a function to prevent NavLink from automatically applying active class
      // We manually control the active state based on the query parameter
      className={() => `tab-button ${activeShelf === s.id ? 'active' : ''}`}
      replace // Replace history entry instead of pushing
    >
      {s.label}
    </NavLink>
  )), [activeShelf]); // Depend on activeShelf derived from URL

  const booksGrid = (shelfId) => {
    const books = shelfData[shelfId] || [];
    if (!books.length && !loading && !error) return <p>No books found on this shelf.</p>;

    // Display error specific to this shelf if data exists but is empty, or general error
    if (error && (!shelfData[shelfId] || shelfData[shelfId].length === 0)) {
        return <p>Could not load books for this shelf: {error}</p>;
    }

    return (
      <div id="books-grid" className="books-grid" ref={booksGridAnimationRef}>
        {books.map((b, idx) => {
          const status = getBookStatus(b);
          return (
            <div className="book-card" key={`${b.id}-${idx}`}>
              {status && (
                 <div className={`status-banner ${status.class}`}>
                   {status.label}
                 </div>
              )}
              <a href={b.link} target="_blank" rel="noreferrer">
                <img src={b.image} alt={b.title} />
              </a>
              <div className="book-title"><a href={b.link} target="_blank" rel="noreferrer">{b.title}</a></div>
              <div className="book-author">{b.author}</div>
            </div>
          );
        })}
      </div>
    );
  };

  // Central loading and error display for initial fetch
  if (loading && Object.keys(shelfData).length === 0) return <div className="loader"><div className="spinner" /></div>;
 // Display general error only if no shelf data could be loaded at all
  if (error && Object.keys(shelfData).length === 0 && !loading) return <p>Could not load any book data: {error}.</p>;


  return (
    <div ref={sectionAnimationRef}>
      <h2 className="section-title" style={{ marginTop: '2rem' }}>Books</h2>
      <div style={{
      display: "flex",
  	justifyContent: "center"
      }}>
      <div className="tabs">{shelfTabs}</div>
      </div>
      <div className="tab-content active">
        {/* Render content based on activeShelf from URL */}
        {booksGrid(activeShelf)}
      </div>
    </div>
  );
}

export default Books;
