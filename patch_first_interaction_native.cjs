const fs = require('fs');
let code = fs.readFileSync('src/app.js', 'utf8');

const t = `      const ytIframe = document.getElementById('ytIframe');
      if (ytIframe) {
        // If it's a YouTube iframe, or any iframe with autoplay, reloading it after interaction allows it to play
        if (ytIframe.src && ytIframe.src.includes('autoplay=1')) { 
           ytIframe.src = ytIframe.src;
        }
      }`;

const r = `      const ytIframe = document.getElementById('ytIframe');
      if (ytIframe) {
        // If it's a YouTube iframe, or any iframe with autoplay, reloading it after interaction allows it to play
        if (ytIframe.src && ytIframe.src.includes('autoplay=1')) { 
           ytIframe.src = ytIframe.src;
        }
      }
      
      // Also start native audio if applicable
      if (window.isNativeAudio && window.toggleSacredMusic && !window.ambientAudio) {
          window.toggleSacredMusic(); // Starts playback natively
      }`;

if (code.includes(t)) {
    code = code.replace(t, r);
    fs.writeFileSync('src/app.js', code);
    console.log("Patched enableAudio for native player");
} else {
    console.log("Not found enableAudio");
}
