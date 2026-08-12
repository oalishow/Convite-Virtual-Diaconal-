const fs = require('fs');

// 1. Update Version
let indexCode = fs.readFileSync('index.html', 'utf8');
indexCode = indexCode.replace(/Versão 1\.11/g, 'Versão 1.12');

// 2. Remove the floating music widget and just keep the iframe box, maybe make the header button toggle the iframe box directly.
// In index.html:
// Replace the entire <div class="music-player-widget" ...> ... </div> with nothing.
// Leave the yt-embed-box.
const widgetStart = indexCode.indexOf('<div class="music-player-widget" id="sacredMusicWidget"');
if (widgetStart !== -1) {
    const nextDivStart = indexCode.indexOf('<div class="admin-modal"', widgetStart);
    if (nextDivStart !== -1) {
        indexCode = indexCode.substring(0, widgetStart) + indexCode.substring(nextDivStart);
    }
}

// 3. Make the header button just toggle ytEmbedBox
indexCode = indexCode.replace(/onclick="toggleSacredMusic\(\)"/g, 'onclick="toggleYtEmbedBox()"');

fs.writeFileSync('index.html', indexCode);
console.log("Updated index.html");

// 4. Update app.js
let appCode = fs.readFileSync('src/app.js', 'utf8');

// We don't need the ytPlayer JS API stuff anymore, since the user wants a generic iframe that can play Spotify, Suno, etc.
// But it's already there, we can just disable the API initialization or leave it for YouTube but don't depend on it.
// The user said: "Remova o player de música, pois ele não está funcionando, crie um outro que consiga reproduzir músicas do suno, youtube, spotify etc."
// Actually, an iframe is already what is used. I just need to remove the play/pause button logic that was failing for non-YT sources, and the floating widget.
appCode = appCode.replace(/if \(document\.getElementById\('sacredMusicWidget'\)\).*?\n/g, '');
appCode = appCode.replace(/if \(document\.getElementById\('headerMusicBtn'\)\).*?\n/g, '');

fs.writeFileSync('src/app.js', appCode);
console.log("Updated app.js");

