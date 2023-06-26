class Calculator {
  constructor(previousCalculationElement, currentCalculationElement) {
    this.previousCalculationElement = previousCalculationElement
    this.currentCalculationElement = currentCalculationElement
    this.clear()
  }

  clear() {
    this.currentCalculationElement = ''
    this.previousCalculationElement = ''
    this.operation = undefined
  }

  delete() {}

  appendNumber(number) {
    this.currentOperation = this.currentOperation.toString() + number.toString()
  }

  chooseOperation(operation) {}

  computer() {}

  update() {
    this.currentCalculationElement.innerText = this.currentCalculation
  }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousCalculationElement = document.querySelector('[data-previous-calculation]')
const currentCalculationElement = document.querySelector('[data-current-calculation]')

const calculator = new Calculator(previousCalculationElement, currentCalculationElement)

numberButtons.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.update()
  })
})
