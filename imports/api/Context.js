import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import * as firebase from 'firebase';
require("firebase/firestore");
  
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBE40WwYJOrUe4dz7IG7a0eRGtnC5aFEYs",
    authDomain: "localhost:3000",
    databaseURL: "https://puamodoro-timer.firebaseio.com",
    projectId: "puamodoro-timer",
    storageBucket: "puamodoro-timer.appspot.com",
    messagingSenderId: "374414113794",
    appId: "1:374414113794:web:5fb6cc020bc8e277663b1b",
    measurementId: "G-TX7VPXY1HV"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export const db = firebase.firestore();