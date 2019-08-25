// DOM、宣告
const inputTall = document.querySelector('.inputTall');
const inputWeight = document.querySelector('.inputWeight');
const resultBtn = document.querySelector('.resultBtn');
const showStatus = document.querySelector('.showStatus');
const showResult = document.querySelector('.showResult');
const showResultA = document.querySelector('.showResult a');
const records = document.querySelector('.records');

let data = JSON.parse(localStorage.getItem('BMIData')) || [];

updateList(data);

//監聽
resultBtn.addEventListener('click', getResult, false);
showResultA.addEventListener('click', resetData, false);
records.addEventListener('click', deleteList, false);


//加入結果資料
function getResult() {
    let inputTallVal = inputTall.value;
    let inputWeightVal = inputWeight.value;
    let BMIType;
    let recordColor = '';

    //計算BMI
    let BMIValue = inputWeightVal / ((inputTallVal / 100) * (inputTallVal / 100));
    let BMICount = BMIValue.toFixed(2);

    //把BMI結果放進畫面
    let resultNum = document.querySelector('.resultNum');
    resultNum.textContent = BMICount;

    //判斷區間
    if (18.5 >= BMICount) {
        showStatus.textContent = '過輕';
        addClass('underweight');
        BMIType = '過輕';
    } else if (18.5 <= BMICount && BMICount <= 25) {
        showStatus.textContent = '理想';
        addClass('ideal');
        BMIType = '理想';
    } else if (25 <= BMICount && BMICount <= 30) {
        showStatus.textContent = '過重';
        addClass('overweight');
        BMIType = '過重';
    } else if (30 <= BMICount && BMICount <= 35) {
        showStatus.textContent = '輕度肥胖';
        addClass('mildObesity');
        BMIType = '輕度肥胖';
    } else if (35 <= BMICount && BMICount <= 40) {
        showStatus.textContent = '中度肥胖';
        addClass('moderateObesity');
        BMIType = '中度肥胖';
    } else {
        showStatus.textContent = '重度肥胖';
        addClass('severObesity');
        BMIType = '重度肥胖';
    }

    //畫面的變更和渲染
    function addClass(status) {
        resultBtn.style.display = 'none';
        showStatus.style.display = 'block';
        showResult.style.display = 'block';
        showStatus.classList.add(status);
        showResult.classList.add(status);
        showResultA.classList.add(status);
        recordColor = status;
        console.log(status);
    }

    //要放進資料庫的資料
    let totalResult = {
        tall: inputTallVal,
        weight: inputWeightVal,
        BMI: BMICount,
        BMIType: BMIType,
        color: recordColor,
    }

    //確認輸入格式正確
    if (inputTallVal === null || inputTallVal === '' || inputWeightVal === null || inputWeightVal === '') {
        alert('請輸入身高/體重');
        return;
    } else if (isNaN(inputTallVal) || isNaN(inputWeightVal)) {
        alert('請輸入數字');
        return;
    }

    data.push(totalResult);
    updateList(data);
    localStorage.setItem('BMIData', JSON.stringify(data));
}

//更新內容
function updateList(items) {
    let date = new Date();
    let now = date.getFullYear() + ' 年 ' + (date.getMonth() + 1) + ' 月 ' + date.getDate() + ' 日 ';

    let strRecord = '';
    for (let i = 0; i < items.length; i++) {
        strRecord += `
        <li class="record ${items[i].color}" data-num="${i}">
                        <p class="showStatus" style="align-self: auto;"><span>${items[i].BMIType}</span></p>
                        <p class="showBMI">BMI<span> ${items[i].BMI}</span>
                        </p>
                        <p class="showWeight">weight<span> ${items[i].weight}kg</span>
                        </p>
                        <p class="showHeight">height<span> ${items[i].tall}cm</span>
                        </p>
                        <p class="showDate"><span style="font-size: 12px;">${now}</span></p>
                        <a href="#" class="deleteBtn">刪除</a>
                </li>`
    }
    records.innerHTML = strRecord;
}

//清空
function resetData() {
    resultBtn.style.display = 'block';
    showStatus.style.display = 'none';
    showResult.style.display = 'none';
    inputTall.value = '';
    inputWeight.value = '';
    showStatus.removeAttribute('class');
    showStatus.classList.add('showStatus');
    showResult.removeAttribute('class');
    showResult.classList.add('showResult');
    showResultA.removeAttribute('class');
}

// 刪除清單
function deleteList(e) {
    e.preventDefault();
    let number = e.target.parentNode.dataset.num;
    if (e.target.nodeName !== 'A') {
        return
    }
    data.splice(number, 1);
    console.log(data);
    localStorage.setItem('BMIData', JSON.stringify(data));
    updateList(data);
}