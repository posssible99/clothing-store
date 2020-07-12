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

  //   We get a object with data, but the most important parameter is user id(uid),documentQuery.
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  // A snapshShot is a object that conatins data of a doc or a collection, inside snapShot is the parameter exists
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

// This function helps us store collections in firestore.
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);
  // Watch let us make mutlipke requests, but if one fail, it cancel all the requests.
  const batch = firestore.batch();
  objectsToAdd.forEach((obj) => {
    // We call to create a new object, in this object we have an id, that firebase gives us.
    const newDocRef = collectionRef.doc();
    // This will add to our database each collection(hats,jackets,etc) of our array.
    batch.set(newDocRef, obj);
  });
  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = (collections) => {
  // The collectios.docs will return us an array with the collections(jackets,hats,etc), but it is only a reference, to obtain the data
  // we need to call doc.data
  const transformedCollection = collections.docs.map((doc) => {
    const { title, items } = doc.data();
    console.log(title);
    // We need to give the form to the object that we want.
    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });
  // This will gives us the final object that we want, just as shop.data.js, with the keys hat,jackets,etc.
  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

firebase.initializeApp(config);

// To activate google sign up
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
