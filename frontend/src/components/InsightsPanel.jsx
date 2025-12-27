import "./componentStyles.css";

export default function InsightsPanel({ insights }) {
  if (!insights || insights.length === 0) return null;

  return (
    <div className="insights-box">
      <h3 className="panel-title">Insights</h3>
      <ul className="insights-list">
        {insights.map((item, index) => (
          <li key={index} className="insight-item">
            <span className={item.ok ? "insight-ok" : "insight-warn"}>
              {item.ok ? "✓" : "⚠"}
            </span>
            <span>{item.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
