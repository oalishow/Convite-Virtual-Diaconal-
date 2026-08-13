const fs = require('fs');
let code = fs.readFileSync('src/app.js', 'utf8');

const t = `             if (ytIframe) {
                 ytIframe.style.display = 'none'; // hide the iframe
                 ytIframe.src = ''; // Clear src so it doesn't autoplay in the background
             }`;

const r = `             if (ytIframe) {
                 ytIframe.style.display = 'none'; // hide the iframe
                 ytIframe.src = ''; // Clear src so it doesn't autoplay in the background
                 
                 // Also hide the black frame container since there's no video
                 var frameContainer = ytIframe.closest('.yt-embed-frame-container');
                 if (frameContainer) frameContainer.style.display = 'none';
             }`;

if (code.includes(t)) {
    code = code.replace(t, r);
    fs.writeFileSync('src/app.js', code);
    console.log("Fixed frame container");
} else {
    console.log("Not found t");
}
