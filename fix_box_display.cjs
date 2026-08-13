const fs = require('fs');
let code = fs.readFileSync('src/app.js', 'utf8');

const t = `             var b = document.getElementById('ytEmbedBox');
             if (b) b.style.display = 'block'; // KEEP the box visible for the link!`;

const r = `             var b = document.getElementById('ytEmbedBox');
             if (b) b.style.display = ''; // Let CSS handle visibility via .visible class`;

if (code.includes(t)) {
    code = code.replace(t, r);
    fs.writeFileSync('src/app.js', code);
    console.log("Fixed box display");
} else {
    console.log("Not found t");
}
