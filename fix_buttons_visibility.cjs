const fs = require('fs');
let code = fs.readFileSync('src/app.js', 'utf8');

const target = `         // Se não for youtube, vamos ocultar os botões de controle específicos
         var sacredPlayBtn = document.getElementById('sacredPlayBtn');
         var btnPrev = document.querySelector('button[onclick="prevSacredMusic()"]');
         var btnNext = document.querySelector('button[onclick="nextSacredMusic()"]');
         if (sacredPlayBtn) sacredPlayBtn.style.display = isYoutube ? '' : 'none';
         if (btnPrev) btnPrev.style.display = isYoutube ? '' : 'none';
         if (btnNext) btnNext.style.display = isYoutube ? '' : 'none';`;

const replacement = `         // Se não for youtube, vamos ocultar os botões de controle específicos
         var sacredPlayBtn = document.getElementById('sacredPlayBtn');
         var btnPrev = document.querySelector('button[onclick="prevSacredMusic()"]');
         var btnNext = document.querySelector('button[onclick="nextSacredMusic()"]');
         var showButtons = isYoutube || window.isNativeAudio;
         if (sacredPlayBtn) sacredPlayBtn.style.display = showButtons ? '' : 'none';
         if (btnPrev) btnPrev.style.display = showButtons ? '' : 'none';
         if (btnNext) btnNext.style.display = showButtons ? '' : 'none';`;

if (code.includes(target)) {
    code = code.replace(target, replacement);
    fs.writeFileSync('src/app.js', code);
    console.log("Fixed buttons visibility");
} else {
    console.log("Could not find target block");
}
