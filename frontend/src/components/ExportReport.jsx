// src/components/ExportReport.jsx
import jsPDF from "jspdf";
import "jspdf-autotable";
import "./componentStyles.css";

export default function ExportReport({ rawText, insights }) {
  const generatePDF = () => {
    const doc = new jsPDF({ unit: "pt" });
    const margin = 40;
    let y = margin;

    // Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("VisionInsight - Receipt Report", margin, y);
    y += 30;

    // Insights Section
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("INSIGHTS", margin, y);
    y += 18;

    doc.setFont("helvetica", "normal");
    insights.forEach((item) => {
      const insightLine = `• ${item.text}`;
      const lines = doc.splitTextToSize(insightLine, 520);

      if (y + 20 > doc.internal.pageSize.height - margin) {
        doc.addPage();
        y = margin;
      }

      doc.text(lines, margin, y);
      y += lines.length * 16;
    });

    // Extracted Text Title
    y += 20;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("EXTRACTED TEXT", margin, y);
    y += 16;

    // Dynamic pagination for long text
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    const textLines = doc.splitTextToSize(rawText, 520);

    textLines.forEach((line) => {
      if (y + 16 > doc.internal.pageSize.height - margin) {
        doc.addPage();
        y = margin;
      }
      doc.text(line, margin, y);
      y += 14;
    });

    // Save final PDF
    doc.save("Receipt_Report.pdf");
  };

  return (
    <button className="primary-btn" onClick={generatePDF}>
      Export Report
    </button>
  );
}
