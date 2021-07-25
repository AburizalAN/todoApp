import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDL6Bfmnz7bDN5y5hum2PClE9I9I5or9MA",
  authDomain: "todoapp-16cd1.firebaseapp.com",
  projectId: "todoapp-16cd1",
  storageBucket: "todoapp-16cd1.appspot.com",
  messagingSenderId: "6136186888",
  appId: "1:6136186888:web:340c6b1431fd91009fa9bd",
  measurementId: "G-F4FH77HN25"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({ timestampsInSnapshots: true });


export default firebase;