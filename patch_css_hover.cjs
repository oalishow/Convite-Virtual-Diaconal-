const fs = require('fs');
let css = fs.readFileSync('src/style.css', 'utf8');

const regexHover = /\.ordinand-card-photo-frame:hover img \{([\s\S]*?)\}/;

const newHover = `@media (hover: hover) and (pointer: fine) {
      .ordinand-card-photo-frame:hover img {$1}
    }`;

if (css.match(regexHover)) {
    css = css.replace(regexHover, newHover);
    fs.writeFileSync('src/style.css', css);
    console.log("Patched photo hover CSS for mobile.");
} else {
    console.log("Failed to match photo hover CSS.");
}
