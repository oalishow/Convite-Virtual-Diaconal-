const fs = require('fs');
let code = fs.readFileSync('src/app.js', 'utf8');

// 1. Remove the custom fetch logic for Suno
const fetchLogic = `             window.isSunoMusic = rawUrl.includes('suno.com');
             if (window.isSunoMusic) {
                 ytIframe.style.display = 'none'; // hide the iframe
                 
                 // Fetch the playlist or song MP3s
                 fetch('/api/suno?url=' + encodeURIComponent(data.urlPlaylistYoutube.trim()))
                     .then(r => r.json())
                     .then(res => {
                         if (res.urls && res.urls.length > 0) {
                             window.sunoUrls = res.urls;
                             window.sunoCurrentIndex = 0;
                             
                             if (!window.sunoAudio) {
                                 window.sunoAudio = new Audio();
                                 window.sunoAudio.addEventListener('ended', () => {
                                     window.nextSacredMusic(); // Will advance
                                 });
                             }
                             window.sunoAudio.src = window.sunoUrls[0];
                             // Attempt autoplay
                             window.sunoAudio.play().then(() => {
                                 window.updateMusicUI(true);
                             }).catch(e => {
                                 console.log('Suno autoplay prevented, waiting for user interaction');
                                 window.updateMusicUI(false);
                             });
                         }
                     })
                     .catch(err => console.error("Error loading Suno:", err));
             } else {
                 ytIframe.style.display = 'block';
                 if (window.sunoAudio) {
                     window.sunoAudio.pause();
                     window.sunoAudio = null;
                 }
             }`;
if (code.includes(fetchLogic)) {
    code = code.replace(fetchLogic, '');
    console.log("Removed custom Suno fetch logic");
}

// 2. Remove the modified toggleSacredMusic
const playLogic = `      if (window.isSunoMusic && window.sunoAudio) {
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
      }`;
if (code.includes(playLogic)) {
    code = code.replace(playLogic, '');
    console.log("Removed custom Suno play logic");
}

const nextLogic = `      if (window.isSunoMusic && window.sunoUrls && window.sunoAudio) {
          window.sunoCurrentIndex = (window.sunoCurrentIndex + 1) % window.sunoUrls.length;
          window.sunoAudio.src = window.sunoUrls[window.sunoCurrentIndex];
          window.sunoAudio.play().then(() => {
              showToast("Próxima música da playlist Suno.");
              updateMusicUI(true);
          }).catch(() => updateMusicUI(false));
          return;
      }`;
if (code.includes(nextLogic)) {
    code = code.replace(nextLogic, '');
    console.log("Removed custom Suno next logic");
}

const prevLogic = `      if (window.isSunoMusic && window.sunoUrls && window.sunoAudio) {
          window.sunoCurrentIndex = window.sunoCurrentIndex - 1;
          if (window.sunoCurrentIndex < 0) window.sunoCurrentIndex = window.sunoUrls.length - 1;
          window.sunoAudio.src = window.sunoUrls[window.sunoCurrentIndex];
          window.sunoAudio.play().then(() => {
              showToast("Música anterior da playlist Suno.");
              updateMusicUI(true);
          }).catch(() => updateMusicUI(false));
          return;
      }`;
if (code.includes(prevLogic)) {
    code = code.replace(prevLogic, '');
    console.log("Removed custom Suno prev logic");
}

fs.writeFileSync('src/app.js', code);
