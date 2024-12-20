import { createContext, useContext, useReducer, useEffect } from "react";

const TimeContext = createContext();

const initialState = {
  pomodoro: "45",
  shortBreak: "5",
  longBreak: "15",
  currentTimer: localStorage.getItem("currentTimer") == null ? "pomodoro" : JSON.parse(localStorage.getItem("currentTimer") || "pomodoro")
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_TIMER":
      return { ...state, [action.payload.identifier]: action.payload.value };
    case "INCREMENT_TIMER":
      return { ...state, [action.payload]: state[action.payload] + 1 };
    case "DECREMENT_TIMER":
      return { ...state, [action.payload]: state[action.payload] - 1 };
    case "SET_CURRENT_TIMER":
      return {
        ...state,
        currentTimer: action.payload,
      };
    default:
      return state;
  }
}


function TimeProvider({ children }) {
  const [{ pomodoro, shortBreak, longBreak, currentTimer }, dispatch] =
    useReducer(reducer, initialState);

    useEffect(() => {
      localStorage.setItem("currentTimer", JSON.stringify(currentTimer));
    }, [currentTimer]);

  function setTimer(identifier, value) {
    dispatch({ type: "SET_TIMER", payload: { identifier, value } });
  }

  function incrementTimer(identifier) {
    dispatch({ type: "INCREMENT_TIMER", payload: identifier });
  }

  function decrementTimer(identifier) {
    dispatch({ type: "DECREMENT_TIMER", payload: identifier });
  }

  function setCurrentTimer(value) {
    dispatch({ type: "SET_CURRENT_TIMER", payload: value });
  }

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
