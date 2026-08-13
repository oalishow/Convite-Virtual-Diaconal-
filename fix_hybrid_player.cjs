const fs = require('fs');
let code = fs.readFileSync('src/app.js', 'utf8');

const t = `             if (ytIframe) {
                 ytIframe.style.display = 'none'; // hide the iframe
                 ytIframe.src = ''; // Clear src so it doesn't autoplay in the background
             }
             var b = document.getElementById('ytEmbedBox');
             if (b) b.style.display = 'none'; // hide the whole box for native audio`;

const r = `             if (ytIframe) {
                 ytIframe.style.display = 'none'; // hide the iframe
                 ytIframe.src = ''; // Clear src so it doesn't autoplay in the background
             }
             var b = document.getElementById('ytEmbedBox');
             if (b) b.style.display = 'block'; // KEEP the box visible for the link!
             
             // Update the link in the box to use the Ordenacao YouTube link
             var ytLink = document.querySelector('.yt-embed-box a[href*="youtube.com"]');
             if (ytLink && data.urlPlaylistOrdenacao) {
                 ytLink.href = data.urlPlaylistOrdenacao;
                 ytLink.innerText = 'Ouvir no YouTube ↗';
             }`;

if (code.includes(t)) {
    code = code.replace(t, r);
    fs.writeFileSync('src/app.js', code);
    console.log("Fixed hybrid player");
} else {
    console.log("Not found t");
}
