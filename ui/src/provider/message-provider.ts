import { db } from "../lib/firebase";
import {collection,addDoc, query, orderBy, getDocs, Timestamp, onSnapshot } from 'firebase/firestore'
import Message from "../models/Message"
import {formatDateTime} from "../util/date-util";

/**
 * Read: メッセージを取得
 */
export async function getMessage(){

}

/**
 * Read: メッセージのリストを取得する
 */
export async function getMessageList(
	setMessage: React.Dispatch<React.SetStateAction<Message[]>>
) {

	/**
	 * どのコレクションからどのような条件で取得するかを決める
	 */
	const docsQuery = query(collection(db, "message"),orderBy('time','asc'));

	/**
	 * getDocsはコレクションを取得（コレクションはDBで言うテーブルみたいなもの）
	 * getDocはドキュメントを取得（ドキュメントはDBで言う行みたいなもの）
	 */
	//const querySnapshot = await getDocs(q);

	onSnapshot(docsQuery,(querySnapshot) =>{

		//最後にstate(Message)に格納するためのChannel配列を作成
		let messageArr: Message[] = [];

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
			newMessage.time = formatDateTime(message.data().time.toDate()).toString();
			newMessage.userId = message.data().user_id;
			/**
			 * セットした値を配列に格納する
			 */
			messageArr.push(newMessage);

		});

		setMessage(messageArr);
	});
}

/**
 * Create: メッセージを登録する
 * @param message ユーザが入力したテキスト
 */
export async function addMessage(message: Message) {
	const docRef = await addDoc(collection(db, "message"), {
		channel_id: message.channelId,
		text: message.text,
		user_id: message.userId,
		time: Timestamp.fromDate(new Date()),
	});
	//console.log("Document written with ID: ", docRef.id);
}

/**
 * Delete: メッセージを削除する
 */
export async function deleteMessage(){

}

