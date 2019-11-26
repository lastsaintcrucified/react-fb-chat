import firebase from "firebase/app";
import "firebase/auth";
import "firebase/datebase";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyCVxR8C34uN5COr8-xZG_izHfzOBBiN0Yg",
  authDomain: "react-fb-chat.firebaseapp.com",
  databaseURL: "https://react-fb-chat.firebaseio.com",
  projectId: "react-fb-chat",
  storageBucket: "react-fb-chat.appspot.com",
  messagingSenderId: "428187510440",
  appId: "1:428187510440:web:3d24e1cdc6bd814f05449d",
  measurementId: "G-CWYF3RJYBZ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;
