import { doc, getDoc,FirestoreDataConverter,DocumentData,QueryDocumentSnapshot,SnapshotOptions,getDocs,collection,query, orderBy } from "firebase/firestore";

import { db } from "./firebase";


interface ChannelInterFace {
	id: number;
	name: string;
	desc: string;
}

class Channel implements ChannelInterFace {
	id: number;
	name: string;
	desc: string;

	constructor (id: number, name: string, desc: string ) {
			this.id = id;
			this.name = name;
			this.desc = desc;
	}
	toString() {
			return this.id + ', ' + this.name + ', ' + this.desc;
	}
}

const channelConverter = {
  toFirestore(channel: Channel): DocumentData {
    return {id: channel.id, name: channel.name, desc: channel.desc};
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Channel {
    const data = snapshot.data(options)!;
    return new Channel(data.id, data.name, data.desc);
  }
}

export async function getChannels(){
	// const ref = doc(db, "channels","sample").withConverter(channelConverter);
	// const docSnap = await getDoc(ref);
	// if (docSnap.exists()) {
	// 	// Convert to City object
	// 	const city = docSnap.data();
	// 	// Use a City instance method
	// 	console.log(city.toString());
	// } else {
	// 	console.log("No such document!");
	// }
	const querySnapshot = await getDocs(
		query(collection(db, "channels"),orderBy('id','asc'))
	);

	//const channelsData = querySnapshot.docs.map((doc) => ({Channel: doc.data(), id: doc.id}))
	const channelsData = querySnapshot.docs.map((channel) => ({data: channel.data() ,id: channel.id}));

	console.log(channelsData);

	querySnapshot.forEach((doc: { id: any; data: () => any; }) => {
		// doc.data() is never undefined for query doc snapshots
		console.log(doc.id, " => ", doc.data());
		//このForEachをindexのほうに突っ込んでさらに配列にaddする
	});

	return channelsData;
}
