import Instruction from "./Instruction.jsx";
import Settings from "./Settings.jsx";
import ThemeButton from "./ThemeButton.jsx";
import "./../../css/header/Header.css";

export default function Header() {

  return (
    <header>
      <div className="headerSection">
        <h1>pomodoro</h1>
        <div className="headerBtnSection">
          <ThemeButton />
          <Settings />
          <Instruction />
        </div>
      </div>
    </header>
  );
}
