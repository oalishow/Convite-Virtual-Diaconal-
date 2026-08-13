const fs = require('fs');
let code = fs.readFileSync('src/app.js', 'utf8');

const t = `      // Also start native audio if applicable
      if (window.isNativeAudio) {
          if (box) box.classList.remove('visible'); // don't show the empty youtube box for native audio
          if (window.toggleSacredMusic && !window.ambientAudio) {`;

const r = `      // Also start native audio if applicable
      if (window.isNativeAudio) {
          if (window.toggleSacredMusic && !window.ambientAudio) {`;

if (code.includes(t)) {
    code = code.replace(t, r);
    fs.writeFileSync('src/app.js', code);
    console.log("Fixed enable audio box");
} else {
    console.log("Not found t");
}
