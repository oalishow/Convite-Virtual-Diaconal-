const https = require('https');

https.get('https://suno.com/playlist/7d874679-1ce4-4373-8190-88ea69742e11', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        const regex = /https:\/\/cdn1\.suno\.ai\/([a-zA-Z0-9-]*)\.mp3/g;
        const matches = [...data.matchAll(regex)].map(m => m[0]);
        const unique = [...new Set(matches)];
        console.log(unique);
    });
});
