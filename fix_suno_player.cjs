const fs = require('fs');
let code = fs.readFileSync('src/app.js', 'utf8');

// Remove the timeout that auto-shows the player box
const targetTimeout = `    // Show the player box by default so user knows it exists
    setTimeout(() => {
      const box = document.getElementById('ytEmbedBox');
      if (box) box.classList.add('visible');
    }, 1500);`;
code = code.replace(targetTimeout, '');

fs.writeFileSync('src/app.js', code);
console.log("Removed auto-maximize player.");
