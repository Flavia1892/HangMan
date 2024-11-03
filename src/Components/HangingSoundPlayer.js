import React, { useEffect, useRef } from "react";
import hangingSound from "../Sounds/hangingSound.mp3";

const HangingSoundPlayer = () => {
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
      <audio ref={audioRef} src={hangingSound} />
    </div>
  );
};

export default HangingSoundPlayer;
