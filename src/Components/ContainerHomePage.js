import React from "react";
import { useState, useEffect } from "react";
import { Transition } from "react-transition-group";

function ContainerHomePage() {
  const [isVisible, setIsVisible] = useState(false);

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
                <div className="grid-item">Column 1</div>
                <div className="grid-item">Column 2</div>
              </div>
            </div>
          )}
        </Transition>
      </div>
    </>
  );
}

export default ContainerHomePage;
