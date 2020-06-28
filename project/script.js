const codeList = document.getElementById('code-list');
const compList = document.getElementById('comp-list');
const codeBtn = document.getElementById('code-btn');
const compBtn = document.getElementById('comp-btn');
const toggle = () => {
    codeList.classList.toggle('d-none');
    codeBtn.classList.toggle('active');
    compList.classList.toggle('d-none');
    compBtn.classList.toggle('active');
}
codeBtn.onclick = _ => { if (!codeBtn.classList.contains('active')) toggle() }
compBtn.onclick = _ => { if (!compBtn.classList.contains('active')) toggle() }
