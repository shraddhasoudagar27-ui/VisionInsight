import express from "express";
import multer from "multer";
import cors from "cors";
import fs from "fs";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: "uploads/" });

app.post("/api/ocr", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const filePath = req.file.path;
    const imageBase64 = fs.readFileSync(filePath, { encoding: "base64" });

    const apiURL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

    const response = await axios.post(apiURL, {
      contents: [
        {
          parts: [
            { text: "Extract all printed text from this receipt clearly and line by line." },
            {
              inlineData: {
                data: imageBase64,
                mimeType: req.file.mimetype
              }
            }
          ]
        }
      ]
    });

    const extractedText =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "⚠ OCR returned no text";

    fs.unlinkSync(filePath);
    res.json({ rawText: extractedText });

  } catch (error) {
    console.error("OCR Error:", error.response?.data || error.message);
    res.status(500).json({ error: "OCR failed", details: error.message });
  }
});

// 📌 NEW ROUTE for LLM Q&A on extracted text
app.post("/api/query", async (req, res) => {
  try {
    const { question, text } = req.body;

    const apiURL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

    const response = await axios.post(apiURL, {
      contents: [
        {
          parts: [
            {
              text: `Receipt Text:\n${text}\n\nUser Question: ${question}\nAnswer only using the receipt details.`
            }
          ]
        }
      ]
    });

    const answer =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Couldn't find an answer.";

    res.json({ answer });
  } catch (error) {
    console.error("LLM Query Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Query failed" });
  }
});


app.listen(5000, () =>
  console.log("🚀 Backend running on http://localhost:5000")
);
