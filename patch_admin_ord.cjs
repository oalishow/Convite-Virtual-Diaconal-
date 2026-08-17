const fs = require('fs');
let js = fs.readFileSync('src/app.js', 'utf8');

const regexAdminOrd = /<div class="admin-field">\s*<label>História \/ Caminhada:<\/label>\s*<textarea onchange="window\.adminOrdenandos\[\$\{index\}\]\.historia = this\.value" rows="3">/;

const newAdminOrd = `<div class="admin-field">
            <label>Chave PIX:</label>
            <input type="text" onchange="window.adminOrdenandos[\${index}].pixChave = this.value" value="\${ord.pixChave || ''}" placeholder="Ex: CPF, E-mail ou Telefone" />
          </div>
          <div class="admin-field">
            <label>QR Code PIX (Imagem):</label>
            <input type="text" id="admin_ord_pixQrCode_\${index}" onchange="window.adminOrdenandos[\${index}].pixQrCode = this.value" value="\${ord.pixQrCode || ''}" placeholder="URL da imagem ou upload abaixo" />
            <input type="file" accept="image/*" onchange="handleDynamicImageUpload(event, \${index}, 'pixQrCode')" style="margin-top: 8px; font-size: 0.9rem;" />
          </div>
          <div class="admin-field">
            <label>História / Caminhada:</label>
            <textarea onchange="window.adminOrdenandos[\${index}].historia = this.value" rows="3">`;

if (js.match(regexAdminOrd)) {
    js = js.replace(regexAdminOrd, newAdminOrd);
    fs.writeFileSync('src/app.js', js);
    console.log("Patched renderAdminOrdenandosList.");
} else {
    console.log("Failed to match admin ordinandos list.");
}
