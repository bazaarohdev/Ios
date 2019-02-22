import firebase from "firebase";

class Fire {
  uid = "";
  productid='';
  sellerid='';
  userloginid='';
  productname='';
  api_uid='';
  api_sid='';
 
 // you need to pass this product id on which the chat is going on
  messagesRef = null;
  // initialize Firebase Backend
  constructor() {
    this.state={
      msg:''
    }
    firebase.initializeApp({
    
    });
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setUid(user.uid);
       // this.setProductId(user.productid);
      } else {
        firebase 
          .auth()
          .signInAnonymously()
          .catch(error => { 
            alert(error.message);
          });
      }
    });
  }
  setProductId(value){
    this.productid = value;
  }
  getProductId()
  {
    return this.productid;
  }


  setProductName(value){
    this.productname = value;
  }
  getProductName()
  {
    return this.productname;
  }

   setProductApiUiD(value){
    this.api_uid = value;
    }
    getProductApiUiD()
    {
    return this.api_uid;
    }
    
    setProductApiSiD(value){
    this.api_sid = value;
    }
    getProductApiSiD()
    {
    return this.api_sid;
    }


  setProductSellerId(value){
    this.sellerid = value;
  }
  getProductSellerId()
  {
    return this.sellerid;
  }



  setLoginuserId(value){
    this.userloginid = value;
  }
  getLoginuserId()
  {
    return this.userloginid;
  }


  setUid(value) {
    this.uid = value;
  }   
  getUid() {
    return this.uid;
  }
  // retrieve the messages from the Backend
  loadMessages(callback) {
    var chatinstance =  (this.productid+"-"+this.sellerid+"-"+this.userloginid);
    console.log("=========productid++++"+ this.productid); 
    console.log("=========sellerid++"+ this.sellerid); 
    console.log("=========userloginid++"+ this.userloginid); 
    console.log("=========productname++"+ this.productname); 
    //console.log("=========productid"+ message.user.productid)
   // this.messagesRef = firebase.database().ref("messages").orderByChild("chatinstance").equalTo(chatinstance);
   console.log("CCCCCCCCchatInst = " + chatinstance );
   this.messagesRef = firebase.database().ref("messages").orderByChild("productid").equalTo(this.productid);

    // this.messagesRef = firebase.database().ref("messages").equalTo(this.productid);// while fetching you need to pass the product 
    this.messagesRef .off(); //Detaches a callback previously attached with on()
    const onReceive = data => {
      console.log("ON-Receive Called --- 1")
      const message = data.val(); 
      callback({  
       // _id: data.key,
        _id: data.key,
        text: message.text,

        createdAt: new Date(message.createdAt),
        //createdAt: message.createdAt,
        user: {
        //_id: message.user._id,
       // chatinstance:chatinstance,
         _id: message.user._id,
          name: message.user.name,
            
        }
      });
      console.log("SELLER _____"+ JSON.stringify(data.message));
    };

    var d = this.getLimit();
    console.log(d);
    //Generates a new Query object limited to the last specific number of children.
    //this.messagesRef.limitToLast(10).on("child_added", onReceive);
    firebase.database().ref("messages")
    .orderByChild("chatinstance").equalTo(chatinstance)
      //.orderByChild("createdAt")
      //.startAt(d)
      //.endAt("2017-11-27T06:51:47.851Z")
      .on("child_added", onReceive);
  }
  // send the message to the Backend
  sendMessage(message) {
    //console.log(new Date(firebase.database.ServerValue.TIMESTAMP));
    var today = new Date();
    var text1="";
    var chatinstance =  (this.productid+"-"+this.sellerid+"-"+this.userloginid);
    /* today.setDate(today.getDate() - 30);
    var timestamp = new Date(today).toISOString(); */
    var timestamp = today.toISOString();
    for (let i = 0; i < message.length; i++) {
      console.log("pid---"+this.productid);
      console.log("uid---"+this.userloginid);
      console.log("sid---"+this.sellerid);
      console.log("text---"+message[i].text);
      console.log("ts--"+timestamp);
     // text1 = message[i].text;
      firebase.database().ref("messages").push({
        text: message[i].text,
        user: message[i].user,
        productid: this.productid,
        userloginid: this.userloginid,
        sellerid: this.sellerid,
        chatinstance:chatinstance,
        productname:this.productname,
        createdAt: timestamp,
        
      }
      
      );
      

      this.meassagechat(message[i].text);
      /*this.messagesRef.push({
        text: message[i].text,  
        user: message[i].user,
        productid: this.productid,
        createdAt: timestamp
      });*/
    }
  }
  // close the connection to the Backend
  closeChat() {
    if (this.messagesRef ) {
      this.messagesRef.off();
    }
  }

  getLimit() {
    var today = new Date();
    //var milliseconds = Date.parse(today);
    //var changed = milliseconds - 86400000; //10 minutes (- 900000) -  86400000 1 day
    today.setDate(today.getDate() - 31); // last 30 Days
    //console.log(today);
    var changedISODate = new Date(today).toISOString();
    //var changedISODate = today.toISOString();
    console.log(changedISODate);
    return changedISODate;
  }
