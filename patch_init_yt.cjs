const fs = require('fs');
let code = fs.readFileSync('src/app.js', 'utf8');

const t = `    window.initYTPlayer = function initYTPlayer() {
      if (window.ytPlayer) return;
      if (window.isYoutubeMusic === undefined) return; // Wait for Firebase data
      if (window.isYoutubeMusic === false) return; // Prevent YouTube API from attaching to non-YT iframes
      if (typeof YT !== 'undefined' && YT.Player) {
        try {
          window.ytPlayer = new YT.Player('ytIframe', {`;

const r = `    window.initYTPlayer = function initYTPlayer() {
      if (window.isYoutubeMusic === undefined) return; // Wait for Firebase data
      if (window.isYoutubeMusic === false) return; // Prevent YouTube API from attaching to non-YT iframes
      if (typeof YT !== 'undefined' && YT.Player) {
        if (window.ytPlayer) {
           try { window.ytPlayer.destroy(); } catch(e) {}
           window.ytPlayer = null;
        }
        try {
          window.ytPlayer = new YT.Player('ytIframe', {`;

if (code.includes(t)) {
    code = code.replace(t, r);
    fs.writeFileSync('src/app.js', code);
    console.log("Patched initYTPlayer");
} else {
    console.log("Could not find initYTPlayer block");
}
