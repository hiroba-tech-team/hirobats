import { db } from "./firebase";
import {collection, query, orderBy, onSnapshot, getDocs } from 'firebase/firestore'

// 変数channel の型
interface Channel {
    id: number;
    name: string;
    desc: string;
  }

export async function channelList() {

	let channelArr: Channel[] = []

	const querySnapshot = await getDocs(
		query(collection(db, "channels"),orderBy('id','asc'))
	);

	querySnapshot.forEach((channel) => {
		// doc.data() is never undefined for query doc snapshots
		console.log(channel.id, " => ", channel.data());
		channelArr.push({
			id: channel.data().id,
			name: channel.data().name,
			desc: channel.data().desc
		})
		return channelArr;
	});
}