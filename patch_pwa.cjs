const fs = require('fs');
let js = fs.readFileSync('src/app.js', 'utf8');

if (!js.includes('virtual:pwa-register')) {
    js = `import { registerSW } from 'virtual:pwa-register';\n\nregisterSW({ immediate: true });\n\n` + js;
    fs.writeFileSync('src/app.js', js);
    console.log("PWA registration added to app.js.");
} else {
    console.log("PWA registration already exists.");
}
