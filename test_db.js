import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import fs from "fs";

const configPath = "firebase-applet-config.json";
if (fs.existsSync(configPath)) {
  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  const app = initializeApp(config);
  const db = getFirestore(app, config.firestoreDatabaseId);
  
  async function check() {
    const mainRef = doc(db, "siteContent", "main");
    const mainDoc = await getDoc(mainRef);
    const data = mainDoc.data();
    console.log("Current showInformacoes:", data.showInformacoes);
    
    // Force it to true just in case
    await updateDoc(mainRef, { showInformacoes: true });
    console.log("Forced showInformacoes to true");
    process.exit(0);
  }
  check();
}
