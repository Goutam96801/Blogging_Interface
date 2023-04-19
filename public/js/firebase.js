let firebaseConfig = {
  apiKey: "AIzaSyB__SKPmgpdagGw7Ywd6Tx6F7kt6QGW9xk",
  authDomain: "blog-interface-c1c98.firebaseapp.com",
  projectId: "blog-interface-c1c98",
  storageBucket: "blog-interface-c1c98.appspot.com",
  messagingSenderId: "749111140560",
  appId: "1:749111140560:web:979e0edd82acc13422bed5",
  measurementId: "G-20ETYLLFFX"
};


firebase.initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

let db = firebase.firestore();

let auth = firebase.auth();

const logoutUser = () => {
    auth.signOut();
    location.reload()
}