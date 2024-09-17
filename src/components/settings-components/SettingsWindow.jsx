import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SettingsHeader from "./SettingsHeader.jsx";
import SettingsInfo from "./SettingsInfo.jsx";
import SettingsTheme from "./SettingsTheme.jsx";
import SettingsTimer from "./SettingsTimer.jsx";
import "./../../css/SettingsWindow.css";

export default function SettingsWindow({ onClose }) {
  let menuRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        onCloseOutside();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  function onCloseOutside() {
    let result = confirm("Are you sure you want to close?");
    if (result === true) {
      onClose();
    }
  }

  return (
    <div className="backgroundBlur">
      <AnimatePresence>
        <motion.div
          key="modal"
          className="settingsWindow"
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate="visible"
          ref={menuRef}
        >
          <SettingsHeader onClose={onClose} />
          <hr />
          <SettingsInfo />
          <hr />
          <SettingsTimer />
          <hr />
          <SettingsTheme />
          <hr />
          <section className="applyButton__container">
            <button className="applyButton" onClick={onClose}>
              OK
            </button>
          </section>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
