const fs = require('fs');
let code = fs.readFileSync('src/app.js', 'utf8');

const target = `             if (isYoutube) {
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
             }`;

const replacement = `             if (isYoutube) {
                 try {
                     let urlObj = new URL(rawUrl.startsWith('http') ? rawUrl : 'https://' + rawUrl);
                     if (urlObj.hostname.includes('youtube.com') || urlObj.hostname === 'youtu.be') {
                         let videoId = urlObj.searchParams.get('v');
                         if (urlObj.hostname === 'youtu.be') videoId = urlObj.pathname.slice(1);
                         let listId = urlObj.searchParams.get('list');
                         
                         if (urlObj.pathname.includes('/playlist') && listId) {
                             base = 'https://www.youtube-nocookie.com/embed/videoseries?list=' + listId;
                         } else if (videoId) {
                             base = 'https://www.youtube-nocookie.com/embed/' + videoId;
                             if (listId) base += '?list=' + listId;
                         } else if (urlObj.pathname.includes('/embed/')) {
                             base = urlObj.href; // already an embed link
                         } else {
                             // Fallback for short formats like "nTdhx9Zz04U?list=PLUK8yrBE-TeU" that were parsed as domain
                             base = 'https://www.youtube-nocookie.com/embed/' + rawUrl;
                         }
                     }
                 } catch(e) {
                     base = 'https://www.youtube-nocookie.com/embed/' + rawUrl;
                 }
                 
                 if (!base.includes('enablejsapi=1')) {
                     base += (base.includes('?') ? '&' : '?') + 'enablejsapi=1&playsinline=1&rel=0';
                 }
                 if (!base.includes('autoplay=')) {
                     base += '&autoplay=1';
                 }
                 if(ytIframe.parentElement && ytIframe.parentElement.style.aspectRatio !== '16 / 9') {
                     ytIframe.parentElement.style.aspectRatio = '16 / 9';
                     ytIframe.parentElement.style.height = 'auto';
                 }
             }`;

code = code.replace(target, replacement);
fs.writeFileSync('src/app.js', code);
console.log("Patched Youtube URL parsing");
