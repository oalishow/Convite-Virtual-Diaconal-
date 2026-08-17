const fs = require('fs');
let css = fs.readFileSync('src/style.css', 'utf8');

const regexParish = /\.parish-info \{([\s\S]*?)\}/;

const newParish = `.parish-info {
      position: relative;
      z-index: 200;
      pointer-events: auto;$1}`;

if (css.match(regexParish) && !css.includes('z-index: 200;')) {
    css = css.replace(regexParish, newParish);
    fs.writeFileSync('src/style.css', css);
    console.log("Patched parish-info CSS.");
} else {
    console.log("Already patched or regex failed.");
}
