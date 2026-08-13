const fs = require('fs');
let code = fs.readFileSync('src/app.js', 'utf8');

const t = `      // Native Audio Player Logic (Suno MP3s)
      if (window.isNativeAudio && window.ambientMusicPlaylist && window.ambientMusicPlaylist.length > 0) {`;

const r = `      // Native Audio Player Logic (Suno MP3s)
      if (window.isNativeAudio) {
          if (!window.ambientMusicPlaylist || window.ambientMusicPlaylist.length === 0) {
              showToast("Aguarde, carregando a playlist...");
              return;
          }`;

if (code.includes(t)) {
    code = code.replace(t, r);
    fs.writeFileSync('src/app.js', code);
    console.log("Fixed loading toast");
}
