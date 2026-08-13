const fs = require('fs');
let code = fs.readFileSync('src/app.js', 'utf8');

code = code.replace(
    "} else if (rawUrl.includes('suno.com/playlist/')) {\n             rawUrl = rawUrl.replace('suno.com/playlist/', 'suno.com/embed/playlist/');",
    ""
);

fs.writeFileSync('src/app.js', code);
