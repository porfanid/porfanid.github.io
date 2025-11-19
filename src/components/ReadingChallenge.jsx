import React, { useEffect } from 'react';
import "./ReadingChallenge.css";

function ReadingChallenge() {
  useEffect(() => {
    // 1. Φόρτωση του Goodreads script (όπως πριν)
    if (document.getElementById('goodreads-challenge-script')) {
      return;
    }
    const script = document.createElement('script');
    script.src = "https://www.goodreads.com/user_challenges/widget/158565203-pavlos-orfanidis?challenge_id=11627&v=2";
    script.async = true; 
    script.id = 'goodreads-challenge-script';
    document.body.appendChild(script);

    // 2. Εφαρμογή διόρθωσης μετά από μικρή καθυστέρηση
    // Δίνουμε 500ms χρόνο στο script να τρέξει και να δημιουργήσει τα div.
    const fixStyles = setTimeout(() => {
      const widgetContent = document.getElementById('gr_challenge_progress_body_11627');

      if (widgetContent) {
        // Στοχεύουμε το ΕΞΩΤΕΡΙΚΟ div της μπάρας (αυτό που έχει το width: 100px)
        const outerProgressBarDiv = widgetContent.querySelector('div[style*="width: 100px"]');
        
        // Στοχεύουμε το ΕΣΩΤΕΡΙΚΟ div της μπάρας (αυτό που έχει το width: X%)
        const innerProgressBarDiv = widgetContent.querySelector('div[style*="background-color: #D7D2C4"]');

        if (outerProgressBarDiv) {
          // Κρίσιμη Αφαίρεση: Αφαιρούμε το Style attribute από το εξωτερικό div
          // Αυτό αφαιρεί το width: 100px, επιτρέποντας στο CSS μας να εφαρμόσει το width: 100%!important.
          outerProgressBarDiv.removeAttribute('style');
        }

        // Εάν θέλουμε να εξασφαλίσουμε ότι το εσωτερικό div έχει το πλάτος του,
        // μπορούμε να αφαιρέσουμε τα περιττά styles, αφήνοντας μόνο το width.
        // Εναλλακτικά, αφήνουμε το inner style όπως είναι, καθώς το CSS μας το χρωματίζει.
        // Θα αφήσουμε το inner div προς το παρόν.
      }
    }, 500); // 500 milliseconds delay

    return () => {
      clearTimeout(fixStyles);
      const scriptElement = document.getElementById('goodreads-challenge-script');
      if (scriptElement) {
         document.body.removeChild(scriptElement);
      }
    };
  }, []);

  return (
    <div id="gr_challenge_progress_body_11627">
      Loading Goodreads Reading Challenge...
    </div>
  );
}

export default ReadingChallenge;
