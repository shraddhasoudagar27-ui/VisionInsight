import "./componentStyles.css";

export default function RawTextPanel({ rawText }) {
  if (!rawText) return null;

  return (
    <div className="rawtext-box">
      <h3 className="panel-title">Extracted Text</h3>
      <div className="rawtext-content">
        {rawText}
      </div>
    </div>
  );
}
