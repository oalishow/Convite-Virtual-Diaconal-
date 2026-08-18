const fs = require('fs');
let code = fs.readFileSync('src/app.js', 'utf8');

const targetStr = `    window.addEventListener('scroll', startAudio, { passive: true \n    window.addEventListener('click', startAudio, { passive: true \n    window.addEventListener('touchstart', startAudio, { passive: true \n    // removed foreach`;

const replacement = `    const removeAudioListeners = () => {
        window.removeEventListener('scroll', startAudio);
        window.removeEventListener('click', startAudio);
        window.removeEventListener('touchstart', startAudio);
    };

    window.addEventListener('scroll', startAudio, { passive: true });
    window.addEventListener('click', startAudio, { passive: true });
    window.addEventListener('touchstart', startAudio, { passive: true });`;

code = code.replace(targetStr, replacement);
fs.writeFileSync('src/app.js', code);
