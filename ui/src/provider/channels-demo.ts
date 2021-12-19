import { db } from "../lib/firebase";
import {collection,query, orderBy,onSnapshot } from "firebase/firestore";

/*
  このプログラムはデータが変更されたときに参考にするため残しておきます。
*/


// 変数channel の型
interface Channel {
    id: number;
    name: string;
    desc: string;
  }

//Get a list of cities from your database
export function getTodos(
    uid: string,
    setTodos: React.Dispatch<React.SetStateAction<Channel[]>>
  ) {
    console.log("Getting todos for user: " + uid);
  
    const docsQuery = query(
      collection(db, "users/" + uid + "/todos"),
      orderBy("createdDate")
    );
  
    onSnapshot(docsQuery, (querySnapshot) => {
      const channels: Channel[] = [];
  
      querySnapshot.forEach((doc) => {
        const newChannel = doc.data() as Channel;
        newChannel.id = doc.data().id;
        newChannel.name = doc.data().name;
        newChannel.desc = doc.data().desc;
        channels.push(newChannel);
      });
  
      setTodos(channels);
    });
  
    // .get()
    // .then(function (querySnapshot) {
    //   querySnapshot.forEach(function (doc) {
    //     const newTodo = doc.data() as Todo;
    //     newTodo.id = doc.id;
    //     todos.push(newTodo);
    //   });
  
    //   return todos;
    // })
    // .catch((error) => {
    //   console.error("Error getting todos: " + error);
    //   return [];
    // });
  }
