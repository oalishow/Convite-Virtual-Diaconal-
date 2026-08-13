const fs = require('fs');
let code = fs.readFileSync('src/app.js', 'utf8');

// We want to make sure ytEmbedBox is visible on load.
const interactionCode = `
    // Show the player box by default so user knows it exists
    setTimeout(() => {
      const box = document.getElementById('ytEmbedBox');
      if (box) box.classList.add('visible');
    }, 1500);

    // Try to send play command to youtube iframe on first interaction
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
    ['click', 'scroll', 'touchstart'].forEach(e => document.addEventListener(e, enableAudio, { passive: true }));
`;

// Remove the old interaction code
code = code.replace(/\/\/ Enable autoplay on first interaction[\s\S]*\}\);/m, '');
code += '\n' + interactionCode;

fs.writeFileSync('src/app.js', code);
console.log("Patched visible player");
