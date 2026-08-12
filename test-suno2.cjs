const fs = require('fs');
let code = fs.readFileSync('src/app.js', 'utf8');
const search = "if (rawUrl.includes('suno.com/song/')) {\n             rawUrl = rawUrl.replace('suno.com/song/', 'suno.com/embed/');\n         }";
const replace = `if (rawUrl.includes('suno.com/song/')) {
             rawUrl = rawUrl.replace('suno.com/song/', 'suno.com/embed/');
         } else if (rawUrl.includes('suno.com/playlist/')) {
             rawUrl = rawUrl.replace('suno.com/playlist/', 'suno.com/embed/playlist/');
         }`;
code = code.replace(search, replace);
fs.writeFileSync('src/app.js', code);
console.log("Patched suno playlist replace");
