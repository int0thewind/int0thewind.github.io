'use strict';

const codeList = document.getElementById('code-list');
const compList = document.getElementById('comp-list');
const codeBtn = document.getElementById('code-btn');
const compBtn = document.getElementById('comp-btn');

const monthAbbr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const toggleList = _ => {
    codeList.classList.toggle('d-none');
    codeBtn.classList.toggle('active');
    compList.classList.toggle('d-none');
    compBtn.classList.toggle('active');
}

const newPara = (text, ...classList) => {
    const p = document.createElement('p');
    p.classList.add(...classList);
    p.innerText = text;
    return p;
}

const newSpan = (text, ...classList) => {
    const s = document.createElement('span');
    s.classList.add(...classList);
    s.innerText = text;
    return s;
}

const newLink = (text, link, newTab, ...classList) => {
    const a = document.createElement('a');
    a.classList.add(...classList);
    a.innerText = text;
    a.setAttribute('href', link);
    if (newTab) a.setAttribute('target', '_blank');
    return a;
}

const newDiv = (...classList) => {
    const d = document.createElement('div');
    d.classList.add(...classList);
    return d;
}

const checkID = id => {
    if (document.getElementById(id))
        throw new Error(`Duplicated project ID found! Duplicated ID: ${id}`);
}

const genCard = d => {
    const { id, isMain, title, year, month, desc, shortDesc, links, tags, imgs, colab } = d;
    checkID(id);

    const cardHeader = newDiv('card-header');
        const cardBtnList = newDiv('d-flex', 'flex-wrap', 'justify-content-start', 'align-items-center');
        cardBtnList.append(newSpan(`${monthAbbr[month - 1]} ${year}`, 'badge', 'badge-pill', 'badge-success'));
        if (isMain)
            cardBtnList.append(newSpan('Major Work', 'badge', 'badge-pill', 'badge-warning'));
        if (tags.length !== 0) {
            for (const tag of tags)
                cardBtnList.append(newSpan(tag, 'badge', 'badge-pill', 'badge-warning', 'mx-1'));
        }
        cardBtnList.append(newSpan('', 'm-auto'));
        const cardInfoBtn = document.createElement('button');
            cardInfoBtn.classList.add('btn', 'btn-info', 'btn-sm');
            cardInfoBtn.setAttribute('data-toggle', 'collapse');
            cardInfoBtn.setAttribute('data-target', `#${id}`);
            cardInfoBtn.innerText = 'More Info';
        cardBtnList.append(cardInfoBtn);
    cardHeader.append(newPara(title, 'font-weight-bold', 'h4'), newPara(shortDesc));
    cardHeader.append(cardBtnList);

    const cardMain = newDiv('collapse');
    cardMain.id = id;
    cardMain.setAttribute('data-parent', '#comp-list');
        const cardBody = newDiv('card-body');
        cardBody.append(newPara(desc));
            const cardLinkList = newDiv('d-flex', 'justify-content-start', 'flex-wrap');
            if (colab.length !== 0) {
                const colabList = newDiv('d-flex', 'flex-column', 'm-3');
                colabList.append(newPara('Collaborators:'));
                colab.forEach(person => {
                    colabList.append(newPara(`${person.name}. ${person.contact}`, 'm-0', 'p-0'));
                });
                cardBody.append(colabList);
            }
            for (const prop in links)
                cardLinkList.append(newLink(prop, links[prop], true, 'btn', 'btn-link'));
        cardBody.append(cardLinkList);
    cardMain.append(cardBody);

    const card = newDiv('card', 'm-3');
    card.append(cardHeader, cardMain);
    return card;
}

const sortData = (f, s) => {
    if (f.isMain - s.isMain !== 0)
        return s.isMain - f.isMain;
    if (f.year - s.year !== 0)
        return f.year - s.year;
    return f.month - s.month;
}

const fetchComp = async _ => {
    const data = JSON.parse(await
        (await fetch('./lib/comp.json')).text()
    );
    data.sort(sortData);
    data.forEach(d => compList.append(genCard(d))); 
}

const fetchCode = async _ => {
    const data = JSON.parse(await
        (await fetch('./lib/code.json')).text()
    );
    data.sort(sortData);
    data.forEach(d => codeList.append(genCard(d))); 
}

fetchComp().catch(console.error);
fetchCode().catch(console.error);
codeBtn.onclick = _ => {
    if (!codeBtn.classList.contains('active'))
        toggleList();
}
compBtn.onclick = _ => {
    if (!compBtn.classList.contains('active'))
        toggleList();
}