meassagechat(text)
{
 // const { navigate } = this.props.navigation;
  console.log("=======userloginid============",this.api_uid)
  console.log("=======userloginid============",this.userloginid)
console.log("=======text============"+text )
  console.log("=======productid============",this.productid)
  console.log("=======this.sellerid============",this.sellerid)
  console.log("=======this.sellerid============",this.api_sid)

  let options = {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    method: 'POST'
  };

    var param1 = {
   // useremail:this.state.useremail,
 
   user_id:this.api_uid,
   message:text,
   product_id:this.productid,
   seller_id:this.api_sid
};

options.body = new FormData();

for (var k in param1) {
    options.body.append(k, param1[k]);
}

var passUrl = "https://seoteam.website/api/api.php?method=message";
console.log("======passurl============="+ passUrl);
return fetch(passUrl, options)
.then(response => {
  return response.json()
    .then(responseJson => {
// .then((response) =>(response.json())) 
// .then((responseJson) =>{

})
})
.catch((err) => { console.log("==========error==========" + err); })

}

}

export default new Fire();






































// import firebase from "firebase";

// class Fire {
//   uid = "";
//   productid='';
//   sellerid='';
//   userloginid='';
//  // you need to pass this product id on which the chat is going on
//   messagesRef = null;
//   // initialize Firebase Backend
//   constructor() {
//     firebase.initializeApp({
//         apiKey: 'AIzaSyCTDIDo7cfj14lsxcLQOcc-EWIJKhYQGiw',
//               authDomain: 'bazaaroh-f427e.firebaseapp.com',
//              databaseURL: 'https://bazaaroh-f427e.firebaseio.com',
//              projectId: 'bazaaroh-f427e',
//             storageBucket: 'bazaaroh-f427e.appspot.com',
//             messagingSenderId: '803787365139',
//     });
//     firebase.auth().onAuthStateChanged(user => {
//       if (user) {
//         this.setUid(user.uid);
//        // this.setProductId(user.productid);
//       } else {
//         firebase 
//           .auth()
//           .signInAnonymously()
//           .catch(error => { 
//             alert(error.message);
//           });
//       }
//     });
//   }
//   setProductId(value){
//     this.productid = value;
//   }
//   getProductId()
//   {
//     return this.productid;
//   }


//   setProductSellerId(value){
//     this.sellerid = value;
//   }
//   getProductSellerId()
//   {
//     return this.sellerid;
//   }



//   setLoginuserId(value){
//     this.userloginid = value;
//   }
//   getLoginuserId()
//   {
//     return this.userloginid;
//   }




//   setUid(value) {
//     this.uid = value;
//   }   
//   getUid() {
//     return this.uid;
//   }
//   // retrieve the messages from the Backend
//   loadMessages(callback) {
//     var chatinstance =  (this.productid+"-"+this.sellerid+"-"+this.userloginid);
//       console.log("=========productid++++"+ this.productid); 
//     console.log("=========sellerid++"+ this.sellerid); 
//     console.log("=========userloginid++"+ this.userloginid); 
//     //console.log("=========productid"+ message.user.productid)
//     this.messagesRef = firebase.database().ref("messages").orderByChild("chatinstance").equalTo(chatinstance);
//     // this.messagesRef = firebase.database().ref("messages").equalTo(this.productid);// while fetching you need to pass the product 
//     this.messagesRef .off(); //Detaches a callback previously attached with on()
//     const onReceive = data => {
//       const message = data.val(); 
//       callback({    
//        // _id: data.key,
//         _id: data.key,
//         text: message.text,

