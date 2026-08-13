const fs = require('fs');
let code = fs.readFileSync('src/app.js', 'utf8');

const target = `         // Fix for Suno URLs specifically
         if (rawUrl.includes('suno.com/song/')) {
             rawUrl = rawUrl.replace('suno.com/song/', 'suno.com/embed/');
         } else if (rawUrl.includes('spotify.com/')) {`;

const replacement = `         // Fix for Suno URLs specifically
         if (rawUrl.includes('suno.com/song/')) {
             rawUrl = rawUrl.replace('suno.com/song/', 'suno.com/embed/');
         } else if (rawUrl.includes('spotify.com/')) {`;

// We will change the URL parsing but wait!
// If it's a Suno URL, we want to NOT use the iframe! We want to use our custom audio player!
