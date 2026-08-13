const fs = require('fs');
let code = fs.readFileSync('src/app.js', 'utf8');

const t = `          } else {
              if (window.ambientAudio.paused) {
                  window.ambientAudio.play();
                  showToast("Música retomada.");
                  updateMusicUI(true);
              } else {
                  window.ambientAudio.pause();
                  showToast("Música pausada.");
                  updateMusicUI(false);
              }
          }`;

const r = `          } else {
              if (window.ambientAudio.paused) {
                  window.ambientAudio.play().then(() => {
                      showToast("Música retomada.");
                      updateMusicUI(true);
                  }).catch(err => {
                      showToast("Erro ao reproduzir.");
                      updateMusicUI(false);
                  });
              } else {
                  window.ambientAudio.pause();
                  showToast("Música pausada.");
                  updateMusicUI(false);
              }
          }`;

if (code.includes(t)) {
    code = code.replace(t, r);
    fs.writeFileSync('src/app.js', code);
    console.log("Patched play catch");
} else {
    console.log("Not found play catch target");
}
