const levelBtns = document.querySelectorAll('.level-btn');
const overlay = document.getElementById('overlay');
const modalContent = document.getElementById('modal-content');

levelBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const targetId = 'tE' + btn.innerText;
        const targetDiv = document.getElementById(targetId);
        if (targetDiv) {
            modalContent.innerHTML = '<h3>レベル ' + btn.innerText + ' の定数</h3>';
            modalContent.innerHTML += targetDiv.innerHTML;
            modalContent.innerHTML += '<span class="close-msg">背景をクリックで閉じる</span>';
            overlay.style.display = 'flex';
        }
    });
});

overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
        overlay.style.display = 'none';
    }
});

modalContent.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        console.log('Selected:', e.target.innerText);
        overlay.style.display = 'none';
    }
});