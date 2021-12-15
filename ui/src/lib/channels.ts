// import { db } from "./firebase";
// import {collection,query, orderBy,onSnapshot } from "firebase/firestore";

// // 変数channel の型
// interface Channel {
//     id: number;
//     name: string;
//     desc: string;
//   }

// //Get a list of cities from your database
// function getChannel(){
//     let channelArr: Channel[] = []

//     const q = query(collection(db, "channels"),orderBy('id','asc'));
//     onSnapshot(q, (snapshot) => {
    
//       snapshot.docChanges().forEach((channel) => {
//         if (channel.type === 'added') {
//           console.log('added: ', channel.doc.data())
//           channelArr.push({
//             id: channel.doc.get('id'),
//             name: channel.doc.data().name,
//             desc: channel.doc.data().desc,
//           })
//           console.log(channelArr);
//         }
// 	    });
      
//     });
//     setChannels(channelArr);
//   }
