const fs = require('fs');
let css = fs.readFileSync('src/style.css', 'utf8');

const regexMobilePlayer = /@media \(max-width: 520px\) \{\s*\.music-player-widget-wrapper \{[\s\S]*?\}\s*\.music-album-art \{[\s\S]*?\}\s*\}/;

const newMobilePlayer = `@media (max-width: 520px) {
      .music-player-widget-wrapper {
        left: 0;
        right: 0;
        margin: 0 auto;
        transform: none;
        width: calc(100% - 1rem);
        max-width: 380px;
        bottom: max(3.5rem, calc(2.5rem + env(safe-area-inset-bottom)));
        z-index: 10000;
      }
      .music-player-widget {
        padding: 0.6rem 0.75rem;
        gap: 0.5rem;
        width: 100%;
      }
      .btn-music-action {
        width: 38px;
        height: 38px;
      }
      .btn-music-action svg {
        width: 18px;
        height: 18px;
      }
      .btn-music-icon-only {
        width: 34px;
        height: 34px;
      }
      .btn-music-icon-only svg {
        width: 18px;
        height: 18px;
      }
      .music-controls-group {
        gap: 0.2rem;
      }
      .music-info-group {
        flex: 1;
        min-width: 0;
        overflow: hidden;
      }
      .music-title-text, .music-subtitle-text {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .music-album-art {
        width: 38px;
        height: 38px;
      }
    }`;

if (css.match(regexMobilePlayer)) {
    css = css.replace(regexMobilePlayer, newMobilePlayer);
    fs.writeFileSync('src/style.css', css);
    console.log("Patched mobile music player CSS.");
} else {
    console.log("Failed to match mobile music player CSS.");
}
