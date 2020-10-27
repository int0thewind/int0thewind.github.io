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

const newP = (text, ...classList) => {
    const p = document.createElement('p');
    p.classList.add(...classList);
    p.innerText = text;
    return p;
}

const newS = (text, ...classList) => {
    const s = document.createElement('span');
    s.classList.add(...classList);
    s.innerText = text;
    return s;
}

const newA = (text, link, newTab, ...classList) => {
    const a = document.createElement('a');
    a.classList.add(...classList);
    a.innerText = text;
    a.setAttribute('href', link);
    if (newTab) a.setAttribute('target', '_blank');
    return a;
}

const newD = (...classList) => {
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

    const cardHeader = newD('card-header');
    const cardBtnList = newD('d-flex', 'justify-content-start', 'align-items-center')
        const cardTagList = newD('d-flex', 'flex-wrap', 'justify-content-start', 'align-items-center', 'flex-grow-1');
        cardTagList.append(newS(`${monthAbbr[month - 1]} ${year}`, 'badge', 'badge-pill', 'badge-success'));
        if (isMain)
            cardTagList.append(newS('Major Work', 'badge', 'badge-pill', 'badge-danger'));
        if (tags.length !== 0) {
            for (const tag of tags)
                cardTagList.append(newS(tag, 'badge', 'badge-pill', 'badge-warning', 'mx-1'));
        }
        // cardTagList.append(newS('', 'm-auto'));
        cardBtnList.append(cardTagList)
        const cardInfoBtn = document.createElement('button');
            cardInfoBtn.classList.add('btn', 'btn-info', 'btn-sm');
            cardInfoBtn.setAttribute('data-toggle', 'collapse');
            cardInfoBtn.setAttribute('data-target', `#${id}`);
            cardInfoBtn.innerText = 'More';
            // cardInfoBtn.style.height = '30px';
        cardBtnList.append(cardInfoBtn);
    cardHeader.append(newP(title, 'font-weight-bold', 'h4'), newP(shortDesc));
    cardHeader.append(cardBtnList);

    const cardMain = newD('collapse');
    cardMain.id = id;
    cardMain.setAttribute('data-parent', '#comp-list');
        const cardBody = newD('card-body');
        cardBody.append(newP(desc));
            const cardLinkList = newD('d-flex', 'justify-content-start', 'flex-wrap');
            if (colab.length !== 0) {
                const colabList = newD('d-flex', 'flex-column', 'm-3');
                colabList.append(newP('Collaborators:'));
                colab.forEach(p => colabList.append(newP(`${p.name}. ${p.contact}`, 'm-0', 'p-0')));
                cardBody.append(colabList);
            }
            for (const prop in links)
                cardLinkList.append(newA(prop, links[prop], true, 'btn', 'btn-link'));
        cardBody.append(cardLinkList);
    cardMain.append(cardBody);

    const card = newD('card', 'm-3');
    card.append(cardHeader, cardMain);
    return card;
}

const sortData = (f, s) => {
    if (f.isMain - s.isMain !== 0)
        return f.isMain ? -1 : 1;
    if (f.year - s.year !== 0)
        return f.year > s.year ? -1 : 1;
    if (f.month - s.month !== 0)
        return f.month > s.month ? -1 : 1;
    return f.id > s.id ? -1 : 1;
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