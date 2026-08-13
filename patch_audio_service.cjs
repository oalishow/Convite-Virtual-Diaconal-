const fs = require('fs');
let code = fs.readFileSync('src/app.js', 'utf8');

const target1 = `      if (data.urlPlaylistYoutube) {
         var ytIframe = document.getElementById('ytIframe');
         var rawUrl = data.urlPlaylistYoutube.trim();`;

const replacement1 = `      if (data.urlPlaylistYoutube) {
         var ytIframe = document.getElementById('ytIframe');
         var rawUrl = data.urlPlaylistYoutube.trim();
         
         // HARDCODED SUNO PLAYLIST IF APPLICABLE (Based on user's AudioService)
         window.isNativeAudio = false;
         if (rawUrl.includes('suno.com') || rawUrl.includes('.mp3')) {
             window.isNativeAudio = true;
             
             // If they pasted a single .mp3 or comma separated mp3s, use them. Otherwise use the default Lo-fi playlist.
             let urls = [];
             if (rawUrl.includes('.mp3')) {
                 urls = rawUrl.split(',').map(u => u.trim());
             } else {
                 urls = [
                    'https://cdn1.suno.ai/cdb419bb-5c24-4369-ba8c-870f4acd6afa.mp3',
                    'https://cdn1.suno.ai/893d4b1c-857d-49b6-859e-6118b6453732.mp3',
                    'https://cdn1.suno.ai/332b3e8c-c63a-425c-aa9e-7fc10e34cc84.mp3',
                    'https://cdn1.suno.ai/40bbcfff-52b9-4100-8547-cc37e4cb4d7b.mp3',
                    'https://cdn1.suno.ai/0ead32f5-bf7c-45e9-afc3-fbcee731ec02.mp3'
                 ];
             }
             
             window.ambientMusicPlaylist = urls;
             window.currentAmbientTrackIndex = 0;
             if (ytIframe) ytIframe.style.display = 'none'; // hide the iframe
             
             return; // Skip the rest of the iframe setup
         }`;

code = code.replace(target1, replacement1);

const target2 = `    window.toggleSacredMusic = function toggleSacredMusic() {
      var widgetWrapper = document.querySelector('.music-player-widget-wrapper');
      if (widgetWrapper && widgetWrapper.style.display === 'none') {
        widgetWrapper.style.display = 'block';
      }

      var box = document.getElementById('ytEmbedBox');

      // Se for Suno ou outro iframe não-YouTube, não temos controle de Play/Pause. Apenas mostramos a caixa.
      if (window.isYoutubeMusic === false) {`;

const replacement2 = `    window.toggleSacredMusic = function toggleSacredMusic() {
      var widgetWrapper = document.querySelector('.music-player-widget-wrapper');
      if (widgetWrapper && widgetWrapper.style.display === 'none') {
        widgetWrapper.style.display = 'block';
      }

      var box = document.getElementById('ytEmbedBox');
      
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
      }

      // Se for Suno ou outro iframe não-YouTube, não temos controle de Play/Pause. Apenas mostramos a caixa.
      if (window.isYoutubeMusic === false) {`;

code = code.replace(target2, replacement2);

const target3 = `    window.nextSacredMusic = function nextSacredMusic() {
      if (window.ytPlayer && typeof window.ytPlayer.nextVideo === 'function') {`;
const replacement3 = `    window.nextSacredMusic = function nextSacredMusic() {
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
      }

      if (window.ytPlayer && typeof window.ytPlayer.nextVideo === 'function') {`;

code = code.replace(target3, replacement3);

const target4 = `    window.prevSacredMusic = function prevSacredMusic() {
      if (window.ytPlayer && typeof window.ytPlayer.previousVideo === 'function') {`;
const replacement4 = `    window.prevSacredMusic = function prevSacredMusic() {
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
      }

      if (window.ytPlayer && typeof window.ytPlayer.previousVideo === 'function') {`;

code = code.replace(target4, replacement4);

fs.writeFileSync('src/app.js', code);
console.log("Patched correctly.");
