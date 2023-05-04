// API Routes let you create an API endpoint inside a Next.js app. 
// You can do so by creating a function inside the pages/api directory that has the following format:
// req = HTTP incoming message, res = HTTP server response

export default function handler(req, res) {
    res.status(200).json({ text: 'Hello' });
  }

  // access it at locahost:3000/api/hello. should see {"text":"Hello"}