const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const newSection = `
              <!-- Seção Compartilhamento -->
              <div class="admin-form-card">
                <h4>🔗 Compartilhamento</h4>
                <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.75rem;">
                  Personalize a mensagem e a imagem que serão enviadas quando alguém clicar em "Compartilhar Convite".
                </p>
                <div class="admin-field">
                  <label for="inputShareMessage">Texto de Compartilhamento:</label>
                  <textarea id="inputShareMessage" rows="4" placeholder="Escreva a mensagem..." style="width: 100%; border: 1px solid var(--gold-border); border-radius: 6px; padding: 0.5rem;"></textarea>
                </div>
                <div class="admin-field">
                  <label for="inputShareImage">Imagem do Convite (Anexo de Compartilhamento):</label>
                  <input type="text" id="inputShareImage" placeholder="ex: URL da imagem" style="display:none;" />
                  <input type="file" id="fileShareImage" accept="image/*" style="margin-top: 8px; font-size: 0.9rem;" />
                  <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 4px;">Escolha a foto do convite que será anexada ao compartilhar via WhatsApp (suportado na maioria dos celulares).</div>
                </div>
                <!-- Miniatura -->
                <img id="previewShareImage" style="max-width: 150px; border-radius: 4px; margin-top: 8px; display: none;" />
              </div>
`;

html = html.replace('<!-- Seção Carta de Agradecimento -->', newSection + '\n              <!-- Seção Carta de Agradecimento -->');

html = html.replace('14 • Build: 13', '15 • Build: 14');
fs.writeFileSync('index.html', html);
console.log("Patched index.html");
