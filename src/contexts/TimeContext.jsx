import { createContext, useContext, useState, useEffect } from "react";

const TimeContext = createContext();

function TimeProvider({ children }) {
  const [pomodoro, setPomodoro] = useState(45);
  const [shortBreak, setShortBreak] = useState(5);
  const [longBreak, setLongBreak] = useState(15);
  const [currentTimer, setCurrentTimer] = useState(
    localStorage.getItem("currentTimer")
      ? JSON.parse(localStorage.getItem("currentTimer"))
      : "pomodoro"
  );

  useEffect(() => {
    localStorage.setItem("currentTimer", JSON.stringify(currentTimer));
  }, [currentTimer]);

  const setTimer = (identifier, value) => {
    const numValue = parseInt(value, 10); // Ensure the value is a number
    if (identifier === "pomodoro") setPomodoro(numValue);
    if (identifier === "shortBreak") setShortBreak(numValue);
    if (identifier === "longBreak") setLongBreak(numValue);
  };

  const incrementTimer = (identifier) => {
    if (identifier === "pomodoro") setPomodoro((prev) => prev + 1);
    if (identifier === "shortBreak") setShortBreak((prev) => prev + 1);
    if (identifier === "longBreak") setLongBreak((prev) => prev + 1);
  };

  const decrementTimer = (identifier) => {
    if (identifier === "pomodoro") setPomodoro((prev) => Math.max(0, prev - 1));
    if (identifier === "shortBreak")
      setShortBreak((prev) => Math.max(0, prev - 1));
    if (identifier === "longBreak")
      setLongBreak((prev) => Math.max(0, prev - 1));
  };

  return (
    <TimeContext.Provider
      value={{
        pomodoro,
        shortBreak,
        longBreak,
        setTimer,
        incrementTimer,
        decrementTimer,
        currentTimer,
        setCurrentTimer,
      }}
    >
      {children}
    </TimeContext.Provider>
  );
}

function useTimerChange() {
  const context = useContext(TimeContext);
  if (context === undefined)
    throw new Error("Context was used outside of Provider");
  return context;
}

export { TimeProvider, useTimerChange };
