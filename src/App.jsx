import { useState, useEffect, useMemo } from "react";
import { useThemeChange } from "./contexts/ThemeContext.jsx";
import { useTodosChange } from "./contexts/TodoContext.jsx"; 
import DailyProgress from "./components/DailyProgress.jsx";
import Footer from "./components/Footer.jsx";
import Header from "./components/header-components/Header.jsx";
import Loading from "./components/Loading.jsx";
import Timer from "./components/Timer.jsx";
import ToDo from "./components/todolist-components/ToDo.jsx";
import "./css/index.css";


export default function App() {
  const { color } = useThemeChange();
  const [loading, setLoading] = useState(true);
  const { todos} = useTodosChange();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3300);
    console.log.apply(console, [
      "%c Designed and Coded by Laura Głąb",
      "color: white" +
        "; background: padding:5px 0; border-radius: 5px; font-weight: bold; background-color: #ff7dde;",
    ]);

    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    document.documentElement.style.setProperty("--color", color);
  }, [color]);
  
  const completedTasks = useMemo(
    () => todos.filter((todo) => todo.done).length,
    [todos]
  );
  
  if (loading) {
    return <Loading />;
  }

 
  return (
    <div className="app">
      <Header />
      <div className="main">
        <div className="firstSection">
          <Timer />
          <DailyProgress completedTasks={completedTasks} todos={todos} />
        </div>
        <div className="secondSection">
          <ToDo/>
        </div>
      </div>
      <Footer />
    </div>
  );
}

