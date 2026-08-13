const fs = require('fs');
let code = fs.readFileSync('src/app.js', 'utf8');

const t = `              window.ambientAudio.play().then(() => {
                  showToast("Música em reprodução: Suno Playlist.");
                  updateMusicUI(true);
              }).catch(err => {
                  console.warn("Failed to init bg audio", err);
                  showToast("Erro ao reproduzir. Clique novamente.");
                  updateMusicUI(false);
              });`;

const r = `              window.ambientAudio.play().then(() => {
                  showToast("Música em reprodução: Playlist.");
                  updateMusicUI(true);
              }).catch(err => {
                  console.warn("Autoplay blocked or failed", err);
                  if (err.name !== 'NotAllowedError') {
                      showToast("Erro ao reproduzir. Clique no Play.");
                  }
                  updateMusicUI(false);
              });`;

if (code.includes(t)) {
    code = code.replace(t, r);
    fs.writeFileSync('src/app.js', code);
    console.log("Fixed toast");
} else {
    console.log("Not found t");
}
