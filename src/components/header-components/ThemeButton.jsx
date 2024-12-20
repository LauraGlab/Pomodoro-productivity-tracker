import Toggle from "react-toggle";
import { useDarkThemeChange } from "../../contexts/DarkThemeContext.jsx";
import "./../../css/header/Toggle.css";

export default function ThemeButton() {
  const { isDark, setIsDark } = useDarkThemeChange();

  return (
    <>
      <Toggle
        checked={isDark}
        onChange={({ target }) => setIsDark(target.checked)}
        icons={{ checked: "🌙", unchecked: "🔆" }}
        aria-label="Dark mode toggle"
      />
    </>
  );
}
