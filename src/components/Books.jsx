import React, { useEffect, useMemo, useState } from 'react';
import anime from 'animejs/lib/anime.es.js';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

// --- ΡΥΘΜΙΣΕΙΣ ---
// 1. Ορίστε εδώ τα ράφια που θα εμφανίζονται ως tabs
const SHELVES_TO_DISPLAY = [
  { id: 'favorites', label: 'Favorites' },
  { id: 'med', label: 'Medicine' },
  { id: 'mystery', label: 'Mystery' },
  { id: 'sci-fi-fantacy', label: 'Sci-FI/Fantacy' },
  // { id: 'philosophy', label: 'Philosophy' },
  // Προσθέστε κι άλλα εδώ
];

// 2. Αυτά είναι τα ράφια που ορίζουν το status ενός βιβλίου
const STATUS_SHELVES = ['read', 'currently-reading', 'to-read'];
// --- ΤΕΛΟΣ ΡΥΘΜΙΣΕΩΝ ---

function Books() {
  const [active, setActive] = useState(SHELVES_TO_DISPLAY[0]?.id || '');
  // State για τα βιβλία που εμφανίζονται στα tabs
  const [shelfData, setShelfData] = useState({});
  // State για τα βιβλία που καθορίζουν το status
  const [statusBooks, setStatusBooks] = useState({});

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    async function fetchAllData() {
      setLoading(true);
      setError(null);

      // Ενώνουμε όλα τα ράφια που πρέπει να "κατεβάσουμε" σε μία λίστα
      const shelvesToFetchIds = [
        ...SHELVES_TO_DISPLAY.map(s => s.id),
        ...STATUS_SHELVES
      ];
      const uniqueShelfIds = [...new Set(shelvesToFetchIds)]; // Αποφυγή διπλότυπων

      try {
        const promises = uniqueShelfIds.map(id => fetchShelf(id));
        const results = await Promise.all(promises);

        const newShelfData = {};
        const newStatusBooks = {};

        // Διαχωρίζουμε τα αποτελέσματα στα δύο states
        results.forEach(({ shelf, books }) => {
          if (STATUS_SHELVES.includes(shelf)) {
            newStatusBooks[shelf] = books;
          }
          if (SHELVES_TO_DISPLAY.some(s => s.id === shelf)) {
            newShelfData[shelf] = books;
          }
        });

        setShelfData(newShelfData);
        setStatusBooks(newStatusBooks);

      } catch (e) {
        setError(e.message || String(e));
      } finally {
        setLoading(false);
      }
    }

    fetchAllData();
    // eslint-disable--next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchShelf(shelf) {
    try {
      const proxyUrl = 'https://corsproxy.io/?';
      const rssUrl = `https://www.goodreads.com/review/list_rss/158565203?shelf=${encodeURIComponent(shelf)}`;
      const res = await fetch(`${proxyUrl}${encodeURIComponent(rssUrl)}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      
      const text = await res.text();
      const parser = new DOMParser();
      const xml = parser.parseFromString(text, 'application/xml');
      const items = Array.from(xml.querySelectorAll('item'));
      const books = items.map(item => ({
        id: item.querySelector('link')?.textContent || '#', // Χρησιμοποιούμε το link ως ID
        title: item.querySelector('title')?.textContent || 'Untitled',
        author: item.querySelector('author_name')?.textContent || 'Unknown',
        link: item.querySelector('link')?.textContent || '#',
        image: item.querySelector('book_large_image_url')?.textContent || '',
      }));
      return { shelf, books };
    } catch (e) {
      throw new Error(`Failed to load "${shelf}": ${e.message}`);
    }
  }

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

  const shelfTabs = useMemo(() => SHELVES_TO_DISPLAY.map(s => (
    <button
      key={s.id}
      className={`tab-button ${active === s.id ? 'active' : ''}`}
      onClick={() => setActive(s.id)}
    >
      {s.label}
    </button>
  )), [active]);

  const booksGrid = (shelfId) => {
    const books = shelfData[shelfId] || [];
    if (!books.length && !loading) return <p>No books found on this shelf.</p>;
    
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
  
  // Κεντρική οθόνη φόρτωσης και σφάλματος
  if (loading) return <div className="loader"><div className="spinner" /></div>;
  if (error) return <p>Could not load books because of {error}.</p>;

  return (
    <div ref={sectionAnimationRef}>
      <h2 className="section-title" style={{ marginTop: '2rem' }}>Books</h2>
      <div className="tabs">{shelfTabs}</div>
      <div className="tab-content active">
        {/* Το περιεχόμενο αλλάζει δυναμικά με βάση το 'active' state */}
        {booksGrid(active)}
      </div>
    </div>
  );
}

export default Books;
