const fs = require('fs');
let code = fs.readFileSync('src/app.js', 'utf8');

const t1 = `      // Se for Suno ou outro iframe não-YouTube, não temos controle de Play/Pause. Apenas mostramos a caixa.
      if (window.isYoutubeMusic === false) {`;
const r1 = `      if (window.isSunoMusic && window.sunoAudio) {
        if (!window.sunoAudio.paused) {
            window.sunoAudio.pause();
            showToast("Música pausada.");
            updateMusicUI(false);
        } else {
            window.sunoAudio.play().then(() => {
                showToast("Música em reprodução: Suno Playlist.");
                updateMusicUI(true);
            }).catch(e => {
                showToast("Erro ao reproduzir. Clique novamente.");
            });
        }
        return;
      }

      // Se for outro iframe não-YouTube, não temos controle de Play/Pause. Apenas mostramos a caixa.
      if (window.isYoutubeMusic === false) {`;

const t2 = `    window.nextSacredMusic = function nextSacredMusic() {
      if (window.ytPlayer && typeof window.ytPlayer.nextVideo === 'function') {`;
const r2 = `    window.nextSacredMusic = function nextSacredMusic() {
      if (window.isSunoMusic && window.sunoUrls && window.sunoAudio) {
          window.sunoCurrentIndex = (window.sunoCurrentIndex + 1) % window.sunoUrls.length;
          window.sunoAudio.src = window.sunoUrls[window.sunoCurrentIndex];
          window.sunoAudio.play().then(() => {
              showToast("Próxima música da playlist Suno.");
              updateMusicUI(true);
          }).catch(() => updateMusicUI(false));
          return;
      }
      
      if (window.ytPlayer && typeof window.ytPlayer.nextVideo === 'function') {`;

const t3 = `    window.prevSacredMusic = function prevSacredMusic() {
      if (window.ytPlayer && typeof window.ytPlayer.previousVideo === 'function') {`;
const r3 = `    window.prevSacredMusic = function prevSacredMusic() {
      if (window.isSunoMusic && window.sunoUrls && window.sunoAudio) {
          window.sunoCurrentIndex = window.sunoCurrentIndex - 1;
          if (window.sunoCurrentIndex < 0) window.sunoCurrentIndex = window.sunoUrls.length - 1;
          window.sunoAudio.src = window.sunoUrls[window.sunoCurrentIndex];
          window.sunoAudio.play().then(() => {
              showToast("Música anterior da playlist Suno.");
              updateMusicUI(true);
          }).catch(() => updateMusicUI(false));
          return;
      }

      if (window.ytPlayer && typeof window.ytPlayer.previousVideo === 'function') {`;

if (code.includes('if (window.isSunoMusic && window.sunoAudio) {')) {
    console.log("Already patched.");
} else {
    code = code.replace(t1, r1);
    code = code.replace(t2, r2);
    code = code.replace(t3, r3);
    fs.writeFileSync('src/app.js', code);
    console.log("Patched music controls!");
}
