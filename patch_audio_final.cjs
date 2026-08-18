const fs = require('fs');
let code = fs.readFileSync('src/app.js', 'utf8');

const targetStr = `    const startAudio = () => {
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
    });`;

const replacement = `    const startAudio = () => {
        if (audioStarted) return;
        if (window.isNativeAudio && window.ambientAudio && window.ambientAudio.paused) {
            window.ambientAudio.play().then(() => {
                audioStarted = true;
                updateMusicUI(true);
                removeAudioListeners();
            }).catch(e => console.log("Autoplay blocked:", e));
        } else if (!window.isNativeAudio && window.ytPlayer && typeof window.ytPlayer.playVideo === 'function') {
            try {
                if (typeof window.ytPlayer.getPlayerState === 'function' && window.ytPlayer.getPlayerState() !== YT.PlayerState.PLAYING) {
                    window.ytPlayer.playVideo();
                }
                audioStarted = true;
                updateMusicUI(true);
                removeAudioListeners();
            } catch (err) {}
        }
    };
    
    const removeAudioListeners = () => {
        window.removeEventListener('scroll', startAudio);
        window.removeEventListener('click', startAudio);
        window.removeEventListener('touchstart', startAudio);
    };

    // Listen for user interactions to unlock audio
    window.addEventListener('scroll', startAudio, { passive: true });
    window.addEventListener('click', startAudio, { passive: true });
    window.addEventListener('touchstart', startAudio, { passive: true });`;

code = code.replace(targetStr, replacement);
fs.writeFileSync('src/app.js', code);
