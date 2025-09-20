import React, { useState, useEffect } from 'react';
import anime from 'animejs/lib/anime.es.js';
import { useScrollAnimation } from './hooks/useScrollAnimation';
import Header from './components/Header';
import Tabs from './components/Tabs';
import Projects from './components/Projects';
import Books from './components/Books';
import Footer from './components/Footer';
import Chess from './components/Chess';

// Το API endpoint της NASA (με thumbs για βίντεο)
const NASA_APOD_ENDPOINT = `https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&thumbs=true`;
const CHESS_ARCHIVES_URL = `https://api.chess.com/pub/player/porfanid/games/`;

function App() {
  const [activeTab, setActiveTab] = useState('projects');
  const [backgroundImage, setBackgroundImage] = useState('');
  const [apodTitle, setApodTitle] = useState('');
  const [chessGames, setChessGames] = useState(null);
  const [tabs, setTabs] = useState([
    { id: 'projects', label: 'Projects' },
    { id: 'books', label: 'Books' },
  ]);

  const heroRef = useScrollAnimation({
    translateY: [24, 0],
    opacity: [0, 1],
    duration: 900,
    easing: 'easeOutExpo',
  });

  useEffect(() => {
    // Φέρνουμε την εικόνα της ημέρας όταν φορτώνει η εφαρμογή
    fetch(NASA_APOD_ENDPOINT)
      .then(res => res.json())
      .then(data => {
        setApodTitle(data.title || 'Astronomy Picture of the Day');
        // Ελέγχουμε αν το APOD είναι εικόνα (μερικές φορές είναι βίντεο)
        if (data.media_type === 'image') {
          setBackgroundImage(data.hdurl || data.url);
        } else if (data.media_type === 'video' && data.thumbnail_url) {
          setBackgroundImage(data.thumbnail_url);
        } else if (data.url) {
          setBackgroundImage(data.url);
        } else {
          setBackgroundImage('https://api.nasa.gov/assets/img/general/apod.jpg');
        }
      })
      .catch(error => {
        console.error("Could not fetch NASA APOD:", error);
        // Βάζουμε μια default εικόνα σε περίπτωση σφάλματος
        setBackgroundImage('https://api.nasa.gov/assets/img/general/apod.jpg');
        setApodTitle('Astronomy Picture of the Day');
      });
      
      
      
      // 👇 4. Λογική για το Chess.com
    async function fetchChessGames() {
      try {
        const archivesRes = await fetch(CHESS_ARCHIVES_URL);
        const archivesDataText = await archivesRes.text();
        const archivesData = JSON.parse(archivesDataText)
        console.log(archivesData)
        const monthlyArchives = archivesData.games;

        if (monthlyArchives && monthlyArchives.length > 0) {
          
          if (monthlyArchives && monthlyArchives.length > 0) {
            // Βρέθηκαν παιχνίδια!
            setChessGames(monthlyArchives);
            // Προσθέτουμε το tab στη λίστα
            setTabs(prevTabs => {
              if (prevTabs.some(tab => tab.id === 'chess')) return prevTabs; // Αν υπάρχει ήδη, μην το ξαναβάλεις
              return [...prevTabs, { id: 'chess', label: 'Chess' }];
            });
          } else {
            setChessGames([]); // Δεν βρέθηκαν παιχνίδια, αποθηκεύουμε κενό πίνακα
          }
        }
      } catch (error) {
        console.error("Could not fetch Chess.com games:", error);
        setChessGames([]); // Σε περίπτωση σφάλματος, δεν δείχνουμε το tab
      }
    }

    fetchChessGames();
  }, []); // Το [] σημαίνει ότι θα τρέξει μόνο μία φορά στην αρχή

  return (
    // Χρησιμοποιούμε τη νέα κλάση και περνάμε τη διεύθυνση της εικόνας στη CSS μεταβλητή
    <div 
      className="app-container" 
      style={{ '--bg-image': `url(${backgroundImage})` }}
    >

      <Header username="porfanid" />

      <nav className="main-tabs-nav">
        <Tabs
          tabs={tabs}
          activeTab={activeTab}
          onChange={setActiveTab}
        />
      </nav>

      <div className="main-content-wrapper">
        <main>
          {activeTab === 'projects' && (
            <section className="projects">
              <Projects />
            </section>
          )}

          {activeTab === 'books' && (
            <section className="books-section">
              <Books />
            </section>
          )}
          
          {/* 👇 6. Εμφανίζουμε το component του Chess μόνο αν είναι ενεργό το tab */}
          {activeTab === 'chess' && (
            <section className="chess-section">
              {chessGames && <Chess games={chessGames} />}
            </section>
          )}
        </main>
      </div>


      <Footer username="porfanid" />
    </div>
  );
}

export default App;
