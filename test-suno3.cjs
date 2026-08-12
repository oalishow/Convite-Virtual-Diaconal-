const fs = require('fs');
let code = fs.readFileSync('src/app.js', 'utf8');
const search = `                 if (!isYoutube) {
                     ytLink.innerText = 'Abrir Link Externo ↗';
                     if (document.getElementById('sacredMusicWidget')) document.getElementById('sacredMusicWidget').style.display = 'flex';
                     if (document.getElementById('headerMusicBtn')) document.getElementById('headerMusicBtn').style.display = 'flex';
                 } else {`;
const replace = `                 if (!isYoutube) {
                     ytLink.innerText = 'Abrir Link Externo ↗';
                     if (document.getElementById('sacredMusicWidget')) document.getElementById('sacredMusicWidget').style.display = 'flex';
                     if (document.getElementById('headerMusicBtn')) document.getElementById('headerMusicBtn').style.display = 'flex';
                     var box = document.getElementById('ytEmbedBox');
                     if (box) box.classList.add('visible');
                 } else {`;
code = code.replace(search, replace);
fs.writeFileSync('src/app.js', code);
console.log("Patched suno auto-open");
