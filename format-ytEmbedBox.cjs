const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

code = code.replace(
    '<span>Playlist de Ordenação Diaconal</span>',
    '<span>Música / Playlist</span>'
);

code = code.replace(
    'title="Playlist de Ordenação Diaconal"',
    'title="Música / Playlist"'
);

fs.writeFileSync('index.html', code);
console.log("Patched ytEmbedBox header");
