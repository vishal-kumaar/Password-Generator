const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');

const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
}


clipboardEl.addEventListener('click', () => {
    const password = resultEl.innerText;
    const textArea = document.createElement("textarea");
    if (password == ""){
        return;
    }
    else{
        textArea.textContent = password;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        textArea.remove();
    }
})

generateEl.addEventListener('click', () => {
    resultEl.innerText = generatePassword(lowercaseEl.checked, uppercaseEl.checked, numbersEl.checked, symbolsEl.checked, lengthEl.value);
})

function generatePassword(lower, upper, number, symbol, length) {
    let password = "";
    let count = lower + upper + number + symbol;
    
    if (count == 0){
        return "";
    }

    const arr = [{lower}, {upper}, {number}, {symbol}];
    let filteredArr = arr.filter(element => (Object.values(element)[0]));

    for (let i = 0; i < length; i += count){
        filteredArr.forEach(obj=>{
            let key =  Object.keys(obj)[0];
            password += randomFunc[key]();
        })
    }
    password = password.slice(0, length);
    return password;
}

function getRandomLower() {
    lowerLetters = "abcdefghijklmnopqrstuvwxyz";
    randNum = Math.floor(Math.random() * 26);
    return lowerLetters[randNum];
}

function getRandomUpper() {
    upperLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    randNum = Math.floor(Math.random() * 26);
    return upperLetters[randNum];
}

function getRandomNumber() {
    numbers = "0123456789";
    randNum = Math.floor(Math.random() * 10);
    return numbers[randNum];
}

function getRandomSymbol() {
    symbols = `!@#$%^&*()_-+={}[]|\:;"'<,>.?/`;
    randNum = Math.floor(Math.random() * 29);
    return symbols[randNum];
}