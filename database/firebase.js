import firebase from 'firebase'
import 'firebase/firestore'

var firebaseConfig = {
	apiKey: "AIzaSyDwUitfg7_qqzEVFnr4NcYas9DpEY-3kn0",
	authDomain: "react-native-firebase-100ad.firebaseapp.com",
	databaseURL: "https://react-native-firebase-100ad.firebaseio.com",
	projectId: "react-native-firebase-100ad",
	storageBucket: "react-native-firebase-100ad.appspot.com",
	messagingSenderId: "431026162821",
	appId: "1:431026162821:web:c9312a5cd5b2b38bb52dec"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore()

export default {
	firebase,
	db
}