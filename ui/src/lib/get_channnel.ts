import { doc, getDoc,FirestoreDataConverter,DocumentData,QueryDocumentSnapshot,SnapshotOptions } from "firebase/firestore";

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
	const ref = doc(db, "channels","sample").withConverter(channelConverter);
	const docSnap = await getDoc(ref);
	if (docSnap.exists()) {
		// Convert to City object
		const city = docSnap.data();
		// Use a City instance method
		console.log(city.toString());
	} else {
		console.log("No such document!");
	}
}
