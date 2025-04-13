/**
 * Title: OCR to JSON Converter
 * Description: Optical Character Recognition (OCR) to JSON converter using Tesseract.js
 * Author: Md Abdullah
 * Date: 13th April 2025
 */

import bodyParser from "body-parser";
import express from "express";
import Tesseract from "tesseract.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json({ limit: "10mb" }));

app.post("/extract-json", async (req, res) => {
  const { imageBase64 } = req.body;

  if (!imageBase64) {
    return res.status(400).json({
      success: false,
      message: "imageBase64 is required",
    });
  }

  try {
    const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");

    const {
      data: { text },
    } = await Tesseract.recognize(buffer, "eng");

    let cleanedText = text
      .replace(/[“”]/g, '"')
      .replace(/[‘’]/g, "'")
      .replace(/(\w+)”:/g, '"$1":')
      .replace(/:(\s*“[^”]+”)/g, (m, p1) => ": " + p1.replace(/[“”]/g, '"'))
      .replace(/\s{2,}/g, " ")
      .replace(/(\s+):/g, ":")
      .replace(/[\r\n]+/g, " ");

    res.json({
      success: true,
      data: parseKeyValuePairs(cleanedText),
      message: "Successfully extracted JSON from image",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to extract JSON from image",
      error: err.message,
    });
  }
});

const parseKeyValuePairs = (cleanedText) => {
  const formattedText = cleanedText.replace(/[“”¥lq]/g, "").trim();
  const fixedText = formattedText.replace(/"address:\s/g, '"address": ');
  const regex = /"([^"]+)":\s?"([^"]+)"/g;

  const result = {};
  let match;
  while ((match = regex.exec(fixedText)) !== null) {
    const key = match[1];
    const value = match[2];
    result[key] = value;
  }

  return result;
};

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
