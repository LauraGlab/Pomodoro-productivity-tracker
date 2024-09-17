import { useState } from "react";
import Controls from "./Controls.jsx";
import TimerCircle from "./TimerCircle";
import "./../css/Timer.css";

export default function Timer() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="timer__section">
      <div className="timer">
        <Controls/>
        <TimerCircle isPlaying={isPlaying} />
      </div>
      <button
        className="playPauseBtn"
        onClick={() => setIsPlaying((yes) => !yes)}
      >
        {isPlaying ? "PAUSE" : "START"}
      </button>
    </div>
  );
}
