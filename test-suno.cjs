const fs = require('fs');
let code = fs.readFileSync('src/app.js', 'utf8');
code = code.replace(/\} else \{\n(\s*)if\(ytIframe.parentElement/, "} else {\n$1base = base.includes('http') ? base : 'https://' + base;\n$1if(ytIframe.parentElement");
fs.writeFileSync('src/app.js', code);
console.log("Patched suno base url");
