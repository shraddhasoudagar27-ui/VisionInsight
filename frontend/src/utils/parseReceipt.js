export function parseReceipt(rawText) {
    const lines = rawText.split("\n");
  
    let vendor = lines[0] || "Unknown Vendor";
    let date = rawText.match(/\b\d{1,2}\/\d{1,2}\/\d{2,4}\b/)?.[0] || "Not Found";
    let total = rawText.match(/(?:Total|Subtotal|Amount)[:\s]*\$?(\d+\.\d{2})/)?.[1] || "Not Found";
  
    const insights = [
      { ok: vendor !== "Unknown Vendor", text: `Vendor: ${vendor}` },
      { ok: date !== "Not Found", text: `Date: ${date}` },
      { ok: total !== "Not Found", text: `Total: $${total}` },
    ];
  
    return { vendor, date, total, insights };
  }
  