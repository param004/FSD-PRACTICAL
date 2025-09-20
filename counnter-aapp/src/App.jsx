import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  // Counter functions
  const increment = () => setCount(count + 1)
  const decrement = () => setCount(count - 1)
  const reset = () => setCount(0)
  const incrementByFive = () => setCount(count + 5)

  // Input change handlers
  const handleFirstNameChange = (e) => setFirstName(e.target.value)
  const handleLastNameChange = (e) => setLastName(e.target.value)

  return (
    <div className="counter-app">
      {/* Counter Section */}
      <div className="counter-section">
        <h1 className="count-display">Count: {count}</h1>
        
        <div className="button-group">
          <button onClick={reset}>Reset</button>
          <button onClick={increment}>Increment</button>
          <button onClick={decrement}>Decrement</button>
          <button onClick={incrementByFive}>Increment 5</button>
        </div>
      </div>

      {/* Welcome Section */}
      <div className="welcome-section">
        <h2>Welcome to CHARUSAT!!!</h2>
        
        <div className="input-group">
          <div className="input-field">
            <label>First Name: </label>
            <input 
              type="text" 
              value={firstName}
              onChange={handleFirstNameChange}
              placeholder="Enter first name"
            />
          </div>
          
          <div className="input-field">
            <label>Last Name: </label>
            <input 
              type="text" 
              value={lastName}
              onChange={handleLastNameChange}
              placeholder="Enter last name"
            />
          </div>
        </div>

        {/* Display entered names */}
        <div className="name-display">
          <p>First Name: {firstName}</p>
          <p>Last Name: {lastName}</p>
        </div>
      </div>
    </div>
  )
}

export default App
