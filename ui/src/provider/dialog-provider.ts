import { db } from "../lib/firebase";
import {collection, query, orderBy, getDocs } from 'firebase/firestore'
import Dialog from "../models/Dialog"
import {formatDate} from "../util/date-util";



/**
 * Read: チャンネルのリストを取得する
 * @returns channelArr
 */
export async function getDialogList() {

	//最後にstate(Channel)に格納するためのChannel配列を作成
	let dialogArr: Dialog[] = [];

	/**
	 * どのコレクションからどのような条件で取得するかを決める
	 */
		const q = query(collection(db, "dialog"),orderBy('time','asc'));

	/**
	 * getDocsはコレクションを取得（コレクションはDBで言うテーブルみたいなもの）
	 * getDocはドキュメントを取得（ドキュメントはDBで言う行みたいなもの）
	 */
	const querySnapshot = await getDocs(q);

	/**
	 * 取得したコレクションの中にあるドキュメントをすべてループさせる
	 * channelはドキュメント
	 */
	querySnapshot.forEach((dialog) => {
		// データが取得できているか確認するときに使用する。
		//console.log(channel.id, " => ", channel.data());
		const newDialog = dialog.data() as Dialog;

		/**
		 * doc.data()は、クエリドキュメントスナップショットに対して未定義になることはない
		 *
		 * つまり channel.data().desc など descではなく全く違う言葉(appleなど)にしてもコード上ではエラーになることはない
		 */
		newDialog.channelId = dialog.data().channel_id;
		newDialog.message = dialog.data().message;
		newDialog.time = formatDate(dialog.data().time.toDate()).toString();
        newDialog.userId = dialog.data().user_id;

		/**
		 * セットした値を配列に格納する
		 */
		dialogArr.push(newDialog);
	});

	return dialogArr;
}