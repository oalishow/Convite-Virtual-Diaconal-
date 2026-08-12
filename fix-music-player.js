const fs = require('fs');

let appJs = fs.readFileSync('src/app.js', 'utf8');

// Fix toggleMinimizePlayer and closePlayer to work reliably
appJs = appJs.replace(
  /window\.toggleMinimizePlayer = function toggleMinimizePlayer\(\) \{[\s\S]*?\}\n/,
  `window.toggleMinimizePlayer = function toggleMinimizePlayer() {
      var widget = document.getElementById('sacredMusicWidget');
      if (widget) {
        widget.classList.toggle('minimized');
      }
    }\n`
);

appJs = appJs.replace(
  /window\.closePlayer = function closePlayer\(\) \{[\s\S]*?\}\n/,
  `window.closePlayer = function closePlayer() {
      var widgetWrapper = document.querySelector('.music-player-widget-wrapper');
      if (widgetWrapper) {
        widgetWrapper.style.display = 'none';
        if (isMusicPlaying && typeof toggleSacredMusic === 'function') {
          toggleSacredMusic(); // Pausa a música
        }
      }
    }\n`
);

fs.writeFileSync('src/app.js', appJs);
console.log("Fixed player toggle logic in app.js");

