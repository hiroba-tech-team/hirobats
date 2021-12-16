import { db } from "./firebase";
import {collection, query, orderBy, onSnapshot, getDocs } from 'firebase/firestore'
import Channel from "../models/Channel"

/**
 * Read: チャンネルのリストを取得する
 * @returns channelArr 
 */
export async function getChannelList() {

	//最後にstate(Channel)に格納するためのChannel配列を作成
	let channelArr: Channel[] = [];

	/**
	 * どのコレクションからどのような条件で取得するかを決める
	 */
		const q = query(collection(db, "channels"),orderBy('id','asc'));

	/**
	 * getDocsはコレクションを取得（コレクションはDBで言うテーブルみたいなもの）
	 * getDocはドキュメントを取得（ドキュメントはDBで言う行みたいなもの）
	 */
	const querySnapshot = await getDocs(q);

	/**
	 * 取得したコレクションの中にあるドキュメントをすべてループさせる
	 * channelはドキュメント
	 */
	querySnapshot.forEach((channel) => {
		
		// データが取得できているか確認するときに使用する。
		//console.log(channel.id, " => ", channel.data());
		const newChannel = channel.data() as Channel;

		/**
		 * doc.data()は、クエリドキュメントスナップショットに対して未定義になることはない
		 * 
		 * つまり channel.data().desc など descではなく全く違う言葉(appleなど)にしてもコード上ではエラーになることはない
		 */
		newChannel.id = channel.data().id;
		newChannel.name = channel.data().name;
		newChannel.desc = channel.data().desc;

		/**
		 * セットした値を配列に格納する
		 */
		channelArr.push(newChannel);
	});

	return channelArr;
}