import express from "express";
import path from "path";
import webpush from "web-push";
import { createServer as createViteServer } from "vite";

const VAPID_PUBLIC = "BDDEz0U7VGipoblJcMfL96aQRHN3dySBHOx2gwYtzSxshGTDaLfuOy4jV8ykBufhr_d9FHNZUqvDSke5Fy0tycI";
const VAPID_PRIVATE = "MVjpf-gV6sJ2Nac-ZIavsJaXYtvVaG-cr2VQ1z2Z0eI";
const EMAIL = "mailto:admblackjamf@gmail.com";

webpush.setVapidDetails(EMAIL, VAPID_PUBLIC, VAPID_PRIVATE);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());



  // API for VAPID public key
  app.get("/api/vapid-key", (req, res) => {
    res.json({ publicKey: VAPID_PUBLIC });
  });

  // API to fetch Suno MP3 URLs
  app.get("/api/suno", async (req, res) => {
    try {
      const url = req.query.url;
      if (!url || typeof url !== 'string' || !url.includes('suno.com')) {
        return res.status(400).json({ error: "Invalid Suno URL" });
      }
      
      const https = await import('https');
      https.get(url, (response) => {
        let data = '';
        response.on('data', chunk => data += chunk);
        response.on('end', () => {
          const regex = /https:\/\/cdn1\.suno\.ai\/([a-zA-Z0-9-]*)\.mp3/g;
          const matches = [...data.matchAll(regex)].map(m => m[0]);
          const unique = [...new Set(matches)].filter(url => !url.includes('sil-100.mp3'));
          res.json({ urls: unique });
        });
      }).on('error', (err) => {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch Suno page" });
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Server error" });
    }
  });

  // API to send notification
  app.post("/api/send-notification", async (req, res) => {
    try {
      const { subscriptions, payload } = req.body;
      if (!subscriptions || !Array.isArray(subscriptions)) {
        return res.status(400).json({ error: "Invalid subscriptions array" });
      }

      const results = await Promise.all(
        subscriptions.map(sub => 
          webpush.sendNotification(sub, JSON.stringify(payload)).catch(err => {
            console.error("Failed to send notification to sub", err);
            return { error: err };
          })
        )
      );

      res.json({ success: true, results });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Failed to send notifications" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
