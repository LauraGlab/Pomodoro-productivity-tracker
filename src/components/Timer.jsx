import Controls from "./Controls.jsx";
import TimerCircle from "./TimerCircle.jsx";
import "./../css/Timer.css";

export default function Timer() {
  
  return (
    <div className="timer__section">
      <div className="timer">
        <Controls />
        <TimerCircle/>
      </div>
    </div>
  );
}
