const fs = require('fs');
let code = fs.readFileSync('src/app.js', 'utf8');

const t = `      const box = document.getElementById('ytEmbedBox');
      if (box && !box.classList.contains('visible')) {
        box.classList.add('visible');
      }`;

const r = `      const box = document.getElementById('ytEmbedBox');
      // Removed auto-expand on first interaction per user request
      /*
      if (box && !box.classList.contains('visible')) {
        box.classList.add('visible');
      }
      */`;

if (code.includes(t)) {
    code = code.replace(t, r);
    fs.writeFileSync('src/app.js', code);
    console.log("Fixed auto expand");
} else {
    console.log("Not found");
}
