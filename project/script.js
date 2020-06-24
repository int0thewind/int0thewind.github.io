// Main Entry Point
(async function() {
    firebase.initializeApp({
        apiKey: "AIzaSyCR7lcZQYBccMaAzyyhnixKgnblWURbxpU",
        authDomain: "yinhanzhi-me.firebaseapp.com",
        databaseURL: "https://yinhanzhi-me.firebaseio.com",
        projectId: "yinhanzhi-me",
        storageBucket: "yinhanzhi-me.appspot.com",
        messagingSenderId: "920311127173",
        appId: "1:920311127173:web:482fed3ff117f9c05eddec"
    });
    const db = firebase.firestore();
    
})()