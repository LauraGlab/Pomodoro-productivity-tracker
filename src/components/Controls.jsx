import { useTimerChange } from "../contexts/TimeContext.jsx";
import "./../css/Controls.css";
import "./../css/index.css";

export default function Controls() {
  const { setCurrentTimer } = useTimerChange();

  return (
    <div className="controls__section">
      <button
        className="controlButton pomodoro"
        onClick={() => {
          setCurrentTimer("pomodoro");
        }}
      >
        pomodoro
      </button>
      <button
        className="controlButton shortBreak"
        onClick={() => {
          setCurrentTimer("shortBreak");
        }}
      >
        short break
      </button>
      <button
        className="controlButton longBreak"
        onClick={() => {
          setCurrentTimer("longBreak");
        }}
      >
        long break
      </button>
    </div>
  );
}
