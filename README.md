# VisionInsight
AI-powered Receipt Understanding, OCR + Insights + PDF Export + Q&A

VisionInsight intelligently extracts useful information from printed receipts.  
Just upload a receipt image, and you instantly get:  
Clean OCR text  
Vendor, Total, Date insights  
Ask-anything Q&A using LLM  
One-click PDF report generation  

---

## Features

| Feature | Description |
|--------|-------------|
| OCR (Gemini Vision) | Extracts text from receipt images |
| Smart Insights | Auto-detects vendor, total amount & date |
| Q&A Chat | Ask questions & get accurate answers from extracted text |
| PDF Export | Download structured receipt report |
| Frontend UI (React) | Simple + clean dark theme |
| Backend (Node.js + Express) | Secure API for OCR + LLM |

---

## Tech Stack

| Layer | Technologies |
|------|--------------|
| Frontend | React, Vite, CSS |
| Backend | Node.js, Express |
| AI/OCR | Google Gemini API (Vision + Text) |
| PDF Export | jsPDF |
| Deployment | Coming soon |

---

## Setup & Run Locally

```bash
# Clone the repo
git clone https://github.com/shraddhasoudagar27-ui/VisionInsight.git
cd VisionInsight

# Install backend dependencies
cd backend
npm install

# Create .env file in backend folder
echo GEMINI_API_KEY=your_key_here > ./.env

# Start backend server
npm start
bash
Copy code
# Open a new terminal for frontend
cd frontend
npm install
npm run dev
```

### Current Features
Receipt OCR extraction  
Vendor / Total / Date insights  
LLM-based Q&A over extracted text  
PDF Export  

### Work in Progress
Receipt mode is complete.  
Lab Report, Product, Chart/Data will be expanded with structured extraction in upcoming updates.


### Learnings
Working with Gemini Vision models
Handling noisy OCR and text cleanup
RAG-style contextual question answering
Exporting formatted PDF reports

### Contributing
Pull requests are welcome.
Create an issue first to discuss changes.

