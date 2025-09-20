import React, { useState, useEffect } from 'react';

function Joke() {
  const [joke, setJoke] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchJoke = () => {
    if (loading) return; // Αποτρέπουμε πολλαπλά κλικ
    setLoading(true);
    fetch('https://official-joke-api.appspot.com/jokes/programming/random')
      .then(res => res.json())
      .then(data => {
        setJoke(data[0]);
        setLoading(false);
      })
      .catch(error => {
        console.error("Failed to fetch joke:", error);
        setJoke({
          setup: "Why did the developer go broke?",
          punchline: "Because he used up all his cache."
        });
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchJoke();
  }, []);

  return (
    <div className="joke-container">
      <div className="joke-header">
        <h4>A Joke for the Road...</h4>
        {/* Το νέο κουμπί-εικονίδιο */}
        <button 
          onClick={fetchJoke} 
          disabled={loading} 
          className="joke-refresh-button" 
          aria-label="Get a new joke"
        >
          <i className={`fas fa-sync ${loading ? 'fa-spin' : ''}`} />
        </button>
      </div>
      <div className="joke-content">
        {joke ? (
          <>
            <p className="joke-setup">{joke.setup}</p>
            <p className="joke-punchline"><em>{joke.punchline}</em></p>
          </>
        ) : (
          <p>Loading a great joke...</p>
        )}
      </div>
    </div>
  );
}

export default Joke;
