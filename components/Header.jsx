import Settings from "./Settings.jsx";
import "./../css/Header.css";

export default function Header() {
  return (
    <header>
      <div className="header__section">
        <h1>pomodoro</h1>
        <Settings />
      </div>
    </header>
  );
}
