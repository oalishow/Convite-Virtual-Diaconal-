import { initializeApp } from 'firebase/app';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import fs from 'fs';

const configStr = fs.readFileSync('firebase-applet-config.json', 'utf8');
const config = JSON.parse(configStr);

const app = initializeApp(config);
const db = getFirestore(app, config.firestoreDatabaseId);

async function updateDb() {
  try {
    const docRef = doc(db, 'siteContent', 'main');
    await updateDoc(docRef, {
      urlPlaylistYoutube: 'https://suno.com/playlist/7d874679-1ce4-4373-8190-88ea69742e11'
    });
    console.log("Database updated successfully!");
    process.exit(0);
  } catch (err) {
    console.error("Error updating db:", err);
    process.exit(1);
  }
}

updateDb();
