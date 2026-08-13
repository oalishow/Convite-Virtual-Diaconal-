const fs = require('fs');
let code = fs.readFileSync('src/app.js', 'utf8');

const t = `         window.isNativeAudio = false;
         if (rawUrl.includes('suno.com') || rawUrl.includes('.mp3')) {
             window.isNativeAudio = true;`;

const r = `         window.isNativeAudio = false;
         window.isYoutubeMusic = false; // Initialize to avoid undefined
         if (rawUrl.includes('suno.com') || rawUrl.includes('.mp3')) {
             window.isNativeAudio = true;`;

if (code.includes(t)) {
    code = code.replace(t, r);
    fs.writeFileSync('src/app.js', code);
    console.log("Fixed isYoutubeMusic");
}
