import React from "react";
import { useState, useEffect, useRef } from "react";
import { HashLoader } from "react-spinners";
import { Transition } from "react-transition-group";
import HangingSoundPlayer from "./HangingSoundPlayer";

function Title() {
  let [isLoading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  setTimeout(() => {
    setLoading(false);
  }, 1500);

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(!isVisible);
    }, 2000);
  }, []);

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
          <HashLoader />
        </div>
      ) : (
        <div>
          <Transition in={isVisible} timeout={400}>
            {(state) => (
              <div
                style={{
                  transition: "opacity 1s ease-in-out",
                  opacity: state === "entered" ? 1 : 0,
                }}
              >
                <p class="text-6xl pt-5 pb-5">HangMan Game</p>
                <HangingSoundPlayer/>
              </div>
            )}
          </Transition>
        </div>
      )}
    </>
  );
}

export default Title;