//         //createdAt: new Date(message.createdAt),
//         createdAt: message.createdAt,
//         user: {
//         //_id: message.user._id,
//          _id: this.productid,
//           name: message.user.name,
          
//         }
//       });
//     };

//     var d = this.getLimit();
//     console.log(d);
//     //Generates a new Query object limited to the last specific number of children.
//     //this.messagesRef.limitToLast(10).on("child_added", onReceive);
//     firebase.database().ref("messages")
//     .orderByChild("chatinstance").equalTo(chatinstance)
//       //.orderByChild("createdAt")
//       //.startAt(d)
//       //.endAt("2017-11-27T06:51:47.851Z")
//       .on("child_added", onReceive);
//   }
//   // send the message to the Backend
//   sendMessage(message) {
//     //console.log(new Date(firebase.database.ServerValue.TIMESTAMP));
//     var today = new Date();
//     var chatinstance =  (this.productid+"-"+this.sellerid+"-"+this.userloginid);
//     /* today.setDate(today.getDate() - 30);
//     var timestamp = new Date(today).toISOString(); */
//     var timestamp = today.toISOString();
//     for (let i = 0; i < message.length; i++) {
//       console.log("pid---"+this.productid);
//       console.log("uid---"+this.userloginid);
//       console.log("sid---"+this.sellerid);
//       console.log("text---"+message[i].text);
//       console.log("ts--"+timestamp);
//       firebase.database().ref("messages").push({
//         text: message[i].text,
//         user: message[i].user,
//         productid: this.productid,
//         userloginid: this.userloginid,
//         sellerid: this.sellerid,
//         chatinstance:chatinstance,
//         createdAt: timestamp
//       });
//       /*this.messagesRef.push({
//         text: message[i].text,  
//         user: message[i].user,
//         productid: this.productid,
//         createdAt: timestamp
//       });*/
//     }
//   }
//   // close the connection to the Backend
//   closeChat() {
//     if (this.messagesRef ) {
//       this.messagesRef.off();
//     }
//   }

//   getLimit() {
//     var today = new Date();
//     //var milliseconds = Date.parse(today);
//     //var changed = milliseconds - 86400000; //10 minutes (- 900000) -  86400000 1 day
//     today.setDate(today.getDate() - 31); // last 30 Days
//     //console.log(today);
//     var changedISODate = new Date(today).toISOString();
//     //var changedISODate = today.toISOString();
//     console.log(changedISODate);
//     return changedISODate;
//   }
// }

// export default new Fire();











//=========================================================



















// import firebase from "firebase";

// class Fire {
//   uid = "";
//   productid='';// you need to pass this product id on which the chat is going on
//   messagesRef = null;
//   // initialize Firebase Backend
//   constructor() {
//     firebase.initializeApp({
//         apiKey: 'AIzaSyCTDIDo7cfj14lsxcLQOcc-EWIJKhYQGiw',
//               authDomain: 'bazaaroh-f427e.firebaseapp.com',
//              databaseURL: 'https://bazaaroh-f427e.firebaseio.com',
//              projectId: 'bazaaroh-f427e',
//             storageBucket: 'bazaaroh-f427e.appspot.com',
//             messagingSenderId: '803787365139',
//     });
//     firebase.auth().onAuthStateChanged(user => {
//       if (user) {
//         this.setUid(user.uid);
//        // this.setProductId(user.productid);
//       } else {
//         firebase 
//           .auth()
//           .signInAnonymously()
//           .catch(error => {
//             alert(error.message);
//           });
//       }
//     });
//   }
//   setProductId(value){
//     this.productid = value;
//   }
//   getProductId()
//   {
//     return this.productid;
//   }
//   setUid(value) {
//     this.uid = value;
//   }
//   getUid() {
//     return this.uid;
//   }
//   // retrieve the messages from the Backend
//   loadMessages(callback) {
//     console.log("=========productid"+ this.productid); 
//     //console.log("=========productid"+ message.user.productid)
//     this.messagesRef = firebase.database().ref("messages").equalTo(this.productid);// while fetching you need to pass the product 
//     this.messagesRef.off(); //Detaches a callback previously attached with on()
//     const onReceive = data => {
//       const message = data.val();
//       callback({
//         _id: data.key,
//         text: message.text,

