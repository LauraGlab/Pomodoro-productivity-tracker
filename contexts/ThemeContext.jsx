import { useContext, useState, useReducer, createContext } from "react";

const ThemeContext = createContext();

const initialState = {
  color: "radial-gradient(at top right, hsl(359, 88%, 64%), #F8908D)",
};

function reducer(state, action) {
  switch (action.type) {
    case "CHANGE_COLOR":
      return { ...state, color: action.payload };
    default:
      return state;
  }
}

function ThemeProvider({ children }) {
  const [colorPom, setColorPom] = useState("var(--red)");
  const [colorShort, setColorShort] = useState(" var(--yellow)");
  const [colorLong, setColorLong] = useState(" var(--blue)");

  const [{ color }, dispatch] = useReducer(reducer, initialState);

  function changeColor(value) {
    dispatch({ type: "CHANGE_COLOR", payload: value });
  }

  return (
    <ThemeContext.Provider
      value={{
        colorPom,
        colorShort,
        colorLong,
        setColorPom,
        setColorShort,
        setColorLong,
        color,
        changeColor,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

function useThemeChange() {
  const context = useContext(ThemeContext);
  if (context === undefined)
    throw new Error("Context was used outside of Provider");
  return context;
}

export { ThemeProvider, useThemeChange };
