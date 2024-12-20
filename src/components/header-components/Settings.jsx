import { useState, useEffect } from "react";
import SettingsWindow from "../settings-components/SettingsWindow.jsx";
import iconSettings from "./../../assets/images/icon-settings.svg";
import "./../../css/header/Settings.css";

export default function Settings() {
  const [showSettings, setShowSettings] = useState(false);
  const [overflow, setOverflow] = useState("auto");

  useEffect(() => {
    document.body.style.overflow = overflow;
  }, [overflow]);

  return (
    <>
      <button className="mobileSettingsBtn">
        <img
          className="iconHeader"
          src={iconSettings}
          alt="settings icon"
          aria-label="Open the settings menu"
          onClick={() => {
            setShowSettings(true);
            setOverflow("hidden");
          }}
        />
      </button>
      <button
        className="desktopSettingsBtn"
        onClick={() => {
          setShowSettings(true);
          setOverflow("hidden");
        }}
      >
        Settings
        <img
          className="iconHeader"
          src={iconSettings}
          alt="settings icon"
          aria-label="Open the settings menu"
        />
      </button>
      {showSettings && (
        <SettingsWindow
          onClose={() => {
            setShowSettings(false);
            setOverflow("auto");
          }}
        />
      )}
    </>
  );
}
