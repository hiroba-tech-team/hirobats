import { doc, getDoc } from "firebase/firestore/lite";
import { db } from "./firebase";



export async function getChannels() {
	const docRef = doc(db, "channels");
	const docSnap = await getDoc(docRef);
	if (docSnap.exists()) {
		console.log("Document data:", docSnap.data());
	} else {
	// doc.data() will be undefined in this case
		console.log("No such document!");
	}
}