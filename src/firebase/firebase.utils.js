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

// Store our user in the database
// Take care of the users that uses google and the others that don't
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return; //We expect a null.

  //   We get a object with data, but the most important parameter is exists.(this is a document reference)
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  // A snapshShot is a object that conatins data of a doc of a collection
  const snapShot = await userRef.get();
  if (!snapShot.exists) {
    //   The user doesn't exist, so we need some info to create our user.
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      // We use await because it's asynchronus, we need to wait the database.
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.messsage);
    }
  }
  //   We return userRef beacuse we maybe use it again
  return userRef;
};

firebase.initializeApp(config);

// To activate google sign up
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
