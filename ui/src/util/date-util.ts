/**
 * フォーマットをする
 * @param date フォーマットしたい日付
 * @param format 書式フォーマット
 * @returns フォーマットされた日付
 */
function format(date: Date, format: string): string{
	format = format.replace(/yyyy/g, (date.getFullYear()).toString());
	format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2));
	format = format.replace(/dd/g, ('0' + date.getDate()).slice(-2));
	format = format.replace(/HH/g, ('0' + date.getHours()).slice(-2));
	format = format.replace(/mm/g, ('0' + date.getMinutes()).slice(-2));
	format = format.replace(/ss/g, ('0' + date.getSeconds()).slice(-2));
	format = format.replace(/SSS/g, ('00' + date.getMilliseconds()).slice(-3));
	return format;
};

/**
 * 渡された日付と時間をフォーマットする
 * @param dateTime 日付と時間
 * @returns フォーマット後の日付と時間
 */
export function formatDateTime(dateTime: Date): string{
	let formatted_date = format(dateTime,'yyyy-MM-dd HH:mm:ss');
	return formatted_date;
}

/**
 * 渡された日付をフォーマットする
 * @param date 日付
 * @returns フォーマット後の日付
 */
export function formatDate(date: Date): string{
	let formatted_date = format(date,'yyyy-MM-dd');
	return formatted_date;
}

/**
 * 渡された時間をフォーマットする
 * @param time 時間
 * @returns フォーマット後の時間
 */
export function formatTime(time: Date): string{
	let formatted_date = format(time,'HH:mm:ss');
	return formatted_date;
}