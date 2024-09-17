import { useTimerChange } from "../../contexts/TimeContext.jsx";
import ArrowUp from "./../../assets/images/icon-arrow-up.svg";
import ArrowDown from "./../../assets/images/icon-arrow-down.svg";

export default function SettingsTimer() {
  const {
    pomodoro,
    shortBreak,
    longBreak,
    setTimer,
    incrementTimer,
    decrementTimer,
  } = useTimerChange();

  return (
    <section className="settingTimer__section">
      <div>
        <h2 className="titleSection">TIMER</h2>
      </div>
      <h3>Time (minutes)</h3>
      <div className="times__container">
        <div className="time">
          <p>pomodoro</p>
          <div className="timer-settings">
            <input
              type="number"
              value={pomodoro}
              onChange={(event) => setTimer("pomodoro", event.target.value)}
            />
            <div className="input-controls">
              <img
                src={ArrowUp}
                onClick={() => incrementTimer("pomodoro")}
                alt="Arrow up icon"
                aria-label="Increment the time of work time"
              />
              <img
                src={ArrowDown}
                onClick={() => decrementTimer("pomodoro")}
                alt="Arrow down icon"
                aria-label="Decrement the time of work time"
              />
            </div>
          </div>
        </div>
        <div className="time">
          <p>short break</p>
          <div className="timer-settings">
            <input
              type="number"
              value={shortBreak}
              onChange={(event) => setTimer("shortBreak", event.target.value)}
            />
            <div className="input-controls">
              <img
                src={ArrowUp}
                onClick={() => incrementTimer("shortBreak")}
                alt="Arrow up icon"
                aria-label="Increment the time of a short break"
              />
              <img
                src={ArrowDown}
                onClick={() => decrementTimer("shortBreak")}
                alt="Arrow down icon"
                aria-label="Decrement the time of a short break"
              />
            </div>
          </div>
        </div>
        <div className="time">
          <p>long break</p>
          <div className="timer-settings">
            <input
              type="number"
              value={longBreak}
              onChange={(event) => setTimer("longBreak", event.target.value)}
            />
            <div className="input-controls">
              <img
                src={ArrowUp}
                onClick={() => incrementTimer("longBreak")}
                alt="Arrow up icon"
                aria-label="Increment the time of a long break"
              />
              <img
                src={ArrowDown}
                onClick={() => decrementTimer("longBreak")}
                alt="Arrow down icon"
                aria-label="Increment the time of a long break"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
