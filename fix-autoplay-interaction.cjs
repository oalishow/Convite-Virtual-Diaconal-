const fs = require('fs');
let appCode = fs.readFileSync('src/app.js', 'utf8');

const interactionCode = `
    // Enable autoplay on first interaction to bypass browser policies
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
    ['click', 'scroll', 'touchstart'].forEach(e => document.addEventListener(e, enableAudio, { passive: true }));
`;

// Insert it at the end of the DOMContentLoaded block, or just at the end of the script
appCode += '\n' + interactionCode;

fs.writeFileSync('src/app.js', appCode);

console.log("Patched autoplay interaction");
