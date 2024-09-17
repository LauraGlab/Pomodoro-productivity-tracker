import { useState, useEffect } from "react";
import SettingsWindow from "./settings-components/SettingsWindow.jsx";
import settingLogo from "./../assets/images/icon-settings.svg";

export default function Settings() {
  const [showSettings, setShowSettings] = useState(false);
  const [overflow, setOverflow] = useState("auto");

  useEffect(() => {
    document.body.style.overflow = overflow;
  }, [overflow]);

  return (
    <>
      <img
        src={settingLogo}
        alt="settings icon"
        aria-label="Open the settings menu"
        className="settingLogo"
        onClick={() => {
          setShowSettings(true);
          setOverflow("hidden");
        }}
      />
      {showSettings === true && (
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
