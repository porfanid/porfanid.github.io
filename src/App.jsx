import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Tabs from './components/Tabs';
import Resume from './components/Resume';
import Projects from './components/Projects';
import Books from './components/Books';
import Chess from './components/Chess';
import Footer from './components/Footer';

const NASA_APOD_ENDPOINT = `https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&thumbs=true`;
const CHESS_ARCHIVES_URL = `https://api.chess.com/pub/player/porfanid/games/`;

function App() {
  const [backgroundImage, setBackgroundImage] = useState('');
  const [apodTitle, setApodTitle] = useState('');
  const [chessGames, setChessGames] = useState(null);

  const initialTabs = [
      { id: 'resume', label: 'Resume', path: '/' },
      { id: 'projects', label: 'Projects', path: '/projects' },
      { id: 'books', label: 'Books', path: '/books' },
  ];
  const [tabs, setTabs] = useState(initialTabs);

  const location = useLocation();

  useEffect(() => {
    fetch(NASA_APOD_ENDPOINT)
      .then(res => res.json())
      .then(data => {
        setApodTitle(data.title || 'Astronomy Picture of the Day');
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
        setBackgroundImage('https://api.nasa.gov/assets/img/general/apod.jpg');
        setApodTitle('Astronomy Picture of the Day');
      });

    async function fetchChessGames() {
      try {
        const archivesRes = await fetch(CHESS_ARCHIVES_URL);
        const archivesData = await archivesRes.json(); // Use .json() directly
        const monthlyArchives = archivesData.archives; // Chess.com returns archives URLs

        if (monthlyArchives && monthlyArchives.length > 0) {
            // Fetch games from the latest archive URL
            const latestArchiveUrl = monthlyArchives[monthlyArchives.length - 1];
            const gamesRes = await fetch(latestArchiveUrl);
            const gamesData = await gamesRes.json();
            const currentGames = gamesData.games; // Extract games array

            if (currentGames && currentGames.length > 0) {
                setChessGames(currentGames); // Store the actual games
                setTabs(prevTabs => {
                  if (prevTabs.some(tab => tab.id === 'chess')) return prevTabs;
                  const booksIndex = prevTabs.findIndex(tab => tab.id === 'books');
                  const newTabs = [...prevTabs];
                  newTabs.splice(booksIndex + 1, 0, { id: 'chess', label: 'Chess', path: '/chess' });
                  return newTabs;
                });
            } else {
                 setChessGames([]);
            }
        } else {
             setChessGames([]);
        }
      } catch (error) {
           console.error("Could not fetch Chess.com games:", error);
           setChessGames([]);
       }
    }
    fetchChessGames();
  }, []);

  return (
    <div
      className="app-container"
      style={{ '--bg-image': `url(${backgroundImage})` }}
    >
      <Header username="porfanid" />

      <nav className="main-tabs-nav">
        <Tabs tabs={tabs} currentPath={location.pathname} />
      </nav>

      <div className="main-content-wrapper">
        <main>
          <Routes>
            <Route path="/" element={<Resume />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/books" element={<Books />} />
            {chessGames && chessGames.length > 0 && (
              <Route path="/chess" element={<Chess games={chessGames} />} />
            )}
            <Route path="*" element={<Resume />} />
          </Routes>
        </main>
      </div>

      <Footer username="porfanid" />
    </div>
  );
}

export default App;

