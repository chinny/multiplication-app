const digitsSelect = document.getElementById('digits');
const problemDiv = document.getElementById('problem');
const answerInput = document.getElementById('answer');
const checkButton = document.getElementById('check');
const resultP = document.getElementById('result');
const tableDiv = document.getElementById('table');

let num1, num2;

function generateNumber(digits) {
    const min = Math.pow(10, digits - 1);
    const max = Math.pow(10, digits) - 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateProblem() {
    const digits = parseInt(digitsSelect.value);
    num1 = generateNumber(digits);
    num2 = generateNumber(digits);
    problemDiv.textContent = `${num1} x ${num2}`;
    resultP.textContent = '';
    answerInput.value = '';
}

function checkAnswer() {
    const userAnswer = parseInt(answerInput.value);
    if (userAnswer === num1 * num2) {
        resultP.textContent = 'Correct!';
        resultP.style.color = 'green';
        setTimeout(generateProblem, 1000);
    } else {
        resultP.textContent = 'Incorrect. Try again.';
        resultP.style.color = 'red';
    }
}

function createTable() {
    for (let i = 1; i <= 12; i++) {
        for (let j = 1; j <= 12; j++) {
            const cell = document.createElement('div');
            cell.classList.add('table-cell');
            cell.textContent = i * j;
            tableDiv.appendChild(cell);
        }
    }
}

digitsSelect.addEventListener('change', generateProblem);
checkButton.addEventListener('click', checkAnswer);

generateProblem();
createTable();
