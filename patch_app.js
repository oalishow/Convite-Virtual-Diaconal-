const fs = require('fs');
let js = fs.readFileSync('src/app.js', 'utf8');

// 1. Add fields to saveAdminSettings()
js = js.replace(
  "dataHorario: getVal('inputDataHorario'),",
  "shareMessage: getVal('inputShareMessage'),\n        shareImage: getVal('inputShareImage'),\n        dataHorario: getVal('inputDataHorario'),"
);

// 2. Add fields to populateAdminForm()
js = js.replace(
  "setVal('inputUrlLivreto', data.urlLivreto || '');",
  "setVal('inputShareMessage', data.shareMessage || '');\n      setVal('inputShareImage', data.shareImage || '');\n      const previewShareImage = document.getElementById('previewShareImage');\n      if (previewShareImage && data.shareImage) { previewShareImage.src = data.shareImage; previewShareImage.style.display = 'block'; }\n      setVal('inputUrlLivreto', data.urlLivreto || '');"
);

// 3. Add listener for file upload
js = js.replace(
  "var fileBrasaoBispo = document.getElementById('fileBrasaoBispo');",
  "var fileShareImage = document.getElementById('fileShareImage');\n      if (fileShareImage) {\n        fileShareImage.addEventListener('change', (e) => {\n          handleImageUpload(e, 'inputShareImage');\n          setTimeout(() => {\n            const previewShareImage = document.getElementById('previewShareImage');\n            const url = document.getElementById('inputShareImage').value;\n            if(previewShareImage && url) { previewShareImage.src = url; previewShareImage.style.display = 'block'; }\n          }, 1500);\n        });\n      }\n      var fileBrasaoBispo = document.getElementById('fileBrasaoBispo');"
);

// 4. Update shareInvitation()
const oldShare = `
    /* 6. COMPARTILHAR CONVITE (WEB SHARE API E FALLBACK) */
    window.shareInvitation = function shareInvitation() {
      var titleText = "Ordenação Diaconal";
      var messageText = "Você está convidado para a Ordenação Diaconal de Alison Fernando Rodrigues dos Santos e João Henrique de Oliveira Guarsoni, no dia 19 de novembro de 2026, às 19h, na Paróquia Santa Cecília, em Assis–SP. Rezemos pelas vocações!";
      var shareUrl = window.location.href;

      var fullMessage = messageText + "\\n\\n" + shareUrl;

      if (navigator.share) {
        navigator.share({
          title: titleText,
          text: messageText,
          url: shareUrl
        }).then(() => {
          // Compartilhado com sucesso via Web Share API
        }).catch((err) => {
          // Se o usuário não cancelou explicitamente, faz o fallback de cópia
          if (err && err.name !== 'AbortError') {
            copyShareTextToClipboard(fullMessage);
          }
        });
      } else {
        copyShareTextToClipboard(fullMessage);
      }
    }`;

const newShare = `
    /* 6. COMPARTILHAR CONVITE (WEB SHARE API E FALLBACK) */
    window.shareInvitation = async function shareInvitation() {
      var data = window.currentSiteData || {};
      var titleText = "Ordenação Diaconal";
      var messageText = data.shareMessage || "Você está convidado para a Ordenação Diaconal de Alison Fernando Rodrigues dos Santos e João Henrique de Oliveira Guarsoni, no dia 19 de novembro de 2026, às 19h, na Paróquia Santa Cecília, em Assis–SP. Rezemos pelas vocações!";
      var shareUrl = window.location.href;
      var fullMessage = messageText + "\\n\\n" + shareUrl;
      
      var shareData = {
          title: titleText,
          text: messageText,
          url: shareUrl
      };

      try {
          if (data.shareImage && data.shareImage.trim() !== '') {
              // Convert base64 / URL to File object
              const response = await fetch(data.shareImage);
              const blob = await response.blob();
              const file = new File([blob], "convite_ordenacao.jpg", { type: blob.type || "image/jpeg" });
              if (navigator.canShare && navigator.canShare({ files: [file] })) {
                  shareData.files = [file];
              }
          }
      } catch (e) {
          console.warn("Could not attach image to share:", e);
      }

      if (navigator.share) {
        navigator.share(shareData).then(() => {
          // Compartilhado com sucesso via Web Share API
        }).catch((err) => {
          if (err && err.name !== 'AbortError') {
            copyShareTextToClipboard(fullMessage);
          }
        });
      } else {
        copyShareTextToClipboard(fullMessage);
      }
    }
`;

js = js.replace(oldShare, newShare);

// If the old block wasn't exactly matched, let's log an error
if (js.includes("window.shareInvitation = async function")) {
  fs.writeFileSync('src/app.js', js);
  console.log("Patched src/app.js successfully");
} else {
  console.log("Could not find the old block. Performing manual replace.");
  // fallback for regex replacement
  js = js.replace(/window\.shareInvitation = function shareInvitation\(\) \{[\s\S]*?copyShareTextToClipboard\(fullMessage\);\n      \}\n    \}/m, newShare);
  fs.writeFileSync('src/app.js', js);
  console.log("Patched src/app.js with fallback regex");
}
