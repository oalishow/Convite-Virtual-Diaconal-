const fs = require('fs');
let appCode = fs.readFileSync('src/app.js', 'utf8');

const replacement = `
             if (isYoutube) {
                 base = base.includes('http') ? base : 'https://www.youtube-nocookie.com/embed/' + base;
                 if (!base.includes('enablejsapi=1')) {
                     base += (base.includes('?') ? '&' : '?') + 'enablejsapi=1&playsinline=1&rel=0';
                 }
                 if (!base.includes('autoplay=')) {
                     base += '&autoplay=1';
                 }
                 // Converter watch?v= ou youtu.be para embed
                 base = base.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube-nocookie.com/embed/');
                 if(ytIframe.parentElement && ytIframe.parentElement.style.aspectRatio !== '16 / 9') {
                     ytIframe.parentElement.style.aspectRatio = '16 / 9';
                     ytIframe.parentElement.style.height = 'auto';
                 }
             } else {
                 base = base.includes('http') ? base : 'https://' + base;
                 if (!base.includes('autoplay=')) {
                     base += (base.includes('?') ? '&' : '?') + 'autoplay=1';
                 }
                 if(ytIframe.parentElement && ytIframe.parentElement.style.aspectRatio !== 'unset') {
                     ytIframe.parentElement.style.aspectRatio = 'unset';
                     ytIframe.parentElement.style.height = '150px';
                 }
             }
`;

const target = `
             if (isYoutube) {
                 base = base.includes('http') ? base : 'https://www.youtube-nocookie.com/embed/' + base;
                 if (!base.includes('enablejsapi=1')) {
                     base += (base.includes('?') ? '&' : '?') + 'enablejsapi=1&playsinline=1&rel=0';
                 }
                 // Converter watch?v= ou youtu.be para embed
                 base = base.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube-nocookie.com/embed/');
                 if(ytIframe.parentElement && ytIframe.parentElement.style.aspectRatio !== '16 / 9') {
                     ytIframe.parentElement.style.aspectRatio = '16 / 9';
                     ytIframe.parentElement.style.height = 'auto';
                 }
             } else {
                 base = base.includes('http') ? base : 'https://' + base;
                 if(ytIframe.parentElement && ytIframe.parentElement.style.aspectRatio !== 'unset') {
                     ytIframe.parentElement.style.aspectRatio = 'unset';
                     ytIframe.parentElement.style.height = '150px';
                 }
             }
`;

appCode = appCode.replace(target.trim(), replacement.trim());
fs.writeFileSync('src/app.js', appCode);

let indexCode = fs.readFileSync('index.html', 'utf8');
indexCode = indexCode.replace(
    'src="https://www.youtube-nocookie.com/embed/nTdhx9Zz04U?list=PLUK8yrBE-TeU&enablejsapi=1&playsinline=1&rel=0"',
    'src="https://www.youtube-nocookie.com/embed/nTdhx9Zz04U?list=PLUK8yrBE-TeU&enablejsapi=1&playsinline=1&rel=0&autoplay=1"'
);
fs.writeFileSync('index.html', indexCode);

console.log("Patched autoplay");
