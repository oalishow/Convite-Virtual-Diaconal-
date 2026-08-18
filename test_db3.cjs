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
  console.log("Alison QR:", data.ordenandos[0].pixQrCode ? "exists" : "missing");
  console.log("Joao QR:", data.ordenandos[1].pixQrCode ? "exists" : "missing");
  console.log("Global QR:", data.pixQrCode ? "exists" : "missing");
  process.exit(0);
})();
