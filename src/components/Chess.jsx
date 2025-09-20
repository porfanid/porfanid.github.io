import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

// Helper function to get values from the PGN string
const getPgnTag = (pgn, tagName) => {
  const match = pgn.match(new RegExp(`\\[${tagName} "([^"]+)"\\]`));
  return match ? match[1] : null;
};

function Chess({ games }) {
  // Animation for the game cards
  const chessGamesRef = useScrollAnimation({
    targets: '.chess-game-card',
    translateY: [40, 0],
    opacity: [0, 1],
    delay: (el, i) => i * 100,
    duration: 800,
    easing: 'easeOutExpo',
  });

  // Displaying only the latest 5 games
  const latestGames = games.slice(-5).reverse();

  return (
    <div ref={chessGamesRef}>
      <h2 className="section-title" style={{ marginTop: '2rem' }}>My Latest Chess.com Games</h2>
      <div className="chess-games-grid">
        {latestGames.map((game, index) => {
          // --- Extracting More Data ---
          const whiteUsername = getPgnTag(game.pgn, 'White');
          const blackUsername = getPgnTag(game.pgn, 'Black');
          
          // Determine the opponent
          const whiteElo = getPgnTag(game.pgn, 'WhiteElo');
          const blackElo = getPgnTag(game.pgn, 'BlackElo');
          const isWhite = whiteUsername.toLowerCase() === 'porfanid';
          const opponent = {
            username: isWhite ? blackUsername : whiteUsername,
            rating: isWhite ? blackElo : whiteElo,
          };
          
          const myRating = isWhite ? whiteElo : blackElo
          
          
          
          const result = getPgnTag(game.pgn, 'Result');
          const gameDate = getPgnTag(game.pgn, 'Date');
          const eco = getPgnTag(game.pgn, 'ECO'); // Opening code
          const ecoUrl = getPgnTag(game.pgn, 'ECOUrl'); // Opening code
          
          // --- Determine Game Result from Your Perspective ---
          let resultText = "In Progress";
          let resultClass = "inprogress";
          if (result === '1-0') { // White wins
            resultText = isWhite ? 'Victory' : 'Defeat';
            resultClass = isWhite ? 'victory' : 'defeat';
          } else if (result === '0-1') { // Black wins
            resultText = !isWhite ? 'Victory' : 'Defeat';
            resultClass = !isWhite ? 'victory' : 'defeat';
          } else if (result === '1/2-1/2') {
            resultText = 'Draw';
            resultClass = 'draw';
          }

          // Determine whose turn it is for ongoing games
          const isMyTurn = (isWhite && game.turn === 'white') || (!isWhite && game.turn === 'black');

          return (
            <div key={game.url || index} className="chess-game-card">
              <div className="chess-card-header">
  {/* Your Info */}
  <div className="player-info">
    <span className={`chess-player-color ${isWhite ? 'white' : 'black'}`}></span>
    <a href="https://www.chess.com/member/porfanid" target="_blank" rel="noreferrer" className="player-link">
      Pavlos({myRating})
    </a>
  </div>
  <span className="vs-separator">vs</span>
  {/* Opponent's Info */}
  <div className="player-info">
    <span className={`chess-player-color ${isWhite ? 'black' : 'white'}`}></span>
    <a href={`https://www.chess.com/member/${opponent.username}`} target="_blank" rel="noreferrer" className="player-link">
      {opponent.username}({opponent.rating})
    </a>
  </div>
</div>
              <div className="chess-card-body">
                <span className={`chess-result ${resultClass}`}>{resultText}</span>
                {/* Displaying the game date */}
                <span className="game-date">{gameDate?.replace(/\./g, '-')}</span>
              </div>
              
              {/* --- New Section for Additional Game Details --- */}
              {/* Note: This assumes you have Font Awesome for the icons */}
              <div className="chess-card-meta">
                <span><i className="fas fa-chess-clock"></i> {game.time_class} game</span>
                {eco && <a href={ecoUrl} target="_blank" style={{color: "var(--text)"}}><i className="fas fa-book-open"></i> {eco}</a>}
                {resultClass === 'inprogress' && (
                  <span style={{ color: isMyTurn ? '#f6ad55' : 'inherit' }}>
                     <i className="fas fa-hourglass-half"></i> {isMyTurn ?(<a target="_blank" style={{color: "var(--text)"}} href={"https://www.chess.com/member/porfanid"}>"Pavlos' Turn"</a>): (<a target="_blank" style={{color: "var(--text)"}} href={`https://www.chess.com/member/${opponent.username}`}>{opponent.username}'s Turn</a>)}
                  </span>
                )}
              </div>
              
              <a href={game.url} target="_blank" rel="noreferrer" className="chess-view-game">
                View Game <i className="fas fa-external-link-alt"></i>
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Chess;
