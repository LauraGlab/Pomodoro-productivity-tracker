import { useState, useEffect } from "react";
import { useThemeChange } from "./contexts/ThemeContext.jsx";
import Header from "./components/Header.jsx";
import Loading from "./components/Loading.jsx";
import Timer from "./components/Timer.jsx";
import ToDo from "./components/todolist-components/ToDo.jsx";
import "./css/index.css";

function App() {
  const { color } = useThemeChange();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 3300);
    console.log.apply(console, [
      "%c Designed and Coded by Laura Głąb",
      "color: white" +
        "; background: padding:5px 0; border-radius: 5px; font-weight: bold; background-color: #ff7dde;",
    ]);
  }, []);

  if (loading) {
    return <Loading />;
  }

  document.documentElement.style.setProperty("--color", color);

  return (
    <div className="app">
      <div className="main">
        <Header />
        <Timer />
        <div className="second__container">
          <ToDo />
        </div>
      </div>
    </div>
  );
}

export default App;
