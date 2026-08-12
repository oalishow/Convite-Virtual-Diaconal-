const fs = require('fs');
let code = fs.readFileSync('src/app.js', 'utf8');

// Replace local ytPlayer declarations and usage
code = code.replace(/var ytPlayer = null;/g, 'window.ytPlayer = null;');
code = code.replace(/ytPlayer\b(?!\.destroy|\.playVideo|\.pauseVideo|\.getPlayerState|\.nextVideo|\.previousVideo|\s*=)/g, 'window.ytPlayer');
// Actually, it's safer to just replace ytPlayer with window.ytPlayer everywhere, except where it's already window.ytPlayer
code = code.replace(/window\.ytPlayer/g, 'ytPlayerTEMP');
code = code.replace(/ytPlayer/g, 'window.ytPlayer');
code = code.replace(/window\.window\.ytPlayer/g, 'window.ytPlayer');
code = code.replace(/ytPlayerTEMP/g, 'window.ytPlayer');

// Replace the iframe recreation block
const searchBlock = `             if (ytIframe.dataset.originalSrc !== base) {
                 ytIframe.dataset.originalSrc = base;
                 ytIframe.setAttribute('src', base);
                 if (window.ytPlayer && window.isYoutubeMusic) {
                     // Destroy old player to recreate it with the new URL
                     try { window.ytPlayer.destroy(); window.ytPlayer = null; } catch(e) {}
                 }
             }`;

const replaceBlock = `             if (ytIframe.dataset.originalSrc !== base) {
                 ytIframe.dataset.originalSrc = base;
                 
                 if (window.ytPlayer) {
                     try { window.ytPlayer.destroy(); } catch(e) {}
                     window.ytPlayer = null;
                 }
                 
                 var newIframe = document.createElement('iframe');
                 newIframe.id = 'ytIframe';
                 newIframe.setAttribute('src', base);
                 newIframe.setAttribute('title', ytIframe.getAttribute('title') || 'Playlist');
                 newIframe.setAttribute('allow', ytIframe.getAttribute('allow') || 'autoplay');
                 if (ytIframe.hasAttribute('allowfullscreen')) newIframe.setAttribute('allowfullscreen', '');
                 newIframe.dataset.originalSrc = base;
                 
                 if (ytIframe.parentElement) {
                     ytIframe.parentElement.replaceChild(newIframe, ytIframe);
                     ytIframe = newIframe;
                 } else {
                     ytIframe.setAttribute('src', base);
                 }
             }`;

code = code.replace(searchBlock, replaceBlock);

fs.writeFileSync('src/app.js', code);
console.log("Replaced ytPlayer and iframe logic.");
