import React, { useState, useEffect } from "react";

let letterObjects = [];
let middleObjects = [];
let bgColor;

const FetchWord = () => {
  const [randomWord, setRandomWord] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (localStorage.getItem("theme") === "dark") bgColor = "black";
  else bgColor = "white";

  // Function to fetch a random word from the API
  const fetchRandomWord = () => {
    setLoading(true);
    setError("");

    // Fetching from the API
    fetch("https://random-word-api.herokuapp.com/word")
      .then((response) => {
        // Check if the response is successful (status 200)
        if (!response.ok) {
          throw new Error("Failed to fetch word");
        }
        return response.json(); // Parse the JSON from the response
      })
      .then((data) => {
        // Set the first word from the response data array
        setRandomWord(data[0]);
        getWord(data[0]);
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
    fetchRandomWord();

    // Fetch a random word when the component mounts
  }, []); // Empty dependency array to run the effect once

  function getWord(word) {
    letterObjects = Array.from(word);
    middleObjects = letterObjects.slice(1, letterObjects.length - 1);

    console.log(letterObjects);
    console.log(middleObjects);
  }

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      <p>Random Word: {randomWord}</p>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <p
          style={{
            fontSize: "24px",
            textAlign: "center",
            width: "40px",
            paddingTop: "10px",
          }}
        >
          {letterObjects[0]}
        </p>
        <span>
          <input
            type="text"
            maxLength="1"
            style={{
              fontSize: "24px",
              textAlign: "center",
              width: "40px",
              backgroundColor: bgColor,
            }}
          ></input>{" "}
        </span>
        {middleObjects.map((letter, index) => {
          <span key={index}>
            <input
              type="text"
              value={letter}
              maxLength="1"
              style={{
                fontSize: "24px",
                textAlign: "center",
                width: "40px",
                backgroundColor: bgColor,
              }}
            ></input>
          </span>;
        })}

        <span
          style={{
            fontSize: "24px",
            textAlign: "center",
            width: "40px",
            paddingTop: "10px",
          }}
        >
          {letterObjects[letterObjects.length - 1]}
        </span>
      </div>

      <button onClick={fetchRandomWord}>Generate New Word</button>
    </div>
  );
};

export default FetchWord;
