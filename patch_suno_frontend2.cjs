const fs = require('fs');
let code = fs.readFileSync('src/app.js', 'utf8');

const target = `                 if(ytIframe.parentElement && ytIframe.parentElement.style.aspectRatio !== 'unset') {
                     ytIframe.parentElement.style.aspectRatio = 'unset';
                     ytIframe.parentElement.style.height = '150px';
                 }
             }`;

const replacement = `                 if(ytIframe.parentElement && ytIframe.parentElement.style.aspectRatio !== 'unset') {
                     ytIframe.parentElement.style.aspectRatio = 'unset';
                     ytIframe.parentElement.style.height = '150px';
                 }
             }
             
             window.isSunoMusic = rawUrl.includes('suno.com');
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

if (code.includes('window.isSunoMusic')) {
    console.log('Already added.');
} else {
    code = code.replace(target, replacement);
    fs.writeFileSync('src/app.js', code);
    console.log('Patched frontend for Suno API fetch.');
}
