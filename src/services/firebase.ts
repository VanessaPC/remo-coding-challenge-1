import * as firebase from "firebase";

// TODO: fill in your firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBK_EbV9Sbn6xC_EB0BP-DzVvdKKRewMPE",
  authDomain: "remo-test-58333.firebaseapp.com",
  databaseURL: "https://remo-test-58333.firebaseio.com",
  projectId: "remo-test-58333",
  appId: "1:321560897245:web:bdaa909ce5e31ba448dd34",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
