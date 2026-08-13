const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

const t = `  // API to send notification`;

const r = `  // API to fetch Suno MP3 URLs
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
          const regex = /https:\\/\\/cdn1\\.suno\\.ai\\/([a-zA-Z0-9-]*)\\.mp3/g;
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

  // API to send notification`;

if (code.includes(t) && !code.includes('/api/suno')) {
    code = code.replace(t, r);
    fs.writeFileSync('server.ts', code);
    console.log("Added /api/suno to server.ts");
}
