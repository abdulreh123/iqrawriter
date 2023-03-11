import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore'
const firebaseConfig ={
    apiKey: "AIzaSyAqvo_FTncgsVX5Co9Z0kS2Nr3hXWRSz60",
  authDomain: "iqrawriter-a34b7.firebaseapp.com",
  projectId: "iqrawriter-a34b7",
  storageBucket: "iqrawriter-a34b7.appspot.com",
  messagingSenderId: "994507347259",
  appId: "1:994507347259:web:aace959f070f6223e2531e",
  measurementId: "G-P102X7PTKV"
  };


 const app =initializeApp(firebaseConfig);
export const db = getFirestore(app)
