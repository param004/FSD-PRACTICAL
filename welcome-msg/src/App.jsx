import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date())

  useEffect(() => {
    // Set up interval to update time every second
    const interval = setInterval(() => {
      setCurrentDateTime(new Date())
    }, 1000)

    // Cleanup interval on component unmount
    return () => clearInterval(interval)
  }, [])

  // Format date as M/D/YYYY
  const formatDate = (date) => {
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
  }

  // Format time as H:MM:SS AM/PM
  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    })
  }

  return (
    <div className="welcome-container">
      <h1>Welcome to CHARUSAT!!!!</h1>
      <p className="date-text">It is {formatDate(currentDateTime)}</p>
      <p className="time-text">It is {formatTime(currentDateTime)}</p>
    </div>
  )
}

export default App
