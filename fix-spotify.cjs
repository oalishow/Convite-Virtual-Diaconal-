const fs = require('fs');
let code = fs.readFileSync('src/app.js', 'utf8');
const search = `         } else if (rawUrl.includes('suno.com/playlist/')) {
             rawUrl = rawUrl.replace('suno.com/playlist/', 'suno.com/embed/playlist/');
         }`;
const replace = `         } else if (rawUrl.includes('suno.com/playlist/')) {
             rawUrl = rawUrl.replace('suno.com/playlist/', 'suno.com/embed/playlist/');
         } else if (rawUrl.includes('spotify.com/')) {
             if (!rawUrl.includes('/embed/')) {
                 rawUrl = rawUrl.replace('spotify.com/', 'spotify.com/embed/');
             }
         }`;
code = code.replace(search, replace);

// Let's remove the auto-open behavior for non-youtube, since the user wants the header button to just open the player.
code = code.replace("var box = document.getElementById('ytEmbedBox');\n                     if (box) box.classList.add('visible');", "");

fs.writeFileSync('src/app.js', code);
console.log("Patched spotify and removed auto-open");
