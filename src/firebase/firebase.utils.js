import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBE2Z-VQbGhuB_JqGCowLiqTRa8A_6PoeY",
  authDomain: "crwn-db-ed495.firebaseapp.com",
  databaseURL: "https://crwn-db-ed495.firebaseio.com",
  projectId: "crwn-db-ed495",
  storageBucket: "crwn-db-ed495.appspot.com",
  messagingSenderId: "1098312790854",
  appId: "1:1098312790854:web:eef1d36552ac79d96c6b47",
  measurementId: "G-B77Q58GZT9",
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
