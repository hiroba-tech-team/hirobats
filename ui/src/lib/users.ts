import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

//Get a list of cities from your database
export async function getUsers() {
    const usersCol = collection(db, 'users');
    const userSnapshot = await getDocs(usersCol);
    const userList = userSnapshot.docs.map(doc => doc.data());
    console.log(userList);
    return userList;
}