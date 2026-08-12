const fs = require('fs');
let code = fs.readFileSync('src/app.js', 'utf8');

code = code.replace(
"setVal('inputPixChave', data.pixChave || '');",
`setVal('inputPixChave', data.pixChave || '');
      setVal('inputPixChaveAlison', data.pixChaveAlison || '');
      setVal('inputPixNomeAlison', data.pixNomeAlison || '');
      setVal('inputPixChaveJoao', data.pixChaveJoao || '');
      setVal('inputPixNomeJoao', data.pixNomeJoao || '');`
);

code = code.replace(
"pixChave: getVal('inputPixChave'),",
`pixChave: getVal('inputPixChave'),
        pixChaveAlison: getVal('inputPixChaveAlison'),
        pixNomeAlison: getVal('inputPixNomeAlison'),
        pixChaveJoao: getVal('inputPixChaveJoao'),
        pixNomeJoao: getVal('inputPixNomeJoao'),`
);

const searchPixRender = `    window.renderPixSection = function renderPixSection(data) {
      var qrContainer = document.getElementById('pixQrCodeContainer');
      var keyContainer = document.getElementById('pixKeyContainer');

      if (!qrContainer || !keyContainer || !data) return;

      var pixKey = data.pixChave ? data.pixChave.trim() : "";
      var holder = data.pixNome ? data.pixNome.trim() : "";
      var bank = data.pixBanco ? data.pixBanco.trim() : "";
      var qrCodeImg = data.pixQrCode ? data.pixQrCode.trim() : "";
      
      currentPixKey = pixKey; // para o copyPixKey

      // Renderiza o QR Code (ou Placeholder se a constante estiver vazia)
      if (qrCodeImg !== "") {
        qrContainer.innerHTML = \`
          <div style="background: #FFFFFF; border: 1px solid var(--gold-border); border-radius: var(--radius-sm); padding: 0.75rem; display: inline-block; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
            <img src="\${escapeHtml(qrCodeImg)}" alt="QR Code PIX para apoio fraterno" style="width: 180px; height: 180px; object-fit: contain; display: block;" />
            <span style="font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.75rem; color: var(--text-muted); margin-top: 0.5rem; display: block; font-weight: 600;">Escaneie o QR Code no app do seu banco</span>
          </div>
        \`;
      } else {
        qrContainer.innerHTML = '';
      }

      // Renderiza a Chave PIX copiável e dados adicionais
      if (pixKey !== "") {
        keyContainer.innerHTML = \`
          <div style="background: var(--bg-card); border: 1px solid var(--gold-soft); border-radius: var(--radius-sm); padding: 1.25rem; max-width: 400px; margin: 0 auto; box-shadow: 0 2px 10px rgba(0,0,0,0.02);">
            <h4 style="font-family: 'Cinzel', serif; font-size: 1.1rem; color: var(--gold-dark); margin-bottom: 0.75rem;">Chave PIX</h4>
            <div style="display: flex; align-items: center; justify-content: space-between; background: #FFFFFF; border: 1px solid var(--gold-soft); border-radius: var(--radius-xs); padding: 0.5rem 0.75rem; margin-bottom: 1rem;">
              <span id="pixKeyText" style="font-family: monospace; font-size: 0.9rem; color: var(--text-main); font-weight: 600; letter-spacing: 0.05em; word-break: break-all;">\${escapeHtml(pixKey)}</span>
              <button onclick="copyPixKey()" class="btn-primary" style="padding: 0.4rem 0.75rem; font-size: 0.75rem; margin-left: 0.5rem;" title="Copiar Chave">Copiar</button>
            </div>
            \${holder ? \`<p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.25rem;"><strong>Favorecido:</strong> \${escapeHtml(holder)}</p>\` : ''}
            \${bank ? \`<p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0;"><strong>Instituição:</strong> \${escapeHtml(bank)}</p>\` : ''}
          </div>
        \`;
      } else {
        keyContainer.innerHTML = '';
      }
    };`;

const replacePixRender = `    window.renderPixSection = function renderPixSection(data) {
      var qrContainer = document.getElementById('pixQrCodeContainer');
      var keyContainer = document.getElementById('pixKeyContainer');

      if (!qrContainer || !keyContainer || !data) return;

      var qrCodeImg = data.pixQrCode ? data.pixQrCode.trim() : "";

      // Renderiza o QR Code
      if (qrCodeImg !== "") {
        qrContainer.innerHTML = \`
          <div style="background: #FFFFFF; border: 1px solid var(--gold-border); border-radius: var(--radius-sm); padding: 0.75rem; display: inline-block; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
            <img src="\${escapeHtml(qrCodeImg)}" alt="QR Code PIX para apoio fraterno" style="width: 180px; height: 180px; object-fit: contain; display: block;" />
            <span style="font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.75rem; color: var(--text-muted); margin-top: 0.5rem; display: block; font-weight: 600;">Escaneie o QR Code no app do seu banco</span>
          </div>
        \`;
      } else {
        qrContainer.innerHTML = '';
      }

      var html = '<div style="display: flex; flex-direction: column; gap: 1rem; max-width: 400px; margin: 0 auto;">';
      
      var addPixBox = (title, chave, nome) => {
          if (!chave) return;
          html += \`
          <div style="background: var(--bg-card); border: 1px solid var(--gold-soft); border-radius: var(--radius-sm); padding: 1.25rem; box-shadow: 0 2px 10px rgba(0,0,0,0.02);">
            <h4 style="font-family: 'Cinzel', serif; font-size: 1.1rem; color: var(--gold-dark); margin-bottom: 0.75rem;">\${escapeHtml(title)}</h4>
            <div style="display: flex; align-items: center; justify-content: space-between; background: #FFFFFF; border: 1px solid var(--gold-soft); border-radius: var(--radius-xs); padding: 0.5rem 0.75rem; margin-bottom: 1rem;">
              <span style="font-family: monospace; font-size: 0.9rem; color: var(--text-main); font-weight: 600; letter-spacing: 0.05em; word-break: break-all;">\${escapeHtml(chave)}</span>
              <button onclick="navigator.clipboard.writeText('\${escapeHtml(chave)}'); showToast('Chave PIX copiada!')" class="btn-primary" style="padding: 0.4rem 0.75rem; font-size: 0.75rem; margin-left: 0.5rem;" title="Copiar Chave">Copiar</button>
            </div>
            \${nome ? \`<p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.25rem;"><strong>Favorecido:</strong> \${escapeHtml(nome)}</p>\` : ''}
          </div>\`;
      };
      
      if (data.pixChaveAlison || data.pixChaveJoao) {
          addPixBox('PIX - Alison', data.pixChaveAlison, data.pixNomeAlison);
          addPixBox('PIX - João Henrique', data.pixChaveJoao, data.pixNomeJoao);
      } else if (data.pixChave) {
          addPixBox('Chave PIX', data.pixChave, data.pixNome);
      }
      
      html += '</div>';
      keyContainer.innerHTML = html;
    };`;

code = code.replace(searchPixRender, replacePixRender);

fs.writeFileSync('src/app.js', code);
console.log("Patched app.js PIX fields");
