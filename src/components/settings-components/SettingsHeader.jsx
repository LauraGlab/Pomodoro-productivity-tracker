import iconClose from "./../../assets/images/icon-close.svg";

export default function SettingHeader({ onClose }){
  return (
    <section className="settingsHeader__section">
      <h1 className="settingsHeader__title">SETTINGS</h1>
      <img
        src={iconClose}
        alt="Close icon"
        aria-label="Close settings"
        className="iconClose dark"
        onClick={onClose}
      />
    </section>
  );
}
