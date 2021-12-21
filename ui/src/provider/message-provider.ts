import { db } from "../lib/firebase";
import {collection, query, orderBy, getDocs } from 'firebase/firestore'
import Message from "../models/Message"
import {formatDate} from "../util/date-util";



/**
 * Read: チャンネルのリストを取得する
 * @returns channelArr
 */
export async function getMessageList() {

	//最後にstate(Channel)に格納するためのChannel配列を作成
	let messageArr: Message[] = [];

	/**
	 * どのコレクションからどのような条件で取得するかを決める
	 */
		const q = query(collection(db, "message"),orderBy('time','asc'));

	/**
	 * getDocsはコレクションを取得（コレクションはDBで言うテーブルみたいなもの）
	 * getDocはドキュメントを取得（ドキュメントはDBで言う行みたいなもの）
	 */
	const querySnapshot = await getDocs(q);

	/**
	 * 取得したコレクションの中にあるドキュメントをすべてループさせる
	 * channelはドキュメント
	 */
	querySnapshot.forEach((message) => {
		// データが取得できているか確認するときに使用する。
		//console.log(channel.id, " => ", channel.data());
		const newMessage = {} as Message;

		/**
		 * doc.data()は、クエリドキュメントスナップショットに対して未定義になることはない
		 *
		 * つまり channel.data().desc など descではなく全く違う言葉(appleなど)にしてもコード上ではエラーになることはない
		 */
		newMessage.channelId = message.data().channel_id;
		newMessage.text = message.data().text;
		newMessage.time = formatDate(message.data().time.toDate()).toString();
        newMessage.userId = message.data().user_id;

		/**
		 * セットした値を配列に格納する
		 */
		messageArr.push(newMessage);
	});

	return messageArr;
}