const levelBtns = document.querySelectorAll('.level-btn');
const overlay = document.getElementById('overlay');
const modalContent = document.getElementById('modal-content');
const inputElement = document.getElementById('completion-score');
const checkboxElement = document.getElementById('ap-checkbox');
const selectedConstantSpan = document.getElementById('selected-constant');
const selectedScoreSpan = document.getElementById('selected-score');
const calculateBtn = document.getElementById('calculate-btn');
const singleRateSpan = document.getElementById('single-rate');
const overallRateSpan = document.getElementById('overall-rate');

let currentConstant = 0;

function getRankCoefficient(score) {
    if (score >= 100.5000) return 22.4;
    if (score >= 100.0000) return 21.6;
    if (score >= 99.5000) return 21.1;
    if (score >= 99.0000) return 20.8;
    if (score >= 98.0000) return 20.3;
    if (score >= 97.0000) return 20.0;
    if (score >= 94.0000) return 16.8;
    if (score >= 90.0000) return 15.2;
    if (score >= 80.0000) return 13.6;
    if (score >= 75.0000) return 12.0;
    if (score >= 70.0000) return 11.2;
    if (score >= 60.0000) return 9.6;
    if (score >= 50.0000) return 8.0;
    if (score >= 40.0000) return 6.4;
    if (score >= 30.0000) return 4.8;
    if (score >= 20.0000) return 3.2;
    if (score >= 10.0000) return 1.6;
    return 0;
}

function setRateColor(element, value) {
    let v = (value < 1000) ? value * 50 : value;

    // 白背景で見やすい高彩度・低明度カラー
    if (v >= 16000) element.style.color = "#d600d6";      // 虹(極)
    else if (v >= 15000) element.style.color = "#e600e6"; // 虹
    else if (v >= 14500) element.style.color = "#008b8b"; // プラチナ
    else if (v >= 14000) element.style.color = "#b8860b"; // 金
    else if (v >= 13000) element.style.color = "#666666"; // 銀
    else if (v >= 12000) element.style.color = "#8b4513"; // 銅
    else if (v >= 10000) element.style.color = "#6a0dad"; // 紫
    else if (v >= 7000)  element.style.color = "#cc0000"; // 赤
    else if (v >= 4000)  element.style.color = "#a57c00"; // 黄
    else if (v >= 2000)  element.style.color = "#008000"; // 緑
    else if (v >= 1000)  element.style.color = "#0000ff"; // 青
    else element.style.color = "#444444";                 // 白
}

function updateDisplay() {
    const val = parseFloat(inputElement.value);
    let baseText = isNaN(val) ? '0.0000' : val.toFixed(4);
    selectedScoreSpan.innerText = checkboxElement.checked ? baseText + ' (AP済み)' : baseText;
}

levelBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        if (btn.id === 'calculate-btn') return;
        const levelText = btn.innerText;
        const targetDiv = document.getElementById('tE' + levelText);
        if (targetDiv) {
            modalContent.innerHTML = `<h3>レベル ${levelText} の定数</h3>${targetDiv.innerHTML}<span class="close-msg"><br>背景クリックで閉じる</span>`;
            overlay.style.display = 'flex';
        }
    });
});

overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.style.display = 'none'; });

modalContent.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        currentConstant = parseFloat(e.target.getAttribute('data') || e.target.innerText);
        selectedConstantSpan.innerText = currentConstant.toFixed(1);
        overlay.style.display = 'none';
    }
});

calculateBtn.addEventListener('click', () => {
    const rawScore = parseFloat(inputElement.value);
    if (isNaN(rawScore) || currentConstant === 0) {
        alert('定数と達成率を選択してください');
        return;
    }
    const calcScore = Math.min(rawScore, 100.5);
    const coefficient = getRankCoefficient(rawScore);
    let rate = Math.floor(currentConstant * (calcScore / 100) * coefficient);
    if (checkboxElement.checked) rate += 1;

    singleRateSpan.innerText = rate;
    overallRateSpan.innerText = (rate * 50).toLocaleString();
    setRateColor(singleRateSpan, rate);
    setRateColor(overallRateSpan, rate * 50);
});

inputElement.addEventListener('input', updateDisplay);
checkboxElement.addEventListener('change', updateDisplay);