const fs = require('fs');
let js = fs.readFileSync('src/app.js', 'utf8');

const regexAddOrd = /paroquiaNome: "",\s*paroquiaLogo: "",\s*historia: ""\s*\}\);/;

const newAddOrd = `paroquiaNome: "",
        paroquiaLogo: "",
        historia: "",
        pixChave: "",
        pixQrCode: ""
      });`;

if (js.match(regexAddOrd)) {
    js = js.replace(regexAddOrd, newAddOrd);
    fs.writeFileSync('src/app.js', js);
    console.log("Patched addAdminOrdenando.");
} else {
    console.log("Failed to match addAdminOrdenando.");
}
