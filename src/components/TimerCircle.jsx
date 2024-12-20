import { useEffect, useRef } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useLocalStorage } from "./../contexts/useLocalStorage";
import { useDarkThemeChange } from "../contexts/DarkThemeContext.jsx";
import { useTimerChange } from "../contexts/TimeContext.jsx";
import { useThemeChange } from "../contexts/ThemeContext.jsx";
import endSound from "./../assets/sounds/success-221935.mp3";
import nextIcon from "./../assets/images/icon-next.svg";
import pauseIcon from "./../assets/images/icon-pause.svg";
import restartIcon from "./../assets/images/icon-restart.svg";
import startIcon from "./../assets/images/icon-play.svg";
import "./../css/TimerCircle.css";

const TIMER_POMODORO = "pomodoro";
const TIMER_SHORT_BREAK = "shortBreak";
const TIMER_LONG_BREAK = "longBreak";

export default function TimerCircle() {
  const [duration, setDuration] = useLocalStorage("duration", 0);
  const [key, setKey] = useLocalStorage("key", 0);
  const [mode, setMode] = useLocalStorage("mode", []);
  const { currentTimer, setCurrentTimer, pomodoro, shortBreak, longBreak } =
    useTimerChange();
  const { changeColor, colorPom, colorShort, colorLong } = useThemeChange();
  const audioPlayer = useRef(null);
  const { isPlaying, setIsPlaying } = useDarkThemeChange();

  useEffect(() => {
    if (currentTimer === TIMER_POMODORO) {
      setDuration(pomodoro * 60);
      changeColor(colorPom);
      document.title = "Work Time! 🚀 | Pomodoro";
    }
    if (currentTimer === TIMER_SHORT_BREAK) {
      setDuration(shortBreak * 60);
      changeColor(colorShort);
      document.title = "Break Time! ☕ | Pomodoro";
    }
    if (currentTimer === TIMER_LONG_BREAK) {
      setDuration(longBreak * 60);
      changeColor(colorLong);
      document.title = "Break Time! 🍵 | Pomodoro";
    }
    setKey((prevKey) => prevKey + 1);
  }, [currentTimer, pomodoro, shortBreak, longBreak]);

  const children = ({ remainingTime }) => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  };

  const playAudio = () => {
    audioPlayer.current.play();
  };

  const intervals = () => {
    let nextTimer = "";
    const nextMode = [...mode];

    if (currentTimer === TIMER_POMODORO) {
      nextTimer = TIMER_SHORT_BREAK;
      nextMode.push(TIMER_POMODORO);
    } else if (currentTimer === TIMER_SHORT_BREAK) {
      nextTimer = TIMER_POMODORO;
      nextMode.push(TIMER_SHORT_BREAK);
    } else if (currentTimer === TIMER_LONG_BREAK) {
      nextTimer = TIMER_POMODORO;
      nextMode.push(TIMER_LONG_BREAK);
    }

    if (
      nextMode.filter((m) => m === TIMER_POMODORO).length % 4 === 0 &&
      currentTimer === TIMER_POMODORO
    ) {
      nextTimer = TIMER_LONG_BREAK;
    }

    setMode(nextMode);
    setCurrentTimer(nextTimer);
  };

  return (
    <div className="timerCircle__section">
      <CountdownCircleTimer
        className="timerCircle"
        key={key}
        isPlaying={isPlaying}
        duration={duration}
        colors="rgba(255, 255, 255, 0.181)"
        strokeLinecap="butt"
        trailColor="transparent"
        size={280}
        strokeWidth={140}
        strokeHeight={1}
        onComplete={() => {
          playAudio();
          intervals();
          return { shouldRepeat: true, delay: 1.5 };
        }}
      >
        {children}
      </CountdownCircleTimer>
      <audio ref={audioPlayer} src={endSound} />
      <div className="menuSection">
        {isPlaying ? (
          <>
            <button
              className="restartIcon"
              onClick={() => setKey((prevKey) => prevKey + 1)}
            >
              <img src={restartIcon} alt="Restart Timer" />
            </button>
            <button
              className="playPauseBtn"
              onClick={() => setIsPlaying((yes) => !yes)}
            >
              <img className="playPauseImg" src={pauseIcon} alt="Pause Timer" />
              Pause
            </button>
            <button className="restartIcon" onClick={intervals}>
              <img src={nextIcon} alt="Next Timer" />
            </button>
          </>
        ) : (
          <>
            <button
              className="playPauseBtn"
              onClick={() => setIsPlaying((yes) => !yes)}
            >
              <img className="playPauseImg" src={startIcon} alt="Start Timer" />
              Start
            </button>
          </>
        )}
      </div>
    </div>
  );
}