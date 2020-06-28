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
const code = document.getElementById('code-list');
const comp = document.getElementById('comp-list');

const monthAbbr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function dateToString(date, showDay=false) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDay();
    return showDay ? `${monthAbbr[month]} ${day} ${year}` : `${monthAbbr[month]} ${year}`;
}

function genComp(id, title, date, shortDesc, desc, score, audio, video) {
    const card = document.createElement('div');
    card.classList.add('card', 'm-3');

    const cardHeader = document.createElement('div');
    cardHeader.classList.add('card-header');
        const cardTitle = document.createElement('h4');
            cardTitle.className = 'font-weight-bold';
            cardTitle.innerText = `${id} ${title}`;
        const cardShortDesc = document.createElement('p');
            cardShortDesc.innerText = shortDesc;
        const cardBtnList = document.createElement('div');
            cardBtnList.classList.add('d-flex', 'justify-content-between', 'align-items-center')
            const cardDate = document.createElement('span');
                cardDate.classList.add('badge', 'badge-pill', 'badge-success');
                cardDate.innerText = date;
            const cardInfoBtn = document.createElement('button');
                cardInfoBtn.classList.add('btn', 'btn-info', 'btn-sm');
                cardInfoBtn.setAttribute('data-toggle', 'collapse');
                cardInfoBtn.setAttribute('data-target', `#${id}`);
                cardInfoBtn.innerText = 'More Info';
        cardBtnList.append(cardDate, cardInfoBtn);
    cardHeader.append(cardTitle, cardShortDesc, cardBtnList);

    const cardMain = document.createElement('div');
        cardMain.id = id;
        cardMain.className = 'collapse';
        cardMain.setAttribute('data-parent', '#comp-list');
    
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
        const cardDesc = document.createElement('p');
            cardDesc.innerText = desc;
        cardBody.append(cardDesc);

    const cardLinkList = document.createElement('div');
    cardLinkList.classList.add('d-flex', 'justify-content-start', 'flex-wrap')
    if (score !== undefined && score !== '') {
        const cardScore = document.createElement('a');
        cardScore.setAttribute('target', '_blank');
        cardScore.href = score;
        cardScore.classList.add('btn', 'btn-link');
        cardScore.innerText = 'Score';
        cardLinkList.append(cardScore);
    }
    if (audio !== undefined && audio !== '') {
        const cardAudio = document.createElement('a');
        cardAudio.setAttribute('target', '_blank');
        cardAudio.href = score;
        cardAudio.classList.add('btn', 'btn-link');
        cardAudio.innerText = 'Audio';
        cardLinkList.append(cardAudio);
    }
    if (video !== undefined && video !== '') {
        const cardVideo = document.createElement('a');
        cardVideo.setAttribute('target', '_blank');
        cardVideo.href = score;
        cardVideo.classList.add('btn', 'btn-link');
        cardVideo.innerText = 'Video';
        cardLinkList.append(cardVideo);
    }
    cardBody.append(cardLinkList);

    cardMain.append(cardBody);
    card.append(cardHeader, cardMain);
    return card;
}

db.collection('code').get().then((query) => {
    query.forEach((doc) => {
        console.log(doc.id);
        console.log(doc.data());
    })
});

db.collection('comp').get().then((query) => {
    query.forEach((doc) => {
        const d = doc.data();
        console.log(d.date);
        comp.append(genComp(doc.id, d.title, dateToString(d.date.toDate()), d.shortDesc, d.desc, d.score, d.audio, d.video));
    })
});