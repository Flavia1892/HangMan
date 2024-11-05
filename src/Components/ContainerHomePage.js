import React from "react";
import { useState, useEffect, useRef } from "react";
import { Transition } from "react-transition-group";
import HangingElement from "./HangingElement";
import FetchWord from "./FetchWord";
import GameMusic from "./GameMusic";

function ContainerHomePage() {
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleSVG, setIsVisibleSVG] = useState(true); // Initially the SVG is visible

  let themeColor = localStorage.getItem("theme");
  let color = "";
  if (themeColor === "dark") color = "white";
  else color = "black";

  useEffect(() => {
    // Set a timeout to hide the SVG after 3 seconds (3000 ms)
    const timer = setTimeout(() => {
      setIsVisibleSVG(false); // Hide the SVG by setting state to false
    }, 21000); // Change to the desired timeout duration (in milliseconds)

    // Clean up the timeout if the component unmounts
    return () => clearTimeout(timer);
  }, []); // Empty dependency array means this effect runs only once when the component mounts

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(!isVisible);
    }, 3500);
  }, []);

  return (
    <>
      <div>
        <Transition in={isVisible} timeout={400}>
          {(state) => (
            <div
              style={{
                transition: "opacity 1s ease-in-out",
                opacity: state === "entered" ? 1 : 0,
              }}
            >
              <div className="grid-container">
                <div className="grid-item">
                  {isVisibleSVG ? (
                    <HangingElement />
                  ) : (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 200 250"
                        width="400"
                        height="400"
                        className={isVisibleSVG ? "" : "fade-in"}
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
                        />
                        <line
                          x1="100"
                          y1="50"
                          x2="130"
                          y2="80"
                          stroke={color}
                          strokeWidth="2"
                          strokeDasharray="50"
                        />
                      </svg>
                    </>
                  )}
                </div>
                <div className="grid-item">
                  {isVisibleSVG ? (
                    <p>Loading....</p>
                  ) : (
                    <>
                      <GameMusic />
                      <FetchWord />
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </Transition>
      </div>
    </>
  );
}

export default ContainerHomePage;
