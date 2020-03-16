import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//import * as serviceWorker from './serviceWorker';

const firebase = require('firebase');
require('firebase/firestore');

var firebaseConfig = {
    apiKey: process.env.APIKEY,
    authDomain: "evern0te-clone.firebaseapp.com",
    databaseURL: "https://evern0te-clone.firebaseio.com",
    projectId: "evern0te-clone",
    storageBucket: "evern0te-clone.appspot.com",
    messagingSenderId: "10808381066",
    appId: "1:10808381066:web:2904109a2b3e1f072b2773",
    measurementId: "G-3NKRNGF6K6"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(<App />, document.getElementById('evernote-container'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

// serviceWorker.unregister();