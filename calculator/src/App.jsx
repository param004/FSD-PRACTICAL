import { useState } from 'react'
import './App.css'

function App() {
  const [display, setDisplay] = useState('0')
  const [previousValue, setPreviousValue] = useState(null)
  const [operation, setOperation] = useState(null)
  const [waitingForNewValue, setWaitingForNewValue] = useState(false)

  // Handle number input
  const inputNumber = (num) => {
    if (waitingForNewValue) {
      setDisplay(String(num))
      setWaitingForNewValue(false)
    } else {
      setDisplay(display === '0' ? String(num) : display + num)
    }
  }

  // Handle decimal point
  const inputDecimal = () => {
    if (waitingForNewValue) {
      setDisplay('0.')
      setWaitingForNewValue(false)
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.')
    }
  }

  // Clear all
  // eslint-disable-next-line no-unused-vars
  const clear = () => {
    setDisplay('0')
    setPreviousValue(null)
    setOperation(null)
    setWaitingForNewValue(false)
  }

  // Delete last character
  const deleteLast = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1))
    } else {
      setDisplay('0')
    }
  }

  // Handle operations
  const performOperation = (nextOperation) => {
    const inputValue = parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(inputValue)
    } else if (operation) {
      const currentValue = previousValue || 0
      const newValue = calculate(currentValue, inputValue, operation)

      setDisplay(String(newValue))
      setPreviousValue(newValue)
    }

    setWaitingForNewValue(true)
    setOperation(nextOperation)
  }

  // Calculate result
  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue
      case '-':
        return firstValue - secondValue
      case '*':
        return firstValue * secondValue
      case '/':
        return secondValue !== 0 ? firstValue / secondValue : 0
      default:
        return secondValue
    }
  }

  // Handle equals
  const handleEquals = () => {
    const inputValue = parseFloat(display)

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation)
      setDisplay(String(newValue))
      setPreviousValue(null)
      setOperation(null)
      setWaitingForNewValue(true)
    }
  }

  return (
    <div className="calculator">
      <div className="calculator-display">
        <div className="display-text">{display}</div>
      </div>
      
      <div className="calculator-buttons">
        {/* Top row - operations */}
        <button className="btn operation" onClick={() => performOperation('/')}>/</button>
        <button className="btn operation" onClick={() => performOperation('*')}>*</button>
        <button className="btn operation" onClick={() => performOperation('+')}>+</button>
        <button className="btn operation" onClick={() => performOperation('-')}>-</button>
        <button className="btn operation delete" onClick={deleteLast}>DEL</button>

        {/* Row 1 - numbers 1-5 */}
        <button className="btn number" onClick={() => inputNumber(1)}>1</button>
        <button className="btn number" onClick={() => inputNumber(2)}>2</button>
        <button className="btn number" onClick={() => inputNumber(3)}>3</button>
        <button className="btn number" onClick={() => inputNumber(4)}>4</button>
        <button className="btn number" onClick={() => inputNumber(5)}>5</button>
        
        {/* Row 2 - numbers 6-0 */}
        <button className="btn number" onClick={() => inputNumber(6)}>6</button>
        <button className="btn number" onClick={() => inputNumber(7)}>7</button>
        <button className="btn number" onClick={() => inputNumber(8)}>8</button>
        <button className="btn number" onClick={() => inputNumber(9)}>9</button>
        <button className="btn number" onClick={() => inputNumber(0)}>0</button>
        
        {/* Bottom row - decimal and equals */}
        <button className="btn number decimal" onClick={inputDecimal}>.</button>
        <button className="btn equals" onClick={handleEquals}>=</button>
      </div>
    </div>
  )
}

export default App
