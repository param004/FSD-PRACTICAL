import { useState, useEffect } from 'react'
import './App.css'

function App() {
  // Initialize count from localStorage or default to 0
  const [count, setCount] = useState(() => {
    const savedCount = localStorage.getItem('gymExerciseCount')
    return savedCount ? parseInt(savedCount, 10) : 0
  })

  const [exerciseType, setExerciseType] = useState(() => {
    const savedExercise = localStorage.getItem('gymExerciseType')
    return savedExercise || 'Push-ups'
  })

  // Save to localStorage whenever count changes
  useEffect(() => {
    localStorage.setItem('gymExerciseCount', count.toString())
  }, [count])

  // Save exercise type to localStorage
  useEffect(() => {
    localStorage.setItem('gymExerciseType', exerciseType)
  }, [exerciseType])

  // Increment counter
  const increment = () => {
    setCount(prevCount => prevCount + 1)
  }

  // Decrement counter (prevent negative values)
  const decrement = () => {
    setCount(prevCount => Math.max(0, prevCount - 1))
  }

  // Reset counter manually
  const reset = () => {
    setCount(0)
  }

  // Add quick increment options
  const addFive = () => {
    setCount(prevCount => prevCount + 5)
  }

  const addTen = () => {
    setCount(prevCount => prevCount + 10)
  }

  // Exercise types for gym users
  const exerciseTypes = [
    'Push-ups',
    'Squats', 
    'Burpees',
    'Jumping Jacks',
    'Lunges',
    'Planks (seconds)',
    'Pull-ups',
    'Crunches',
    'Mountain Climbers',
    'Deadlifts'
  ]

  return (
    <div className="gym-counter-app">
      <div className="container">
        {/* Header */}
        <header className="header">
          <h1>💪 Gym Exercise Counter</h1>
          <p>Track your workout repetitions instantly</p>
        </header>

        {/* Exercise Type Selector */}
        <div className="exercise-selector">
          <label htmlFor="exercise-select">Exercise Type:</label>
          <select 
            id="exercise-select"
            value={exerciseType}
            onChange={(e) => setExerciseType(e.target.value)}
            className="exercise-dropdown"
          >
            {exerciseTypes.map((exercise) => (
              <option key={exercise} value={exercise}>
                {exercise}
              </option>
            ))}
          </select>
        </div>

        {/* Counter Display */}
        <div className="counter-display">
          <div className="current-exercise">{exerciseType}</div>
          <div className="count-number">{count}</div>
          <div className="count-label">
            {exerciseType.includes('seconds') ? 'Seconds' : 'Reps'}
          </div>
        </div>

        {/* Main Counter Buttons */}
        <div className="main-buttons">
          <button 
            className="counter-btn decrement-btn" 
            onClick={decrement}
            disabled={count === 0}
          >
            <span className="btn-icon">−</span>
            <span className="btn-text">Decrease</span>
          </button>
          
          <button 
            className="counter-btn increment-btn" 
            onClick={increment}
          >
            <span className="btn-icon">+</span>
            <span className="btn-text">Increase</span>
          </button>
        </div>

        {/* Quick Add Buttons */}
        <div className="quick-buttons">
          <button className="quick-btn" onClick={addFive}>
            +5
          </button>
          <button className="quick-btn" onClick={addTen}>
            +10
          </button>
          <button className="reset-btn" onClick={reset}>
            🔄 Reset
          </button>
        </div>

        {/* Progress Stats */}
        <div className="stats-section">
          <div className="stat-card">
            <div className="stat-number">{count}</div>
            <div className="stat-label">Total {exerciseType.includes('seconds') ? 'Seconds' : 'Reps'}</div>
          </div>
          
          <div className="stat-card">
            <div className="stat-number">{Math.floor(count / 10)}</div>
            <div className="stat-label">Sets of 10</div>
          </div>
          
          <div className="stat-card">
            <div className="stat-number">{count * 0.1}</div>
            <div className="stat-label">Calories (est.)</div>
          </div>
        </div>

        {/* Instructions */}
        <div className="instructions">
          <h3>🎯 How to Use:</h3>
          <ul>
            <li>Select your exercise type from the dropdown</li>
            <li>Tap <strong>+</strong> or <strong>−</strong> to count each rep</li>
            <li>Use quick add buttons for faster counting</li>
            <li>Your progress is automatically saved</li>
            <li>Counter persists even after page reload</li>
          </ul>
        </div>

        {/* Footer */}
        <footer className="footer">
          <p>💾 Progress automatically saved • 📱 Mobile & Desktop Friendly</p>
        </footer>
      </div>
    </div>
  )
}

export default App
