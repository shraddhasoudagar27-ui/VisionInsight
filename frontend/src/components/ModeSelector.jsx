import "./componentStyles.css";

const modes = [
  { type: "receipt", label: "Receipt", icon: "🧾" },
  { type: "lab", label: "Lab Report", icon: "🧪" },
  { type: "product", label: "Product", icon: "📦" },
  { type: "chart", label: "Chart/Data", icon: "📊" }
];

export default function ModeSelector({ selectedMode, setSelectedMode }) {
  return (
    <div className="selector-wrapper">
      {modes.map((m) => (
        <button
          key={m.type}
          className={`selector-card ${
            selectedMode === m.type ? "selected" : ""
          }`}
          onClick={() => setSelectedMode(m.type)}
        >
          <div className="selector-icon">{m.icon}</div>
          <div className="selector-label">{m.label}</div>
        </button>
      ))}
    </div>
  );
}
