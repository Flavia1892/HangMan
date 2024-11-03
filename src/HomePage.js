import React from "react";
import Title from "./Components/Title";
import { Suspense, useState, useEffect } from "react";
import { Transition } from "react-transition-group";
import { Switch } from "@mui/material";
import ContainerHomePage from "./Components/ContainerHomePage";

function HomePage() {
  let [isLoading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

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

  //Theme for page
  const [theme, setTheme] = useState(() => {
    const initalTheme = localStorage.getItem("theme");
    return initalTheme ? initalTheme : "light";
  });

  function getThemeFromLocalStorage() {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
      setTheme(savedTheme);
    }
  }

  function toggleTheme() {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      console.log(theme);
      return newTheme;
    });
  }
  useEffect(() => {
    getThemeFromLocalStorage();
  }, [theme]);
  //End of theme light-dark

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
        <div className={theme}>
          <Suspense fallback={<Loading />}>
            <Title />
            <Switch onClick={toggleTheme}></Switch>
            <ContainerHomePage />
          </Suspense>
        </div>
      )}
    </>
  );
}

export default HomePage;

function Loading() {
  return <h2>🌀 Loading...</h2>;
}
