// Tabs
const tabLinks = document.querySelectorAll('.tab-link');
const tabContents = document.querySelectorAll('.tab-content');

// Multiplication Tester
const digitsSelect = document.getElementById('digits');
const problemDiv = document.getElementById('problem');
const answerInput = document.getElementById('answer');
const checkButton = document.getElementById('check');
const resultP = document.getElementById('result');

// Multiplication Table
const tableDiv = document.getElementById('table');
const toggleTableButton = document.getElementById('toggle-table');

// Printable Sheets
const sheetDigits1Select = document.getElementById('sheet-digits-1');
const sheetDigits2OptionSelect = document.getElementById('sheet-digits-2-option');
const rangeOptionsDiv = document.getElementById('range-options');
const rangeMinInput = document.getElementById('range-min');
const rangeMaxInput = document.getElementById('range-max');
const numProblemsInput = document.getElementById('num-problems');
const generateSheetButton = document.getElementById('generate-sheet');
const printSheetButton = document.getElementById('print-sheet');
const sheetContainer = document.getElementById('sheet-container');


let num1, num2;

// --- Tab Switching ---
tabLinks.forEach(link => {
    link.addEventListener('click', () => {
        const tab = link.dataset.tab;

        tabLinks.forEach(link => link.classList.remove('active'));
        link.classList.add('active');

        tabContents.forEach(content => content.classList.remove('active'));
        document.getElementById(tab).classList.add('active');
    });
});

// --- Multiplication Tester ---
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

digitsSelect.addEventListener('change', generateProblem);
checkButton.addEventListener('click', checkAnswer);

// --- Multiplication Table ---
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

toggleTableButton.addEventListener('click', () => {
    tableDiv.classList.toggle('table-hidden');
    toggleTableButton.textContent = tableDiv.classList.contains('table-hidden') ? 'Show Multiplication Table' : 'Hide Multiplication Table';
});

// --- Printable Sheets ---
sheetDigits2OptionSelect.addEventListener('change', () => {
    if (sheetDigits2OptionSelect.value === 'range') {
        rangeOptionsDiv.classList.remove('hidden');
    } else {
        rangeOptionsDiv.classList.add('hidden');
    }
});

function generateSheet() {
    sheetContainer.innerHTML = '';
    const digits1 = parseInt(sheetDigits1Select.value);
    const numProblems = parseInt(numProblemsInput.value);
    const useRange = sheetDigits2OptionSelect.value === 'range';
    const rangeMin = parseInt(rangeMinInput.value);
    const rangeMax = parseInt(rangeMaxInput.value);

    for (let i = 0; i < numProblems; i++) {
        const num1 = generateNumber(digits1);
        let num2;
        if (useRange) {
            num2 = Math.floor(Math.random() * (rangeMax - rangeMin + 1)) + rangeMin;
        } else {
            num2 = generateNumber(digits1); // Or a different logic if you prefer
        }

        const problemItem = document.createElement('div');
        problemItem.classList.add('problem-item');
        problemItem.textContent = `${num1} x ${num2} = ___`;
        sheetContainer.appendChild(problemItem);
    }
}

generateSheetButton.addEventListener('click', generateSheet);

printSheetButton.addEventListener('click', () => {
    window.print();
});


// --- Initial Setup ---
generateProblem();
createTable();
