import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'

var config = {
  apiKey: "AIzaSyBzL_RZg1sAdEk_50W8VOvSq06lY6cOcpg",
  authDomain: "react-slack-clone-795dc.firebaseapp.com",
  databaseURL: "https://react-slack-clone-795dc.firebaseio.com",
  projectId: "react-slack-clone-795dc",
  storageBucket: "react-slack-clone-795dc.appspot.com",
  messagingSenderId: "311668320898"
};

firebase.initializeApp(config);

export default firebase;