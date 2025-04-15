# 🧠 OCR JSON Extractor API

This project is an Express.js-based API that uses `tesseract.js` to extract key-value pairs from base64-encoded images containing text formatted like JSON. It cleans common OCR errors and returns the extracted data as a structured JSON object.

## 📦 Features

- Accepts a base64 image input.
- Uses `tesseract.js` to extract text from the image.
- Cleans OCR-related text issues (like fancy quotes, spacing, and line breaks).
- Parses key-value pairs and returns them as a valid JSON object.

## 🚀 Getting Started

### Prerequisites

- Node.js v16+
- npm or yarn

### Installation

```bash
git clone https://github.com/Md-Abdullah-321/JSON-Extraction-API
cd JSON-Extraction-API
npm install
```

### Run the Server

```bash
node index.js
```

Server will start on `http://localhost:3000`

## 🛠 API Usage

### Endpoint

```
POST /extract-json
```

### Request Body

```json
{
  "imageBase64": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
}
```

> You can send the raw base64 string or the one prefixed with `data:image/png;base64,`.

### Response

```json
{
  "success": true,
  "data": {
    "name": "Keith Rippin",
    "organization": "VonRueden - Anderson",
    "address": "183 Schamberger Cape, Port Jarenton",
    "mobile": "487-446-4141 x39996"
  },
  "message": "Successfully extracted JSON from image"
}
```

### Error Response

```json
{
  "success": false,
  "message": "Failed to extract JSON from image",
  "error": "Error message"
}
```

## 📚 Tech Stack

- Express.js
- body-parser
- tesseract.js

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

---

**Made with ❤️ by Md Abdullah**
