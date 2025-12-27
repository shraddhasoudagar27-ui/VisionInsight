import { useState } from "react";
import axios from "axios";
import "./componentStyles.css";

export default function QAPanel({ rawText }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const askQuestion = async () => {
    if (!question.trim()) return;

    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/query", {
        question,
        text: rawText
      });

      setAnswer(res.data.answer || "No answer found.");
    } catch (err) {
      console.error(err);
      setAnswer("Error: Unable to get answer. Check backend server.");
    }

    setLoading(false);
  };

  return (
    <div className="qa-box">
      <div className="qa-input-row">
        <input
          className="qa-input"
          placeholder="Ask anything about document..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button
          className="qa-send-btn"
          onClick={askQuestion}
          disabled={!question || loading}
        >
          {loading ? "..." : "→"}
        </button>
      </div>

      {answer && (
        <div className="qa-answer">
          {answer}
        </div>
      )}
    </div>
  );
}
