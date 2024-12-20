import Toggle from "react-toggle";
import { useDarkThemeChange } from "../../contexts/DarkThemeContext.jsx";
import { useTimerChange } from "../../contexts/TimeContext.jsx";
import { useThemeChange } from "../../contexts/ThemeContext.jsx";

export default function SettingsTheme() {
  const { currentTimer } = useTimerChange();
  const { setColorPom, setColorShort, setColorLong, changeColor } =
    useThemeChange();
  const { isDark, isDarkWhilePlaying, setIsDarkWhilePlaying } =
    useDarkThemeChange();
  const colors = [
    "var(--red)",
    "var(--yellow)",
    "var(--blue)",
    "var(--purple)",
    "var(--pink)",
    "var(--green)",
    "var(--black)",
  ];

  const generateColorInputs = (name, onClick) => (
    <div className="colorSection">
      {colors.map((color) => (
        <input
          key={`${name}-${color}`}
          type="radio"
          name={name}
          className={`${color.replace("var(--", "").replace(")", "")} cube`}
          onClick={() => onClick(color)}
        />
      ))}
    </div>
  );

  const clickShort = (colorShort) => {
    setColorShort(colorShort);
    if (currentTimer === "shortBreak") {
      changeColor(colorShort);
    }
  };

  const clickPom = (colorPom) => {
    setColorPom(colorPom);
    if (currentTimer === "pomodoro") {
      changeColor(colorPom);
    }
  };

  const clickLong = (colorLong) => {
    setColorLong(colorLong);
    if (currentTimer === "longBreak") {
      changeColor(colorLong);
    }
  };

  return (
    <section className="settingThemeSection">
      <div>
        <h2 className="titleSection">THEME</h2>
        {isDark && (
          <div className="themeInfoMessage">
            <p>
              Switch to the light theme to unlock background changes and the
              dark theme button for Pomodoro and breaks.
            </p>
          </div>
        )}
      </div>
      {isDark === false && (
        <>
          <div className="modeSection">
            <h3 className="modeSubtitle">Dark Mode when running</h3>
            <Toggle
              checked={isDarkWhilePlaying}
              onChange={({ target }) => setIsDarkWhilePlaying(target.checked)}
              icons={{ checked: "", unchecked: "" }}
              aria-label="Dark mode toggle, when playing"
            />
          </div>
          <div className="bckgrSection">
            <h3 className="bckgrSubtitle">Background Customization</h3>
            <h4 className="colorSubtitle">Pick a color for Pomodoro:</h4>
            {generateColorInputs("pomodoro", clickPom)}

            <h4 className="colorSubtitle">Pick a color for Short Break:</h4>
            {generateColorInputs("shortbreak", clickShort)}

            <h4 className="colorSubtitle">Pick a color for Long Break:</h4>
            {generateColorInputs("longbreak", clickLong)}
          </div>
        </>
      )}
    </section>
  );
}
