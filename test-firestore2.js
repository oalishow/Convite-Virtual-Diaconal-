import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDocFromServer } from "firebase/firestore";
import fs from "fs";

const config = JSON.parse(fs.readFileSync("./firebase-applet-config.json", "utf-8"));
const app = initializeApp(config);
const db = getFirestore(app, config.firestoreDatabaseId);

async function test() {
  try {
    await getDocFromServer(doc(db, "siteContent/connection"));
    console.log("Success");
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}
test();
