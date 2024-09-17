import { useEffect, useState } from "react";
import Toggle from "react-toggle";
import { useLocalStorage } from "../../contexts/useLocalStorage.jsx";
import { useTimerChange } from "../../contexts/TimeContext.jsx";
import { useThemeChange } from "../../contexts/ThemeContext.jsx";
import "./../../css/Toggle.css";

export default function SettingsTheme() {
  const { currentTimer } = useTimerChange();
  const { setColorPom, setColorShort, setColorLong, changeColor } =
    useThemeChange();
  const [isDark, setIsDark] = useLocalStorage("isDark", false);

  useEffect(() => {
    if (isDark === true) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDark]);

  function clickShort(colorShort) {
    setColorShort(colorShort);
    if (currentTimer === "shortBreak") {
      changeColor(colorShort);
    }
  }

  function clickPom(colorPom) {
    setColorPom(colorPom);
    if (currentTimer === "pomodoro") {
      changeColor(colorPom);
    }
  }

  function clickLong(colorLong) {
    setColorLong(colorLong);
    if (currentTimer === "longBreak") {
      changeColor(colorLong);
    }
  }

  return (
    <section className="settingTheme__section">
      <div>
        <h2 className="titleSection">THEME</h2>
      </div>
      <div className="mode__section">
        <h3>Dark Mode</h3>
        <Toggle
          checked={isDark}
          onChange={({ target }) => setIsDark(target.checked)}
          icons={{ checked: "🌙", unchecked: "🔆" }}
          aria-label="Dark mode toggle"
        />
      </div>
      {isDark === false && (
        <>
          <h3>Pick a color for Pomodoro:</h3>
          <div className="color__section">
            <input
              type="radio"
              name="pomodoro"
              className="red cube"
              onClick={() => clickPom("var(--red)")}
            />
            <input
              type="radio"
              name="pomodoro"
              className="yellow cube"
              onClick={() => clickPom("var(--yellow)")}
            />
            <input
              type="radio"
              name="pomodoro"
              className="blue cube"
              onClick={() => clickPom("var(--blue)")}
            />
            <input
              type="radio"
              name="pomodoro"
              className="purple cube"
              onClick={() => clickPom("var(--purple")}
            />
            <input
              type="radio"
              name="pomodoro"
              className="pink cube"
              onClick={() => clickPom("var(--pink)")}
            />
            <input
              type="radio"
              name="pomodoro"
              className="green cube"
              onClick={() => clickPom("var(--green)")}
            />
            <input
              type="radio"
              name="pomodoro"
              className="black cube"
              onClick={() => clickPom("var(--black)")}
            />
          </div>
          <h3>Pick a color for Short Break:</h3>
          <div className="color__section">
            <input
              type="radio"
              name="shortbreak"
              className="red cube"
              onClick={() => clickShort("var(--red)")}
            />
            <input
              type="radio"
              name="shortbreak"
              className="yellow cube"
              onClick={() => clickShort("var(--yellow)")}
            />
            <input
              type="radio"
              name="shortbreak"
              className="blue cube"
              onClick={() => clickShort("var(--blue)")}
            />
            <input
              type="radio"
              name="shortbreak"
              className="purple cube"
              onClick={() => clickShort("var(--purple")}
            />
            <input
              type="radio"
              name="shortbreak"
              className="pink cube"
              onClick={() => clickShort("var(--pink)")}
            />
            <input
              type="radio"
              name="shortbreak"
              className="green cube"
              onClick={() => clickShort("var(--green)")}
            />
            <input
              type="radio"
              name="shortbreak"
              className="black cube"
              onClick={() => clickShort("var(--black)")}
            />
          </div>
          <h3>Pick a color for Long Break:</h3>
          <div className="color__section">
            <input
              type="radio"
              name="longbreak"
              className="red cube"
              onClick={() => clickLong("var(--red)")}
            />
            <input
              type="radio"
              name="longbreak"
              className="yellow cube"
              onClick={() => clickLong("var(--yellow)")}
            />
            <input
              type="radio"
              name="longbreak"
              className="blue cube"
              onClick={() => clickLong("var(--blue)")}
            />
            <input
              type="radio"
              name="longbreak"
              className="purple cube"
              onClick={() => clickLong("var(--purple")}
            />
            <input
              type="radio"
              name="longbreak"
              className="pink cube"
              onClick={() => clickLong("var(--pink)")}
            />
            <input
              type="radio"
              name="longbreak"
              className="green cube"
              onClick={() => clickLong("var(--green)")}
            />
            <input
              type="radio"
              name="longbreak"
              className="black cube"
              onClick={() => clickLong("var(--black)")}
            />
          </div>
        </>
      )}
    </section>
  );
}
