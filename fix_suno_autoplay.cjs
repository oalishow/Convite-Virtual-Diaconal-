const fs = require('fs');
let code = fs.readFileSync('src/app.js', 'utf8');

const t = `                            // If audio is already initialized but paused, we update it
                            if (window.ambientAudio) {
                                window.ambientAudio.src = window.ambientMusicPlaylist[0];
                            }`;

const r = `                            // If audio is already initialized but paused, we update it
                            if (window.ambientAudio) {
                                window.ambientAudio.src = window.ambientMusicPlaylist[0];
                            } else {
                                // Attempt autoplay without interaction
                                if (window.toggleSacredMusic) {
                                    window.toggleSacredMusic();
                                }
                            }`;

if (code.includes(t)) {
    code = code.replace(t, r);
    fs.writeFileSync('src/app.js', code);
    console.log("Fixed suno autoplay");
} else {
    console.log("Not found t");
}
