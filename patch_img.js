const fs = require('fs');
let js = fs.readFileSync('src/app.js', 'utf8');

js = js.replace('var MAX_WIDTH = 800;', 'var MAX_WIDTH = 600;');
js = js.replace('var MAX_HEIGHT = 800;', 'var MAX_HEIGHT = 600;');
js = js.replace("var dataUrl = canvas.toDataURL('image/webp', 0.8);", "var dataUrl = canvas.toDataURL('image/webp', 0.6);");

fs.writeFileSync('src/app.js', js);
console.log("Patched image upload resolution and quality.");
