import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

var appFirebase;

if (!firebase.apps.length) {
  appFirebase = firebase.initializeApp({
    apiKey: "AIzaSyBiQNEPh62hSE0NA8KU2j33DrTRpyOkGlo",
    authDomain: "reportsprimaria.firebaseapp.com",
    projectId: "reportsprimaria",
    storageBucket: "reportsprimaria.appspot.com",
    messagingSenderId: "520478986626",
    appId: "1:520478986626:web:2a18c1898945da8b55ff9b",
    measurementId: "G-0E3PG1J51G"
  });
} else {
  appFirebase = firebase;
}

var db = appFirebase.firestore();

export { appFirebase , db};

