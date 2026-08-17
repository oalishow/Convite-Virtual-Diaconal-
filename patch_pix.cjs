const fs = require('fs');
let js = fs.readFileSync('src/app.js', 'utf8');

const regexPix = /var generatePixCard = \(name, pixKey, photoUrl, pixId\) => \{[\s\S]*?\}\s*\}\s*copyPixKey = function/m;

const newPix = `var generatePixCard = (name, pixKey, photoUrl, qrCodeUrl) => {
        var photoHtml = photoUrl ? \`<img src="\${escapeHtml(photoUrl)}" alt="\${escapeHtml(name)}" class="hover-3d" style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover; border: 2px solid var(--gold-primary);" onclick="openLightbox(this.src)" />\` : '';
        var qrCodeHtml = qrCodeUrl ? \`<img src="\${escapeHtml(qrCodeUrl)}" alt="QR Code PIX" style="width: 140px; height: 140px; border-radius: 8px; margin: 0.5rem auto; display: block; border: 1px solid var(--gold-border);" onclick="openLightbox(this.src)" />\` : '';
        var keyHtml = pixKey ? \`<span style="font-family: monospace, sans-serif; font-size: 0.95rem; font-weight: 700; color: var(--text-main); word-break: break-all; background: var(--bg-parchment-light); padding: 0.4rem 0.8rem; border-radius: 4px; border: 1px dashed var(--gold-soft); width: 100%; text-align: center;">\${escapeHtml(pixKey)}</span>
            <button class="btn-primary" style="padding: 0.5rem 1rem; font-size: 0.85rem; width: 100%; margin-top: 0.5rem;" onclick="fallbackCopyPixKey('\${escapeHtml(pixKey)}')">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:0.3rem; vertical-align:-3px;">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
              Copiar PIX
            </button>\` : '';

        return \`
          <div style="background: var(--bg-parchment); border: 1px solid var(--gold-border); border-radius: var(--radius-md); padding: 1.25rem; display: flex; flex-direction: column; align-items: center; gap: 0.5rem; flex: 1; min-width: 250px;">
            \${photoHtml}
            <h4 style="font-family: 'Cinzel', serif; color: var(--gold-dark); margin: 0; font-size: 1rem; text-align: center;">\${escapeHtml(name)}</h4>
            \${qrCodeHtml}
            \${keyHtml}
          </div>
        \`;
      };

      var cardsHtml = '';
      if (data.ordenandos && data.ordenandos.length > 0) {
          data.ordenandos.forEach(ord => {
              if (ord.pixChave || ord.pixQrCode) {
                  cardsHtml += generatePixCard(ord.nome || 'Ordenando', ord.pixChave || '', ord.foto || '', ord.pixQrCode || '');
              }
          });
      }

      if (!cardsHtml && (pixAlison !== "" || pixJoao !== "")) {
          if (pixAlison) cardsHtml += generatePixCard(nomeAlison, pixAlison, fotoAlison, qrCodeImg);
          if (pixJoao) cardsHtml += generatePixCard(nomeJoao, pixJoao, fotoJoao, qrCodeImg);
      }

      if (cardsHtml !== "") {
        keyContainer.innerHTML = \`
          <div style="display: flex; flex-wrap: wrap; gap: 1rem; justify-content: center;">
            \${cardsHtml}
          </div>
        \`;
      } else {
        keyContainer.innerHTML = \`
          <div style="background: var(--bg-parchment); border: 1px solid var(--gold-soft); border-radius: var(--radius-sm); padding: 0.85rem 1.25rem;">
            <p style="font-size: 0.88rem; color: var(--text-muted); margin: 0; font-style: italic;">
              As informações de apoio serão disponibilizadas em breve.
            </p>
          </div>
        \`;
      }
    }

    copyPixKey = function`;

if (js.match(regexPix)) {
    js = js.replace(regexPix, newPix);
    fs.writeFileSync('src/app.js', js);
    console.log("Patched renderPixSection.");
} else {
    console.log("Failed to match renderPixSection.");
}
