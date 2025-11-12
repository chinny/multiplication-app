document.addEventListener('DOMContentLoaded', () => {
    const App = {
        // --- Elements ---
        tabs: document.querySelectorAll('.tab-link'),
        tabContents: document.querySelectorAll('.tab-content'),
        digitsSelect: document.getElementById('digits'),
        problemDiv: document.getElementById('problem'),
        answerInput: document.getElementById('answer'),
        checkButton: document.getElementById('check'),
        resultP: document.getElementById('result'),
        tableDiv: document.getElementById('table'),
        toggleTableButton: document.getElementById('toggle-table'),
        sheetDigits1Select: document.getElementById('sheet-digits-1'),
        sheetDigits2OptionSelect: document.getElementById('sheet-digits-2-option'),
        rangeOptionsDiv: document.getElementById('range-options'),
        rangeMinInput: document.getElementById('range-min'),
        rangeMaxInput: document.getElementById('range-max'),
        numProblemsInput: document.getElementById('num-problems'),
        generateSheetButton: document.getElementById('generate-sheet'),
        printSheetButton: document.getElementById('print-sheet'),
        sheetContainer: document.getElementById('sheet-container'),

        // --- State ---
        num1: 0,
        num2: 0,

        // --- Initialization ---
        init() {
            this.setupTabs();
            this.setupTester();
            this.setupTable();
            this.setupSheets();
            this.generateProblem();
            this.createMultiplicationTable();
        },

        // --- Tab Switching ---
        setupTabs() {
            this.tabs.forEach(link => {
                link.addEventListener('click', () => {
                    const tab = link.dataset.tab;
                    this.tabs.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                    this.tabContents.forEach(c => c.classList.remove('active'));
                    document.getElementById(tab).classList.add('active');
                });
            });
        },

        // --- Multiplication Tester ---
        setupTester() {
            this.digitsSelect.addEventListener('change', () => this.generateProblem());
            this.checkButton.addEventListener('click', () => this.checkAnswer());
            this.answerInput.addEventListener('keyup', (e) => {
                if (e.key === 'Enter') this.checkAnswer();
            });
        },

        generateNumber(digits) {
            const min = Math.pow(10, digits - 1);
            const max = Math.pow(10, digits) - 1;
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },

        generateProblem() {
            const digits = parseInt(this.digitsSelect.value);
            this.num1 = this.generateNumber(digits);
            this.num2 = this.generateNumber(digits);
            this.problemDiv.textContent = `${this.num1} x ${this.num2}`;
            this.resultP.textContent = '';
            this.answerInput.value = '';
            this.answerInput.focus();
        },

        checkAnswer() {
            const userAnswer = parseInt(this.answerInput.value);
            if (userAnswer === this.num1 * this.num2) {
                this.resultP.textContent = 'Correct!';
                this.resultP.style.color = 'var(--correct-color)';
                setTimeout(() => this.generateProblem(), 1000);
            } else {
                this.resultP.textContent = 'Incorrect. Try again.';
                this.resultP.style.color = 'var(--incorrect-color)';
            }
        },

        // --- Multiplication Table ---
        setupTable() {
            this.toggleTableButton.addEventListener('click', () => {
                this.tableDiv.hidden = !this.tableDiv.hidden;
                this.toggleTableButton.textContent = this.tableDiv.hidden ? 'Show Multiplication Table' : 'Hide Multiplication Table';
            });
        },

        createMultiplicationTable() {
            this.tableDiv.innerHTML = ''; // Clear previous table
            for (let i = 1; i <= 12; i++) {
                for (let j = 1; j <= 12; j++) {
                    const cell = document.createElement('div');
                    cell.classList.add('table-cell');
                    cell.textContent = i * j;
                    this.tableDiv.appendChild(cell);
                }
            }
        },

        // --- Printable Sheets ---
        setupSheets() {
            this.sheetDigits2OptionSelect.addEventListener('change', () => {
                this.rangeOptionsDiv.hidden = this.sheetDigits2OptionSelect.value !== 'range';
            });
            this.generateSheetButton.addEventListener('click', () => this.generateSheet());
            this.printSheetButton.addEventListener('click', () => window.print());
        },

        generateSheet() {
            this.sheetContainer.innerHTML = '';
            const digits1 = parseInt(this.sheetDigits1Select.value);
            const numProblems = parseInt(this.numProblemsInput.value);
            const useRange = this.sheetDigits2OptionSelect.value === 'range';
            const rangeMin = parseInt(this.rangeMinInput.value);
            const rangeMax = parseInt(this.rangeMaxInput.value);

            for (let i = 0; i < numProblems; i++) {
                const num1 = this.generateNumber(digits1);
                let num2;
                if (useRange) {
                    num2 = Math.floor(Math.random() * (rangeMax - rangeMin + 1)) + rangeMin;
                } else {
                    // Generate a number with a random number of digits up to the first number's digits
                    const digits2 = Math.floor(Math.random() * digits1) + 1;
                    num2 = this.generateNumber(digits2);
                }

                const problemItem = document.createElement('div');
                problemItem.classList.add('problem-item');
                problemItem.textContent = `${num1} x ${num2} = ___`;
                this.sheetContainer.appendChild(problemItem);
            }
        }
    };

    App.init();
});
