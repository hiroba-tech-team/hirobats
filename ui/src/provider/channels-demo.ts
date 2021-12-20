import { db } from "../lib/firebase";
import {collection,query, where,onSnapshot } from "firebase/firestore";
import Channel from "../models/Channel"

//Get a list of cities from your database
export function getChannelsV2(
    uid: number[],
		setChannel: React.Dispatch<React.SetStateAction<Channel[]>>
  ) {
    const docsQuery = query(
      collection(db, "channels"),
      where("id","in",uid)
    );

    onSnapshot(docsQuery, (querySnapshot) => {

			const channels: Channel[] = [];

      querySnapshot.forEach((doc) => {
        const newChannel = doc.data() as Channel;

        newChannel.id = doc.data().id;
        newChannel.name = doc.data().name;
        newChannel.desc = doc.data().desc;

				//console.log(newChannel);

        channels.push(newChannel);
      });

      setChannel(channels);
    });
  }
