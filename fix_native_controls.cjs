const fs = require('fs');
let code = fs.readFileSync('src/app.js', 'utf8');

// Fix toggleSacredMusic
const t2 = `      var box = document.getElementById('ytEmbedBox');`;
const r2 = `      var box = document.getElementById('ytEmbedBox');

      // Native Audio Player Logic (Suno MP3s)
      if (window.isNativeAudio && window.ambientMusicPlaylist && window.ambientMusicPlaylist.length > 0) {
          if (!window.ambientAudio) {
              window.ambientAudio = new Audio(window.ambientMusicPlaylist[window.currentAmbientTrackIndex]);
              window.ambientAudio.volume = 0.5;
              
              window.ambientAudio.addEventListener('ended', () => {
                  window.nextSacredMusic();
              });
              
              window.ambientAudio.play().then(() => {
                  showToast("Música em reprodução: Suno Playlist.");
                  updateMusicUI(true);
              }).catch(err => {
                  console.warn("Failed to init bg audio", err);
                  showToast("Erro ao reproduzir. Clique novamente.");
                  updateMusicUI(false);
              });
          } else {
              if (window.ambientAudio.paused) {
                  window.ambientAudio.play();
                  showToast("Música retomada.");
                  updateMusicUI(true);
              } else {
                  window.ambientAudio.pause();
                  showToast("Música pausada.");
                  updateMusicUI(false);
              }
          }
          return;
      }`;
code = code.replace(t2, r2);

// Fix nextSacredMusic
const t3 = `    window.nextSacredMusic = function nextSacredMusic() {`;
const r3 = `    window.nextSacredMusic = function nextSacredMusic() {
      if (window.isNativeAudio && window.ambientMusicPlaylist) {
          window.currentAmbientTrackIndex = (window.currentAmbientTrackIndex + 1) % window.ambientMusicPlaylist.length;
          if (window.ambientAudio) {
              const wasPlaying = !window.ambientAudio.paused;
              window.ambientAudio.src = window.ambientMusicPlaylist[window.currentAmbientTrackIndex];
              if (wasPlaying) {
                  window.ambientAudio.play().catch(e => console.log(e));
                  updateMusicUI(true);
              }
          }
          showToast("Próxima música.");
          return;
      }`;
code = code.replace(t3, r3);

// Fix prevSacredMusic
const t4 = `    window.prevSacredMusic = function prevSacredMusic() {`;
const r4 = `    window.prevSacredMusic = function prevSacredMusic() {
      if (window.isNativeAudio && window.ambientMusicPlaylist) {
          window.currentAmbientTrackIndex = (window.currentAmbientTrackIndex - 1 + window.ambientMusicPlaylist.length) % window.ambientMusicPlaylist.length;
          if (window.ambientAudio) {
              const wasPlaying = !window.ambientAudio.paused;
              window.ambientAudio.src = window.ambientMusicPlaylist[window.currentAmbientTrackIndex];
              if (wasPlaying) {
                  window.ambientAudio.play().catch(e => console.log(e));
                  updateMusicUI(true);
              }
          }
          showToast("Música anterior.");
          return;
      }`;
code = code.replace(t4, r4);

fs.writeFileSync('src/app.js', code);
console.log("Patched properly");
