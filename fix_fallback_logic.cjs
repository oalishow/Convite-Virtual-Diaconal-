const fs = require('fs');
let code = fs.readFileSync('src/app.js', 'utf8');

const t = `      // Se for outro iframe não-YouTube, não temos controle de Play/Pause. Apenas mostramos a caixa.
      if (window.isYoutubeMusic === false) {`;

const r = `      // Se for outro iframe não-YouTube, não temos controle de Play/Pause. Apenas mostramos a caixa.
      if (window.isYoutubeMusic === false && !window.isNativeAudio) {`;

if (code.includes(t)) {
    code = code.replace(t, r);
    fs.writeFileSync('src/app.js', code);
    console.log("Fixed fallback logic");
} else {
    console.log("Not found fallback logic");
}
