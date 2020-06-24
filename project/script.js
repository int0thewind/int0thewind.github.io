//================================================================
// Webpage element tweaking
//================================================================

const codeList = document.getElementById('code-list');
const compList = document.getElementById('comp-list');
const codeBtn = document.getElementById('code-btn');
const compBtn = document.getElementById('comp-btn')

codeBtn.onclick = function() {
    codeList.classList.remove('d-none');
    codeList.classList.add('d-flex', 'flex-column');
    codeBtn.classList.add('active');
    compList.classList.remove('d-flex', 'flex-column');
    compList.classList.add('d-none');
    compBtn.classList.remove('active');
}

compBtn.onclick = function() {
    codeList.classList.remove('d-flex', 'flex-column');
    codeList.classList.add('d-none');
    codeBtn.classList.remove('active');
    compList.classList.remove('d-none');
    compList.classList.add('d-flex', 'flex-column');
    compBtn.classList.add('active');
}

//================================================================
// Firebase App initialisation
//================================================================
// TODO: find a way to defer firebase initlization.
firebase.initializeApp({
    apiKey: "AIzaSyCR7lcZQYBccMaAzyyhnixKgnblWURbxpU",
    authDomain: "yinhanzhi-me.firebaseapp.com",
    databaseURL: "https://yinhanzhi-me.firebaseio.com",
    projectId: "yinhanzhi-me",
    storageBucket: "yinhanzhi-me.appspot.com",
    messagingSenderId: "920311127173",
    appId: "1:920311127173:web:482fed3ff117f9c05eddec"
});

//================================================================
// Content rendering
//================================================================
const db = firebase.firestore();
