import firebase from 'firebase/compat/app'
import {getAuth} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";

const firebaseConfig = process.env.REACT_APP_FIREBASE_API


 const firebaseApp= firebase.initializeApp(firebaseConfig)
 export const auth=getAuth(firebaseApp)
 export const db=getFirestore(firebaseApp)