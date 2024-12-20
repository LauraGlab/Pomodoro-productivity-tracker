import { useState, useEffect, createContext, useContext} from "react";
import { useLocalStorage } from "./useLocalStorage.jsx";

const DarkThemeContext = createContext();

const DarkThemeProvider = ({children}) => {

const [isDark, setIsDark] = useLocalStorage("isDark", false);
const [isDarkWhilePlaying, setIsDarkWhilePlaying] = useState(false);
const [isPlaying, setIsPlaying] = useState(false);


useEffect(() => {
  if (isDark) {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }

    if (isDarkWhilePlaying && isPlaying) {
      document.body.classList.add("dark");
    } else if (!isDarkWhilePlaying || !isPlaying) {
      document.body.classList.toggle("dark", isDark);
    }
  }, [isDark, isDarkWhilePlaying, isPlaying]);


    return (
      <DarkThemeContext.Provider
        value={{
          isDark,
          setIsDark,
          isPlaying,
          setIsPlaying,
          isDarkWhilePlaying,
          setIsDarkWhilePlaying,
        }}
      >
        {children}
      </DarkThemeContext.Provider>
    );
}


function useDarkThemeChange() {
  const context = useContext(DarkThemeContext);
  if (context === undefined)
    throw new Error("Context was used outside of Provider");
  return context;
}

export { DarkThemeProvider, useDarkThemeChange };