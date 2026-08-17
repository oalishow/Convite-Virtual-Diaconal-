const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const regexAdminPlaylist = /<div class="admin-field" style="margin-top: 1rem; border-top: 1px dashed var\(--gold-border\); padding-top: 1rem;">\s*<label for="inputUrlPlaylistYoutube">Link da Playlist Oficial \(Suno \/ YouTube\):<\/label>\s*<input type="text" id="inputUrlPlaylistYoutube" placeholder="ex: nTdhx9Zz04U\?list=PLUK8yrBE-TeU" \/>\s*<div style="font-size: 0\.8rem; color: var\(--text-muted\); margin-top: 4px;">Insira um link do YouTube \(vídeo ou playlist\) ou Suno\.<\/div>\s*<\/div>/;

const newAdminPlaylist = `<div class="admin-field" style="margin-top: 1rem; border-top: 1px dashed var(--gold-border); padding-top: 1rem;">
                  <label for="inputUrlPlaylistYoutube">Música de Fundo (Suno / YouTube):</label>
                  <input type="text" id="inputUrlPlaylistYoutube" placeholder="ex: nTdhx9Zz04U?list=PLUK8yrBE-TeU" />
                  <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 4px; margin-bottom: 12px;">Link para a música ambiente que toca ao abrir o site.</div>

                  <label for="inputUrlPlaylistOrdenacao">Botão da Playlist Oficial (Link Externo):</label>
                  <input type="text" id="inputUrlPlaylistOrdenacao" placeholder="ex: https://open.spotify.com/playlist/..." />
                  <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 4px;">Link para a playlist que os convidados acessarão pelo botão na seção Informações.</div>
                </div>`;

if (html.match(regexAdminPlaylist)) {
    html = html.replace(regexAdminPlaylist, newAdminPlaylist);
    fs.writeFileSync('index.html', html);
    console.log("Patched index.html with playlist input.");
} else {
    console.log("Failed to match admin playlist regex in index.html");
}
