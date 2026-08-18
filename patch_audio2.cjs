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
    };`;

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
    };`;

code = code.replace(targetStr, replacement);
fs.writeFileSync('src/app.js', code);
