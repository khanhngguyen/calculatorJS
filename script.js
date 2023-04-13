class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number) {
        //prevent . from being typed many times
        //if type '.' & currrentOperand already has '.'
        if (number === '.' && this.currentOperand.includes('.')) return;
        //update currentOperand with every number typed in
        //this.currentOperand = number;
        //convert toString() because we want to append string, e.g. '1' + '1' = '11', not 1 + 1 = 2;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        //prevent operation being clicked where current operand is empty
        if (this.currentOperand === '') return;
        //now currentOperand should not be empty
        //in case both current & previous operands are not empty: e.g. prev: 2 +, current: 2
        // when click on operation == new calculation --> previousOperand to be calculated & updated
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        //when typing operation is done, update previousOperand
        this.previousOperand = this.currentOperand;
        //then clear currentOperand
        this.currentOperand = '';
    }

    compute() {
        let result;
        //numbers are toString()ed in appendNumber()
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        //prevent = is clicked where both prev & current are empty
        if (isNaN(prev) && isNaN(current)) return;
        //computation cases
        switch(this.operation) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '÷':
                result = prev / current;
                break;
            default:
                return;
        }
        //done computation
        this.currentOperand = result;
        this.operation = undefined;
        this.previousOperand = '';
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.currentOperand;
        //this.previousOperandTextElement.innerText = this.previousOperand;
        //if previous operand is available, & new operation is clicked
        //make previous operand concat with operation, e.g. 12 + 
        if (this.operation != undefined)
        {
            this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`;
        } else {
            this.previousOperandTextElement.innerText = '';
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalButton = document.querySelector('[data-equal]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

//create new calculator as a new object
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

//add function to each number button
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

//add function to each operation button
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

//add function to equal button
equalButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
})

allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
})