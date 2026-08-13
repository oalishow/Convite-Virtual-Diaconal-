import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import fs from 'fs';

const configStr = fs.readFileSync('firebase-applet-config.json', 'utf8');
const config = JSON.parse(configStr);

const app = initializeApp(config);
const db = getFirestore(app, config.firestoreDatabaseId);

async function readDb() {
  try {
    const docRef = doc(db, 'siteContent', 'main');
    const docSnap = await getDoc(docRef);
    console.log(JSON.stringify(docSnap.data(), null, 2));
    process.exit(0);
  } catch (err) {
    console.error("Error reading db:", err);
    process.exit(1);
  }
}

readDb();
