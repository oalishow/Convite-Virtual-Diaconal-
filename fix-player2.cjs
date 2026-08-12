const fs = require('fs');
let code = fs.readFileSync('src/app.js', 'utf8');
code = code.replace(/window\.window\.ytPlayer/g, 'window.ytPlayer');
code = code.replace(/window\.ytPlayer/g, 'window.ytPlayer');
fs.writeFileSync('src/app.js', code);
