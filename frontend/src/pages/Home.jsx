import { useState } from "react";
import ModeSelector from "../components/ModeSelector";
import FileUpload from "../components/FileUpload";
import InsightsPanel from "../components/InsightsPanel";
import RawTextPanel from "../components/RawTextPanel";
import QAPanel from "../components/QAPanel";
import ExportReport from "../components/ExportReport";

export default function Home() {
  const [selectedMode, setSelectedMode] = useState(null);
  const [rawText, setRawText] = useState("");
  const [insights, setInsights] = useState([]);

  return (
    <div
      style={{
        padding: "32px",
        width: "100%",
        maxWidth: "900px",
        margin: "0 auto",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontWeight: "800", marginBottom: "32px", color: "white" }}>
        VisionInsight
      </h1>

      <ModeSelector
        selectedMode={selectedMode}
        setSelectedMode={setSelectedMode}
      />

      {selectedMode && (
        <>
          <FileUpload
            setRawText={setRawText}
            setInsights={setInsights}
            selectedMode={selectedMode}
          />

          {rawText && (
            <>
              <InsightsPanel insights={insights} />
              <RawTextPanel rawText={rawText} />
              <QAPanel rawText={rawText} />

              {/* Export button only visible when OCR is done */}
              <ExportReport rawText={rawText} insights={insights} />
            </>
          )}
        </>
      )}
    </div>
  );
}
