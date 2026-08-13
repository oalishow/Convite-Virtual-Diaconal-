const fs = require('fs');
let code = fs.readFileSync('src/app.js', 'utf8');

const t1 = `             if (ytIframe) {
                 ytIframe.style.display = 'none'; // hide the iframe
                 ytIframe.src = ''; // Clear src so it doesn't autoplay in the background
             }`;

const old_t1 = `             if (ytIframe) ytIframe.style.display = 'none'; // hide the iframe
             var b = document.getElementById('ytEmbedBox');`;

const r1 = `             if (ytIframe) {
                 ytIframe.style.display = 'none'; // hide the iframe
                 ytIframe.src = ''; // Clear src so it doesn't autoplay in the background
             }
             var b = document.getElementById('ytEmbedBox');`;

if (code.includes(old_t1)) {
    code = code.replace(old_t1, r1);
    fs.writeFileSync('src/app.js', code);
    console.log("Fixed iframe autoplay in applySiteDataToUI");
} else {
    console.log("Not found old_t1");
}
