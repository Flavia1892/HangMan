import React, { useState, useEffect, useRef } from "react";

const HangingElement = () => {
  const [animationStep, setAnimationStep] = useState(0);
  const treeRef = useRef(null);

  let themeColor = localStorage.getItem("theme");
  let color = "";
  if (themeColor === "dark") color = "white";
  else color = "black";

  // Increment the animation step every second
  useEffect(() => {
    const timer = setInterval(() => {
      setAnimationStep((prevStep) => prevStep + 1);
    }, 1300); // 1.3 second interval for each step

    // When the last animation step is reached, add the swing effect
    if (animationStep === 6) {
      treeRef.current.classList.add("swing");
    }

    return () => clearInterval(timer);
  }, [animationStep]);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 250"
      width="400"
      height="400"
      className="hangman-tree"
      ref={treeRef} // Reference for the SVG element to add swing class
    >
      {/* Tree Trunk */}
      <line
        x1="100"
        y1="50"
        x2="100"
        y2="150"
        stroke={color}
        strokeWidth="2"
        strokeDasharray="100"
        strokeDashoffset={animationStep >= 1 ? "0" : "100"}
      />

      {/* Tree Branches */}
      <line
        x1="100"
        y1="50"
        x2="70"
        y2="80"
        stroke={color}
        strokeWidth="2"
        strokeDasharray="50"
        strokeDashoffset={animationStep >= 2 ? "0" : "50"}
      />
      <line
        x1="100"
        y1="50"
        x2="130"
        y2="80"
        stroke={color}
        strokeWidth="2"
        strokeDasharray="50"
        strokeDashoffset={animationStep >= 2 ? "0" : "50"}
      />

      {/* Head */}
      <circle
        cx="100"
        cy="170"
        r="10"
        stroke={color}
        strokeWidth="2"
        fill="none"
        strokeDasharray="62.8"
        strokeDashoffset={animationStep >= 3 ? "0" : "62.8"}
      />

      {/* Body */}
      <line
        x1="100"
        y1="180"
        x2="100"
        y2="210"
        stroke={color}
        strokeWidth="2"
        strokeDasharray="30"
        strokeDashoffset={animationStep >= 4 ? "0" : "30"}
      />

      {/* Arms */}
      <line
        x1="100"
        y1="185"
        x2="70"
        y2="200"
        stroke={color}
        strokeWidth="2"
        strokeDasharray="40"
        strokeDashoffset={animationStep >= 5 ? "0" : "40"}
      />
      <line
        x1="100"
        y1="185"
        x2="130"
        y2="200"
        stroke={color}
        strokeWidth="2"
        strokeDasharray="40"
        strokeDashoffset={animationStep >= 5 ? "0" : "40"}
      />

      {/* Legs */}
      <line
        x1="100"
        y1="210"
        x2="70"
        y2="230"
        stroke={color}
        strokeWidth="2"
        strokeDasharray="40"
        strokeDashoffset={animationStep >= 6 ? "0" : "40"}
      />
      <line
        x1="100"
        y1="210"
        x2="130"
        y2="230"
        stroke={color}
        strokeWidth="2"
        strokeDasharray="40"
        strokeDashoffset={animationStep >= 6 ? "0" : "40"}
      />
    </svg>
  );
};

export default HangingElement;
