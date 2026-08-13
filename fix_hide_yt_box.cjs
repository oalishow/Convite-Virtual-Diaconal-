const fs = require('fs');
let code = fs.readFileSync('src/app.js', 'utf8');

const t = `             if (ytIframe) ytIframe.style.display = 'none'; // hide the iframe
             
             if (rawUrl.includes('.mp3')) {`;

const r = `             if (ytIframe) ytIframe.style.display = 'none'; // hide the iframe
             var b = document.getElementById('ytEmbedBox');
             if (b) b.style.display = 'none'; // hide the whole box for native audio
             
             if (rawUrl.includes('.mp3')) {`;

if (code.includes(t)) {
    code = code.replace(t, r);
    fs.writeFileSync('src/app.js', code);
    console.log("Fixed hide yt box");
} else {
    console.log("Not found hide yt box target");
}
