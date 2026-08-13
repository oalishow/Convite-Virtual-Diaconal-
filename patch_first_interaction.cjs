const fs = require('fs');
let code = fs.readFileSync('src/app.js', 'utf8');

const t = `    // Try to send play command to youtube iframe on first interaction
    let firstInteraction = false;
    const enableAudio = () => {
      if (firstInteraction) return;
      firstInteraction = true;
      const ytIframe = document.getElementById('ytIframe');
      if (ytIframe && ytIframe.src && ytIframe.src.includes('youtube')) {
        ytIframe.contentWindow.postMessage(JSON.stringify({event: "command", func: "playVideo", args: ""}), '*');
      }
      ['click', 'scroll', 'touchstart'].forEach(e => document.removeEventListener(e, enableAudio));
    };
    ['click', 'scroll', 'touchstart'].forEach(e => document.addEventListener(e, enableAudio, { passive: true }));`;

const r = `    // Enable autoplay on first interaction to bypass browser policies
    let firstInteraction = false;
    const enableAudio = () => {
      if (firstInteraction) return;
      firstInteraction = true;
      
      const box = document.getElementById('ytEmbedBox');
      if (box && !box.classList.contains('visible')) {
        box.classList.add('visible');
      }
      
      const ytIframe = document.getElementById('ytIframe');
      if (ytIframe) {
        // If it's a YouTube iframe, or any iframe with autoplay, reloading it after interaction allows it to play
        if (ytIframe.src && ytIframe.src.includes('autoplay=1')) { 
           ytIframe.src = ytIframe.src;
        }
      }
      
      ['click', 'scroll', 'touchstart'].forEach(e => document.removeEventListener(e, enableAudio));
    };
    ['click', 'scroll', 'touchstart'].forEach(e => document.addEventListener(e, enableAudio, { passive: true }));`;

if (code.includes(t)) {
    code = code.replace(t, r);
    fs.writeFileSync('src/app.js', code);
    console.log("Patched first interaction logic");
} else {
    console.log("Target string not found!");
}
