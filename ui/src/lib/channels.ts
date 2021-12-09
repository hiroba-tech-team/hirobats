import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore/lite";

//Get a list of cities from your database
export async function getChannels() {
    const channelsCol = collection(db, 'channels');
    const channelSnapshot = await getDocs(channelsCol);
    const channelList = channelSnapshot.docs.map(doc => doc.data());
    console.log(channelList);
    return channelList;
}
