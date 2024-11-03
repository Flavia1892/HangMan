import React from "react";
import Title from "./Components/Title";
import { Suspense, useState, useEffect } from "react";
import { Transition } from "react-transition-group";

function HomePage() {
  let [isLoading, setLoading] = useState(true);
  let [isFlashing, setIsFlashing] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsFlashing(!isFlashing);
    }, 500);
  });
  setTimeout(() => {
    setIsVisible(!isVisible);
  }, 2000);

  useEffect(() => {
    const handleKeyDown = (event) => {
      setLoading(false);
    };

    // Attach the event listener
    window.addEventListener("keydown", handleKeyDown);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []); // Empty dependency array to run effect only on mount

  return (
    <>
      {isLoading ? (
        <div
          style={{
            width: "100px",
            margin: "auto",
            paddingTop: "30px",
            paddingBottom: "90px",
            marginBottom: "300px",
            marginTop: "300px",
          }}
        >
          <Transition in={isVisible} timeout={400}>
            {(state) => (
              <div
                style={{
                  transition: "opacity 1s ease-in-out",
                  opacity: state === "entered" ? 1 : 0,
                }}
              >
                <button
                  type="button"
                  class="text-xl pt-2 pb-2 pl-2 pr-2 border-2 mb-5"
                  onClick={() => {
                    setLoading(false);
                  }}
                >
                  Start the game
                </button>
                
                <p class="text-2xl">Press the button or any key to start</p>
              </div>
            )}
          </Transition>
        </div>
      ) : (
        <Suspense fallback={<Loading />}>
          <Title />
        </Suspense>
      )}
    </>
  );
}

export default HomePage;

function Loading() {
  return <h2>🌀 Loading...</h2>;
}
