import React, { useEffect, useRef, useState } from "react";
import music from "../Sounds/gameMusic.mp3";

const GameMusic = () => {
  const audioRef = useRef(null);

  useEffect(() => {
    // Play the sound when the component mounts
    const playAudio = async () => {
      try {
        await audioRef.current.play();
      } catch (error) {
        console.error("Error playing audio:", error);
      }
    };

    playAudio();
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div>
      <audio ref={audioRef} src={music} loop />
    </div>
  );
};

export default GameMusic;
