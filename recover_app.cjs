const fs = require('fs');
let code = fs.readFileSync('local_app.js', 'utf8');

// Remove sourcemap
code = code.replace(/\/\/# sourceMappingURL=.*$/, '');

// Fix import
code = code.replace('import { registerSW } from "/@vite-plugin-pwa/virtual:pwa-register";', "import { registerSW } from 'virtual:pwa-register';");

fs.writeFileSync('src/app.js', code);
