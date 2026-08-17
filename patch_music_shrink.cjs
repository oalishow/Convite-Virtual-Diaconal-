const fs = require('fs');
let css = fs.readFileSync('src/style.css', 'utf8');

const regexGroup = /\.music-controls-group \{([\s\S]*?)\}/;

const newGroup = `.music-controls-group {$1
      flex-shrink: 0;
    }`;

if (css.match(regexGroup)) {
    css = css.replace(regexGroup, newGroup);
    fs.writeFileSync('src/style.css', css);
    console.log("Patched flex-shrink.");
} else {
    console.log("Failed to match group.");
}
