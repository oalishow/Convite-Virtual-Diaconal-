const fs = require('fs');
let js = fs.readFileSync('src/app.js', 'utf8');

const regexAutoplay = /document\.addEventListener\('DOMContentLoaded', \(\) => \{/;

const autoPlayLogic = `document.addEventListener('DOMContentLoaded', () => {
    // Autoplay fallback for strict browsers (Chrome/Safari)
    let audioStarted = false;
    const startAudio = () => {
        if (audioStarted) return;
        if (window.isNativeAudio && window.ambientAudio && window.ambientAudio.paused) {
            window.ambientAudio.play().then(() => {
                audioStarted = true;
                updateMusicUI(true);
            }).catch(e => console.log("Autoplay blocked:", e));
        } else if (!window.isNativeAudio && window.ytPlayer && typeof window.ytPlayer.playVideo === 'function') {
            window.ytPlayer.playVideo();
            audioStarted = true;
            updateMusicUI(true);
        }
    };
    
    // Listen for user interactions to unlock audio
    ['scroll', 'click', 'touchstart'].forEach(evt => {
        window.addEventListener(evt, startAudio, { once: true, passive: true });
    });
`;

js = js.replace(regexAutoplay, autoPlayLogic);
fs.writeFileSync('src/app.js', js);
console.log("Patched app.js for audio autoplay fallback.");
