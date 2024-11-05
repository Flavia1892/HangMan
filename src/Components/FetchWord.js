import React, { useState, useEffect } from 'react';

const FetchWord = () => {
  const [randomWord, setRandomWord] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Function to fetch a random word from the API
  const fetchRandomWord = () => {
    setLoading(true);
    setError('');
    
    // Fetching from the API
    fetch('https://random-word-api.herokuapp.com/word')
      .then((response) => {
        // Check if the response is successful (status 200)
        if (!response.ok) {
          throw new Error('Failed to fetch word');
        }
        return response.json(); // Parse the JSON from the response
      })
      .then((data) => {
        // Set the first word from the response data array
        setRandomWord(data[0]);
      })
      .catch((err) => {
        // Handle any error that occurs during the fetch
        setError(err.message);
      })
      .finally(() => {
        setLoading(false); // Stop loading when done
      });
  };

  useEffect(() => {
    fetchRandomWord(); // Fetch a random word when the component mounts
  }, []); // Empty dependency array to run the effect once

  return (
    <div>
      
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <p>Random Word: {randomWord}</p>
      <button onClick={fetchRandomWord}>Generate New Word</button>
    </div>
  );
};

export default FetchWord;
