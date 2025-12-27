import { useState } from "react";
import "./componentStyles.css";

export default function FileUpload({ setRawText, setInsights }) {
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    setFile(selectedFile);
    setFileName(selectedFile.name);
  };

  // 🧹 Clean basic OCR formatting & remove prompt leak
  const cleanText = (text) => {
    return text
      .replace(/Here is.+?:/i, "") // remove system/prompt insertions
      .replace(/[«»©®•·]/g, "")
      .replace(/\r/g, "")
      .replace(/\s{2,}/g, " ")
      .replace(/\n\s*\n/g, "\n")
      .trim();
  };

  // ❌ Remove known garbage
  const removeNoise = (text) => {
    return text
      .replace(/mismenmin|cccasm+s+aes/gi, "")
      .trim();
  };

  // 🧠 Improved insight extraction
  const extractInsights = (text) => {
    const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);

    // 🎯 Better vendor detection: first business-like line with NO digits
    const vendor =
      lines.find(
        (l) =>
          /^[A-Za-z][A-Za-z .,&'-]{3,}$/.test(l) &&
          !/\d/.test(l) &&
          !l.toLowerCase().includes("receipt")
      ) || "Unknown";

    const currencyRegex = /(₹|\$|€|£)\s*(\d+\.\d{2})/;

    let totalMatch =
      text.match(/total[\s:]*₹?\$?€?£?\s*(\d+\.\d{2})/i) ||
      text.match(/amount[\s:]*₹?\$?€?£?\s*(\d+\.\d{2})/i);

    // Fallback: highest number
    if (!totalMatch) {
      const prices = [...text.matchAll(currencyRegex)];
      if (prices.length > 0) {
        const highest = Math.max(...prices.map((p) => parseFloat(p[2])))
          .toFixed(2);
        const symbol = text.match(/₹|€|£|\$/)?.[0] || "$";
        totalMatch = [null, highest, symbol];
      }
    }

    const symbol = totalMatch?.[3] || text.match(/₹|€|£|\$/)?.[0] || "$";
    const total = totalMatch?.[1] || "Not found";

    const dateMatch = text.match(/\b\d{1,2}[\/-]\d{1,2}[\/-]\d{4}\b/);

    return [
      { ok: vendor !== "Unknown", text: `Vendor: ${vendor}` },
      { ok: total !== "Not found", text: `Total: ${symbol}${total}` },
      { ok: !!dateMatch, text: `Date: ${dateMatch?.[0] || "Not found"}` },
    ];
  };

  const handleProcess = async () => {
    if (!file) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:5000/api/ocr", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      let text = data.rawText || "";

      text = cleanText(text);
      text = removeNoise(text);

      setRawText(text);
      setInsights(extractInsights(text));
    } catch (err) {
      console.error(err);
      alert("OCR failed ❌");
    }

    setLoading(false);
  };

  return (
    <div className="upload-box">
      <label className="upload-label" style={{ color: "white" }}>
        {fileName || "Drag & drop or click to choose a file"}
        <input type="file" onChange={handleFileChange} hidden />
      </label>

      <button
        className="primary-btn"
        onClick={handleProcess}
        disabled={!fileName || loading}
      >
        {loading ? "Processing..." : "PROCESS"}
      </button>
    </div>
  );
}
