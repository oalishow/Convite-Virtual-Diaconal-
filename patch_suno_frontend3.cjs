const fs = require('fs');
let code = fs.readFileSync('src/app.js', 'utf8');

const t = `             // If they pasted a single .mp3 or comma separated mp3s, use them. Otherwise use the default Lo-fi playlist.
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
             
             // WE CANNOT RETURN HERE OR THE REST OF applySiteDataToUI FAILS!`;

const r = `             if (ytIframe) ytIframe.style.display = 'none'; // hide the iframe
             
             if (rawUrl.includes('.mp3')) {
                 window.ambientMusicPlaylist = rawUrl.split(',').map(u => u.trim());
                 window.currentAmbientTrackIndex = 0;
             } else {
                 // Fetch from backend proxy
                 fetch('/api/suno?url=' + encodeURIComponent(rawUrl))
                    .then(res => res.json())
                    .then(data => {
                        if (data.urls && data.urls.length > 0) {
                            window.ambientMusicPlaylist = data.urls;
                            window.currentAmbientTrackIndex = 0;
                            // If audio is already initialized but paused, we update it
                            if (window.ambientAudio) {
                                window.ambientAudio.src = window.ambientMusicPlaylist[0];
                            }
                        }
                    })
                    .catch(err => console.error("Error fetching Suno playlist:", err));
             }
             
             // WE CANNOT RETURN HERE OR THE REST OF applySiteDataToUI FAILS!`;

if (code.includes('if (rawUrl.includes(\'.mp3\')) {')) {
    code = code.replace(t, r);
    fs.writeFileSync('src/app.js', code);
    console.log("Patched frontend fetch logic for Suno!");
} else {
    console.log("Target not found!");
}
