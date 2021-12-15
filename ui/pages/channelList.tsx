import { db } from "../src/lib/firebase";
import React, { useState, useEffect } from 'react';
import {collection, query, orderBy, onSnapshot, getDocs } from 'firebase/firestore'

// 変数channel の型
interface Channel {
    id: number;
    name: string;
    desc: string;
  }

async function channelList() {

	const [channels, setChannels] = useState<Channel[]>([]);


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
		setChannels(channelArr);
	});

	return (
		<div>
			aaaa
		</div>
	);
} export default channelList;