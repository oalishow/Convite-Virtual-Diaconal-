const fs = require('fs');
let code = fs.readFileSync('src/app.js', 'utf8');

const t = `             window.ambientMusicPlaylist = urls;
             window.currentAmbientTrackIndex = 0;
             if (ytIframe) ytIframe.style.display = 'none'; // hide the iframe
             
             return; // Skip the rest of the iframe setup
         }
         var iframeMatch = rawUrl.match(/<iframe.*?src=["'](.*?)["']/i);`;

const r = `             window.ambientMusicPlaylist = urls;
             window.currentAmbientTrackIndex = 0;
             if (ytIframe) ytIframe.style.display = 'none'; // hide the iframe
             
             // WE CANNOT RETURN HERE OR THE REST OF applySiteDataToUI FAILS!
         } else {
         
         var iframeMatch = rawUrl.match(/<iframe.*?src=["'](.*?)["']/i);`;

if (code.includes(t)) {
    code = code.replace(t, r);
    console.log("Replaced target 1");
}

const t2 = `         var ytLink = document.querySelector('.yt-embed-box a[href*="youtube.com"]');
         if (ytLink) {
             ytLink.href = rawUrl.includes('http') ? rawUrl : 'https://www.youtube.com/watch?v=' + rawUrl.replace('?list=', '&list=');
             if (!isYoutube) {
                 ytLink.innerText = 'Abrir Link Externo ↗';
                                               } else {
                 ytLink.innerText = 'Abrir no YouTube ↗';
                                               }
         }
         
         // Se não for youtube, vamos ocultar os botões de controle específicos
         var sacredPlayBtn = document.getElementById('sacredPlayBtn');`;

const r2 = `         var ytLink = document.querySelector('.yt-embed-box a[href*="youtube.com"]');
         if (ytLink) {
             ytLink.href = rawUrl.includes('http') ? rawUrl : 'https://www.youtube.com/watch?v=' + rawUrl.replace('?list=', '&list=');
             if (!isYoutube) {
                 ytLink.innerText = 'Abrir Link Externo ↗';
                                               } else {
                 ytLink.innerText = 'Abrir no YouTube ↗';
                                               }
         }
         } // END ELSE FOR NATIVE AUDIO
         
         // Se não for youtube, vamos ocultar os botões de controle específicos
         var sacredPlayBtn = document.getElementById('sacredPlayBtn');`;

if (code.includes(t2)) {
    code = code.replace(t2, r2);
    console.log("Replaced target 2");
}

fs.writeFileSync('src/app.js', code);
