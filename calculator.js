class Calculator {
  constructor(previousCalculationTextElement, currentCalculationTextElement) {
    this.previousCalculationTextElement = previousCalculationTextElement
    this.currentCalculationTextElement = currentCalculationTextElement
    this.clear()
  }

  clear() {
    this.currentCalculationElement = ''
    this.previousCalculationElement = ''
    this.operation = undefined
  }

  delete() {
    this.currentCalculationElement = this.currentCalculationElement.toString().slice(0, -1)
  }

  appendNumber(number) {
    if (number === '.' && this.currentCalculationElement.includes('.')) return
    this.currentCalculationElement = this.currentCalculationElement.toString() + number.toString()
  }

  chooseOperation(operation) {
    if (this.currentCalculationElement === '') return
    if (this.previousCalculationElement !== '') {
      this.compute()
    }
    this.operation = operation
    this.previousCalculationElement = this.currentCalculationElement
    this.currentCalculationElement = ''
  }

  compute() {
    let computation
    const prev = parseFloat(this.previousCalculationElement)
    const current = parseFloat(this.currentCalculationElement)
    if (isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
      case '+':
        computation = prev + current
        break
      case '-':
        computation = prev - current
        break
      case '*':
        computation = prev * current
        break
      case '÷':
        computation = prev / current
        break
      default:
        return
    }
    this.currentCalculationElement = computation
    this.operation = undefined
    this.previousCalculationElement = ''
  }

  update() {
    this.currentCalculationTextElement.innerText = this.getDisplayNumber(this.currentCalculationElement)
    if (this.operation != null) {
      this.previousCalculationTextElement.innerText = `${this.getDisplayNumber(this.previousCalculationElement)} ${
        this.operation
      }`
    } else {
      this.previousCalculationTextElement.innerText = ''
    }
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('pl', { maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousCalculationTextElement = document.querySelector('[data-previous-calculation]')
const currentCalculationTextElement = document.querySelector('[data-current-calculation]')

const calculator = new Calculator(previousCalculationTextElement, currentCalculationTextElement)

numberButtons.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.update()
  })
})

operationButtons.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.update()
  })
})

equalsButton.addEventListener('click', (button) => {
  calculator.compute()
  calculator.update()
})

allClearButton.addEventListener('click', (button) => {
  calculator.clear()
  calculator.update()
})

deleteButton.addEventListener('click', (button) => {
  calculator.delete()
  calculator.update()
})
