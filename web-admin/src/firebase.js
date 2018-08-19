import firebase from 'firebase';
import 'firebase/firestore';

var config = {
  apiKey: "AIzaSyBj4CtHNbtBbBM5xmnusHlzl2lKVpWoz0k",
  authDomain: "mobil-tangki-checklist.firebaseapp.com",
  databaseURL: "https://mobil-tangki-checklist.firebaseio.com",
  projectId: "mobil-tangki-checklist",
  storageBucket: "mobil-tangki-checklist.appspot.com",
  messagingSenderId: "293955899304"
};

firebase.initializeApp(config);
export const passportals = firebase.firestore().collection('passportals');
export const users = firebase.firestore().collection('users');