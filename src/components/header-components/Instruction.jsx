import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import infoIcon from "./../../assets/images/icon-info.svg";
import iconClose from "./../../assets/images/icon-close.svg";
import SVG from "react-inlinesvg"; // Import SVG component
import "./../../css/header/Instruction.css";

export default function Instruction() {
  const [showInstruction, setShowInstruction] = useState(false);
  const [overflow, setOverflow] = useState("auto");

  useEffect(() => {
    document.body.style.overflow = overflow;
  }, [overflow]);

  useEffect(() => {
    let handler = (e) => {
      if (!e.target.closest(".window")) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  const onClose = () => {
    setShowInstruction(false); // Fixed: change `showSettings` to `showInstruction`
    setOverflow("auto");
  };

  return (
    <>
      <button className="mobileInstructionBtn">
        <img
          className="iconHeader"
          src={infoIcon}
          alt="instruction icon"
          aria-label="Open the instruction menu"
          onClick={() => {
            setShowInstruction(true);
            setOverflow("hidden");
          }}
        />
      </button>
      <button
        className="desktopInstructionBtn"
        onClick={() => {
          setShowInstruction(true);
          setOverflow("hidden");
        }}
      >
        Instruction
        <img
          className="iconHeader"
          src={infoIcon}
          alt="instruction icon"
          aria-label="Open the instruction menu"
        />
      </button>
      {showInstruction && (
        <div className="backgroundBlur">
          <AnimatePresence>
            <motion.div
              key="modal"
              className="window windowHeader"
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 },
              }}
              initial="hidden"
              animate="visible"
            >
              <div className="instructionTitle">
                <h2>Instruction</h2>
                <SVG
                  className="iconCloseInstruction"
                  src={iconClose}
                  alt="Close icon"
                  aria-label="Close settings"
                  onClick={onClose}
                />
              </div>
              <ol>
                <li>
                  Set Your Task: Add your tasks in the "To-Do" section,
                  organizing them by categories or priority.
                </li>
                <li>
                  Start the Timer: Select your mode (Pomodoro, Short Break, or
                  Long Break) and hit the Start button to begin.
                </li>
                <li>
                  Focus and Rest: Stay focused during work sessions, followed by
                  timed breaks to recharge. After 4 Pomodoro sessions, take a
                  longer break!
                </li>
                <li>
                  Track Your Progress: Mark tasks as completed, edit details,
                  and manage priorities effortlessly.
                </li>
                <li>
                  Customize Your Experience: Sound Notifications: Stay on track
                  with alerts for session transitions. Themes for Every Mode:
                  Personalize your timer's look for work, short breaks, and long
                  breaks. Dark Mode: Switch themes to reduce eye strain in
                  low-light environments.
                </li>
              </ol>
              <p className="instructionText">
                Boost your productivity while maintaining balance and
                motivation!
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </>
  );
}
