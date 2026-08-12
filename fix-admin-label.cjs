const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

code = code.replace(
    '<label for="inputUrlPlaylistYoutube">Link da Playlist do YouTube (opcional):</label>',
    '<label for="inputUrlPlaylistYoutube">Link da Música / Playlist (YouTube, Suno, Spotify) (opcional):</label>'
);

fs.writeFileSync('index.html', code);
console.log("Patched admin label");
