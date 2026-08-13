const fs = require('fs');
let code = fs.readFileSync('dist/index.html', 'utf8');

const t = `        <iframe 
          id="ytIframe" 
          src="https://www.youtube-nocookie.com/embed/nTdhx9Zz04U?list=PLUK8yrBE-TeU&enablejsapi=1&playsinline=1&rel=0&autoplay=1" 
          title="Música / Playlist"`;

const r = `        <iframe 
          id="ytIframe" 
          src="" 
          title="Música / Playlist"`;

if (code.includes(t)) {
    code = code.replace(t, r);
    fs.writeFileSync('dist/index.html', code);
    console.log("Fixed HTML iframe");
} else {
    console.log("HTML iframe pattern not found");
}