//         //createdAt: new Date(message.createdAt),
//         createdAt: message.createdAt,
//         user: {
//         //_id: message.user._id,
//          _id: this.productid,
//           name: message.user.name,
          
//         }
//       });
//     };

//     var d = this.getLimit();
//     console.log(d);
//     //Generates a new Query object limited to the last specific number of children.
//     //this.messagesRef.limitToLast(10).on("child_added", onReceive);
//     this.messagesRef
//       .orderByChild("createdAt")
//       //.startAt(d)
//       //.endAt("2017-11-27T06:51:47.851Z")
//       .on("child_added", onReceive);
//   }
//   // send the message to the Backend
//   sendMessage(message) {
//     //console.log(new Date(firebase.database.ServerValue.TIMESTAMP));
//     var today = new Date();
//     /* today.setDate(today.getDate() - 30);
//     var timestamp = new Date(today).toISOString(); */
//     var timestamp = today.toISOString();
//     for (let i = 0; i < message.length; i++) {
//       console.log("pid---"+this.productid);
//       console.log("text---"+message[i].text);
//       console.log("ts--"+timestamp);
//       firebase.database().ref("messages").push({
//         text: message[i].text,
//         user: message[i].user,
//         productid: this.productid,
//         createdAt: timestamp
//       });
//       /*this.messagesRef.push({
//         text: message[i].text,
//         user: message[i].user,
//         productid: this.productid,
//         createdAt: timestamp
//       });*/
//     }
//   }
//   // close the connection to the Backend
//   closeChat() {
//     if (this.messagesRef) {
//       this.messagesRef.off();
//     }
//   }

//   getLimit() {
//     var today = new Date();
//     //var milliseconds = Date.parse(today);
//     //var changed = milliseconds - 86400000; //10 minutes (- 900000) -  86400000 1 day
//     today.setDate(today.getDate() - 31); // last 30 Days
//     //console.log(today);
//     var changedISODate = new Date(today).toISOString();
//     //var changedISODate = today.toISOString();
//     console.log(changedISODate);
//     return changedISODate;
//   }
// }

// export default new Fire();




// import firebase from 'firebase'; 
// class Fire {
//   constructor() {
//     this.init();

//        // 1.
//        this.observeAuth();
//     }
//     // 2.
//     observeAuth = () =>
//       firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
//     // 3.
//     onAuthStateChanged = user => {
//       if (!user) {
//         try {
//           // 4.
//           firebase.auth().signInAnonymously();
//         } catch ({ message }) {
//           alert(message);
//         }
//       }  
//     };
//     get ref() {
//         return firebase.database().ref('messages');
//       }
//       // 2.
//       on = callback =>
//           this.ref
//             .limitToLast(20)
//             .on('child_added', snapshot => callback(this.parse(snapshot)));
//       // 3.
//       parse = snapshot => {
//       }
//       // 4.
//       off() {
//         this.ref.off();
//       }
//       parse = snapshot => {
//         // 1.
//         const { timestamp: numberStamp, text, user } = snapshot.val();
//         const { key: _id } = snapshot;
//         // 2.
//         const timestamp = new Date(numberStamp);
//         // 3.
//         const message = {
//           _id,
//           timestamp,
//dd//           user,
//         };
//        return message;
//       };

//       get uid() {
//         return (firebase.auth().currentUser || {}).uid;
//       }
//       // 2.
//       get timestamp() {
//         return firebase.database.ServerValue.TIMESTAMP;
//       }
      
//       // 3.
//       send = messages => {
//         for (let i = 0; i < messages.length; i++) {
//           const { text, user } = messages[i];
//           // 4.
//           const message = {
//             text,
//             user,
//             timestamp: this.timestamp,
//           };
//           this.append(message);
//         }
//       };
//       // 5.
//       append = message => this.ref.push(message);
//   // 2.
//   init = () =>
//     firebase.initializeApp({
//       apiKey: 'AIzaSyCTDIDo7cfj14lsxcLQOcc-EWIJKhYQGiw',
//       authDomain: 'bazaaroh-f427e.firebaseapp.com',
//       databaseURL: 'https://bazaaroh-f427e.firebaseio.com',
//       projectId: 'bazaaroh-f427e',
//       storageBucket: '',
//       messagingSenderId: '803787365139',
//     });

// }
