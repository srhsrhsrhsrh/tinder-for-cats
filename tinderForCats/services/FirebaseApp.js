import Firebase from 'firebase';
import 'firebase/firestore';

const config =  {
    apiKey: "AIzaSyC1OAvOYVTyVKubrNs80DyOecT7G_WrPl8",
    authDomain: "tinder-for-cats-af8a6.firebaseapp.com",
    databaseURL: "https://tinder-for-cats-af8a6.firebaseio.com",
    projectId: "tinder-for-cats-af8a6",
    storageBucket: "tinder-for-cats-af8a6.appspot.com",
    messagingSenderId: "1026948928339",
    appId: "1:1026948928339:web:671b7da254f68a689387a6",
    measurementId: "G-W44ZQ7YWER"
};

export default Firebase.apps.length > 0 ? Firebase.app() : Firebase.initializeApp(config);