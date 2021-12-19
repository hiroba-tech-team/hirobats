export function formatDate(date: Date){
	let formatted_date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDay() + " " + date.getHours() + ":" + date.getMinutes();
	return formatted_date;
}