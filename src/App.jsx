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
const REST_REPOS_ENDPOINT = (username) => `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`;

// Books configuration
const SHELVES_TO_DISPLAY = [
  { id: 'favorites', label: 'Favorites' },
  { id: 'comp-sci', label: 'Computer Science' },
  { id: 'med', label: 'Medicine' },
  { id: 'mystery', label: 'Mystery' },
  { id: 'sci-fi-fantacy', label: 'Sci-FI/Fantacy' },
];
const STATUS_SHELVES = ['read', 'currently-reading', 'to-read'];

function App() {
  const [backgroundImage, setBackgroundImage] = useState('');
  const [apodTitle, setApodTitle] = useState('');
  const [chessGames, setChessGames] = useState(null);
  
  const [bio, setBio] = useState(null);
  
  // Projects state
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [projectsError, setProjectsError] = useState(null);
  const [pinnedRepos, setPinnedRepos] = useState([]);
  const [otherRepos, setOtherRepos] = useState([]);
  
  // Books state
  const [booksLoading, setBooksLoading] = useState(true);
  const [booksError, setBooksError] = useState(null);
  const [shelfData, setShelfData] = useState({});
  const [statusBooks, setStatusBooks] = useState({});

  const initialTabs = [
      { id: 'resume', label: 'Resume', path: '/' },
      { id: 'projects', label: 'Projects', path: '/projects' },
      { id: 'books', label: 'Books', path: '/books' },
  ];
  const [tabs, setTabs] = useState(initialTabs);

  const location = useLocation();
  // CV data
  const [cvData, setCvData] = useState({ education: [], workExperience: [] });
  const [cvLoading, setCvLoading] = useState(true);
  const [cvError, setCvError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    fetch(NASA_APOD_ENDPOINT)
      .then(res => res.json())
      .then(data => {
        if (!isMounted) return;
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
        if (!isMounted) return;
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
                if (!isMounted) return;
                setChessGames(currentGames); // Store the actual games
                setTabs(prevTabs => {
                  if (prevTabs.some(tab => tab.id === 'chess')) return prevTabs;
                  const booksIndex = prevTabs.findIndex(tab => tab.id === 'books');
                  const newTabs = [...prevTabs];
                  newTabs.splice(booksIndex + 1, 0, { id: 'chess', label: 'Chess', path: '/chess' });
                  return newTabs;
                });
            } else {
                if (!isMounted) return;
                setChessGames([]);
            }
        } else {
            if (!isMounted) return;
            setChessGames([]);
        }
      } catch (error) {
        if (!isMounted) return;
        console.error("Could not fetch Chess.com games:", error);
        setChessGames([]);
      }
    }

    // Fetch Projects
    async function fetchProjects() {
      setProjectsLoading(true);
      setProjectsError(null);
      const username = 'porfanid';

      try {
        const resp = await fetch(REST_REPOS_ENDPOINT(username));
        if (!resp.ok) {
          throw new Error(`GitHub API Error: ${resp.status} ${resp.statusText}`);
        }
        const allRepos = await resp.json();

        if (!isMounted) return;

        const sortedByStars = [...allRepos].sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0));
        const favorites = sortedByStars.slice(0, 6);
        setPinnedRepos(favorites);

        const favoriteNames = new Set(favorites.map(r => r.name));
        const others = allRepos.filter(r => !favoriteNames.has(r.name));
        setOtherRepos(others);
      } catch (e) {
        if (!isMounted) return;
        setProjectsError(e.message);
      } finally {
        if (!isMounted) return;
        setProjectsLoading(false);
      }
    }

    // Fetch Books
    async function fetchBooks() {
      setBooksLoading(true);
      setBooksError(null);

      const shelvesToFetchIds = [
        ...SHELVES_TO_DISPLAY.map(s => s.id),
        ...STATUS_SHELVES
      ];
      const uniqueShelfIds = [...new Set(shelvesToFetchIds)];

      try {
        const promises = uniqueShelfIds.map(id => fetchShelf(id));
        const results = await Promise.all(promises);

        if (!isMounted) return;

        const newShelfData = {};
        const newStatusBooks = {};

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
        if (!isMounted) return;
        setBooksError(e.message || String(e));
      } finally {
        if (!isMounted) return;
        setBooksLoading(false);
      }
    }

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

    const books = items.map(item => {
      // --- ΕΔΩ ΕΙΝΑΙ Η ΔΙΟΡΘΩΣΗ ---
      // 1. Παίρνουμε το περιεχόμενο του description που περιέχει το σωστό link.
      const descriptionHTML = item.querySelector('description')?.textContent || '';

      // 2. Χρησιμοποιούμε έναν δεύτερο parser για να διαβάσουμε αυτό το HTML string.
      const htmlParser = new DOMParser();
      const doc = htmlParser.parseFromString(descriptionHTML, 'text/html');
      
      // 3. Βρίσκουμε το <a> tag και παίρνουμε το href του.
      const anchorTag = doc.querySelector('a');
      const correctLink = anchorTag 
        ? anchorTag.getAttribute('href') 
        : item.querySelector('link')?.textContent || '#'; // Fallback στο αρχικό link αν κάτι πάει στραβά.
      
      // 4. Επιστρέφουμε το αντικείμενο με το σωστό link.
      return {
        id: item.querySelector('link')?.textContent || '#', // Κρατάμε το μοναδικό link του review ως id
        title: item.querySelector('title')?.textContent || 'Untitled',
        author: item.querySelector('author_name')?.textContent || 'Unknown',
        link: correctLink, // Χρησιμοποιούμε το διορθωμένο link
        image: item.querySelector('book_large_image_url')?.textContent || '',
      };
    });

    return { shelf, books };
  } catch (e) {
    throw new Error(`Failed to load "${shelf}": ${e.message}`);
  }
}
    async function fetchCvData() {
      if (!isMounted) return;
      setCvLoading(true);
      setCvError(null);

      // --- ΛΟΓΙΚΗ ΜΕ ΟΛΟΚΛΗΡΟ ΤΟ ΠΡΟΦΙΛ ORCID ---

      // 1. Βεβαιώσου ότι έχεις βάλει το σωστό ORCID iD.
      const orcidId = '0000-0002-7891-1977'; // Το iD από το παράδειγμά σου.
      
      // Το URL στοχεύει σε ολόκληρο το προφίλ.
      const apiUrl = `https://pub.orcid.org/v3.0/${orcidId}`;

      try {
        const response = await fetch(apiUrl, {
          headers: {
            'Accept': 'application/json' // Ζητάμε πάντα JSON για ευκολία!
          }
        });

        if (!response.ok) {
          throw new Error(`ORCID API Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        
        setBio(data.person.biography.content)
        
        // --- 2. ΕΞΑΓΩΓΗ ΕΚΠΑΙΔΕΥΣΗΣ (EDUCATION) ---
        const educations = data["activities-summary"]?.educations?.['affiliation-group'] || [];
        const educationItems = educations.map(eduGroup => {
          const summary = eduGroup.summaries[0]['education-summary']; // Παίρνουμε το πρώτο summary από το group
          const startDate = summary['start-date'];
          const endDate = summary['end-date'];
          
          // Φτιάχνουμε τη συμβολοσειρά της ημερομηνίας
          const startYear = startDate?.year?.value || '';
          const endYear = endDate?.year?.value || '';
          let dateString = startYear;
          if (endYear && endYear !== startYear) {
            dateString += ` - ${endYear}`;
          } else if (startYear && !endYear) {
             dateString += ' - Present';
          }

          return {
            date: dateString,
            title: summary["role-title"] || 'Studies', // Το ORCID δεν έχει πάντα "τίτλο" για την εκπαίδευση
            organisation: summary.organization?.name || 'Unknown Institution'
          };
        });
        
        const qualifications = data["activities-summary"]?.qualifications?.['affiliation-group'] || [];
        console.log(qualifications)
        
        const qualificationItems = qualifications.map(eduGroup => {
        console.log(eduGroup.summaries[0])
          const summary = eduGroup.summaries[0]['qualification-summary']; // Παίρνουμε το πρώτο summary από το group
          const startDate = summary['start-date'];
          const endDate = summary['end-date'];
          
          // Φτιάχνουμε τη συμβολοσειρά της ημερομηνίας
          const startYear = startDate?.year?.value || '';
          const endYear = endDate?.year?.value || '';
          let dateString = startYear;
          if (endYear && endYear !== startYear) {
            dateString += ` - ${endYear}`;
          } else if (startYear && !endYear) {
             dateString += ' - Present';
          }

          return {
            date: dateString,
            title: summary["role-title"] || 'Studies', // Το ORCID δεν έχει πάντα "τίτλο" για την εκπαίδευση
            organisation: summary.organization?.name || 'Unknown Institution'
          };
        });

        // --- 3. ΕΞΑΓΩΓΗ ΕΡΓΑΣΙΑΚΗΣ ΕΜΠΕΙΡΙΑΣ (EMPLOYMENT) ---
        const employments = data["activities-summary"]?.employments?.['affiliation-group'] || [];
        const workItems = employments.map(empGroup => {
          const summary = empGroup['summaries'][0]["employment-summary"];
          const startDate = summary['start-date'];
          const endDate = summary['end-date'];

          const startYear = startDate?.year?.value || '';
          const endYear = endDate?.year?.value || '';
          let dateString = startYear;
           if (endYear && endYear !== startYear) {
            dateString += ` - ${endYear}`;
          } else if (startYear && !endYear) {
             dateString += ' - Current';
          }
          
          return {
            date: dateString,
            title: summary['role-title'] || 'No role title',
            organisation: summary.organization?.name || 'Unknown Organization',
            description: summary['department-name'] || '' // Χρησιμοποιούμε το όνομα του τμήματος ως περιγραφή
          };
        });

        if (!isMounted) return;

        // 4. Ενημερώνουμε το state και με τις δύο λίστες!
        setCvData({ education: [...educationItems, ...qualificationItems], workExperience: workItems });

      } catch (error) {
        console.error("Failed to process CV from ORCID:", error);
        if (!isMounted) return;
        setCvError(error.message);
        setCvData({ education: [], workExperience: [] });
      } finally {
        if (!isMounted) return;
        setCvLoading(false);
      }
    }

    // Run independent fetches in parallel
    Promise.all([
      fetchChessGames(),
      fetchProjects(),
      fetchBooks(),
      fetchCvData()
    ]);

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div
      className="app-container"
      style={{ '--bg-image': `url(${backgroundImage})` }}
    >
      <Header bio={bio} />

      <nav className="main-tabs-nav">
        <Tabs tabs={tabs} currentPath={location.pathname} />
      </nav>

      <div className="main-content-wrapper">
        <main>
          <Routes>
            <Route path="/" element={
            <Resume
      loading={cvLoading}
      error={cvError}
      education={cvData.education}
      workExperience={cvData.workExperience}
    />
            } />
            <Route 
              path="/projects" 
              element={
                <Projects 
                  loading={projectsLoading}
                  error={projectsError}
                  pinnedRepos={pinnedRepos}
                  otherRepos={otherRepos}
                />
              } 
            />
            <Route 
              path="/books" 
              element={
                <Books 
                  loading={booksLoading}
                  error={booksError}
                  shelfData={shelfData}
                  statusBooks={statusBooks}
                  shelvesToDisplay={SHELVES_TO_DISPLAY}
                  statusShelves={STATUS_SHELVES}
                />
              } 
            />
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

