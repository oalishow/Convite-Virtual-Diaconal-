const { initializeApp } = require('firebase/app');
const { getFirestore, doc, getDoc } = require('firebase/firestore');
const fs = require('fs');

const firebaseConfig = JSON.parse(fs.readFileSync('firebase-applet-config.json', 'utf8'));
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

(async () => {
  const ref = doc(db, 'config', 'geral');
  const snap = await getDoc(ref);
  const data = snap.data();
  if (data && data.ordenandos) {
     data.ordenandos.forEach(o => {
       console.log("Ord:", o.nome, "QR length:", o.pixQrCode ? o.pixQrCode.length : 'none', typeof o.pixQrCode);
     });
  } else {
     console.log("No ordenandos array");
     console.log("Alison QR:", data.pixQrCode ? data.pixQrCode.length : 'none');
  }
  process.exit(0);
})();
