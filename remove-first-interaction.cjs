const fs = require('fs');
let code = fs.readFileSync('src/app.js', 'utf8');

code = code.replace(/\/\/ Enable autoplay on first interaction[\s\S]*\}\);/g, '');

fs.writeFileSync('src/app.js', code);
console.log("Removed duplicate firstInteraction");
