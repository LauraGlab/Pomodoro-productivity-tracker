import { useEffect, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import useSound from "use-sound";
import { useTimerChange } from "../contexts/TimeContext.jsx";
import { useThemeChange } from "../contexts/ThemeContext.jsx";
import endSound from "./../assets/sounds/success-221935.mp3";
import restartIcon from "./../assets/images/icon-restart.svg";
import "./../css/TimerCircle.css";

export default function TimerCircle({ isPlaying }) {
  const { currentTimer, setCurrentTimer, pomodoro, shortBreak, longBreak } =
    useTimerChange();
  const { changeColor, colorPom, colorShort, colorLong } = useThemeChange();
  const [duration, setDuration] = useState(0);
  const [key, setKey] = useState(0);
  const [textChange, useTextChange] = useState("pomodoro");
  const [mode, setMode] = useState([]);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (currentTimer === "pomodoro") {
      setDuration(pomodoro * 60);
      useTextChange("pomodoro");
      changeColor(colorPom);
      document.title = "Work Time! 🚀";
    }
    if (currentTimer === "shortBreak") {
      setDuration(shortBreak * 60);
      useTextChange("short break");
      changeColor(colorShort);
      document.title = "Break Time! ☕";
    }
    if (currentTimer === "longBreak") {
      setDuration(longBreak * 60);
      useTextChange("long break");
      changeColor(colorLong);
      document.title = "Break Time! 🍵";
    }
    setKey((prevKey) => prevKey + 1);
  }, [currentTimer, pomodoro, shortBreak, longBreak]);

  const children = ({ remainingTime }) => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  };

  const [playOn] = useSound(endSound, { volume: 0.25 });

  function intervals() {
    if (currentTimer === "pomodoro") {
      setMode((m) => [...m, "pomodoro"]);
      setCurrentTimer("shortBreak");
    }
    if (currentTimer === "shortBreak") {
      setMode((m) => [...m, "shortBreak"]);
      setCurrentTimer("pomodoro");
    }
    if (mode.length === 6) {
      setMode((m) => [...m, "longBreak"]);
      setCurrentTimer("longBreak");
    }
    if (
      mode.length % 5 == 0 &&
      mode.length !== 0 &&
      currentTimer === "pomodoro"
    ) {
      setMode((m) => [...m, "longBreak"]);
      setCurrentTimer("longBreak");
    }
    if (currentTimer === "longBreak") {
      setMode((m) => [...m, "longBreak"]);
      setCurrentTimer("pomodoro");
    }
  }

  return (
    <div className="timerCircle__section">
      <CountdownCircleTimer
        className="circleTimer"
        key={key}
        isPlaying={isPlaying}
        duration={duration}
        colors="transparent"
        trailColor="#fffff"
        size={248}
        strokeWidth={248}
        onComplete={() => {
          setIsChecked(true);
          {
            isChecked && playOn();
          }
          intervals();
          return { shouldRepeat: true, delay: 1.5 };
        }}
      >
        {children}
      </CountdownCircleTimer>
      <div className="nameOfCircle">
        <p>{textChange}</p>
        <button
          className="restartIcon"
          onClick={() => setKey((prevKey) => prevKey + 1)}
        >
          <img src={restartIcon} />
        </button>
      </div>
    </div>
  );
}
