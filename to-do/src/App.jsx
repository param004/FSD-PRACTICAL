import { useState } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editValue, setEditValue] = useState('')

  // Add new task
  const addTask = () => {
    if (inputValue.trim() !== '') {
      const newTask = {
        id: Date.now(),
        text: inputValue.trim(),
        completed: false
      }
      setTasks([...tasks, newTask])
      setInputValue('')
    }
  }

  // Delete task
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  // Start editing task
  const startEdit = (id, text) => {
    setEditingId(id)
    setEditValue(text)
  }

  // Save edited task
  const saveEdit = (id) => {
    if (editValue.trim() !== '') {
      setTasks(tasks.map(task => 
        task.id === id ? { ...task, text: editValue.trim() } : task
      ))
    }
    setEditingId(null)
    setEditValue('')
  }

  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null)
    setEditValue('')
  }

  // Toggle task completion
  const toggleComplete = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  // Handle key press for add task
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask()
    }
  }

  // Handle key press for edit task
  const handleEditKeyPress = (e, id) => {
    if (e.key === 'Enter') {
      saveEdit(id)
    } else if (e.key === 'Escape') {
      cancelEdit()
    }
  }

  return (
    <div className="todo-app">
      <div className="todo-container">
        <h1 className="app-title">Get Things Done !</h1>
        
        {/* Add Task Section */}
        <div className="add-task-section">
          <input
            type="text"
            placeholder="What is the task today?"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            className="task-input"
          />
          <button onClick={addTask} className="add-btn">
            Add Task
          </button>
        </div>

        {/* Tasks List */}
        <div className="tasks-list">
          {tasks.map(task => (
            <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
              {editingId === task.id ? (
                <div className="edit-mode">
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onKeyPress={(e) => handleEditKeyPress(e, task.id)}
                    className="edit-input"
                    autoFocus
                  />
                  <div className="edit-actions">
                    <button onClick={() => saveEdit(task.id)} className="save-btn">
                      ✓
                    </button>
                    <button onClick={cancelEdit} className="cancel-btn">
                      ✕
                    </button>
                  </div>
                </div>
              ) : (
                <div className="task-content">
                  <div className="task-text-section">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleComplete(task.id)}
                      className="task-checkbox"
                    />
                    <span className="task-text">{task.text}</span>
                  </div>
                  <div className="task-actions">
                    <button 
                      onClick={() => startEdit(task.id, task.text)} 
                      className="edit-btn"
                      title="Edit task"
                    >
                      ✏️
                    </button>
                    <button 
                      onClick={() => deleteTask(task.id)} 
                      className="delete-btn"
                      title="Delete task"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
          
          {tasks.length === 0 && (
            <div className="empty-state">
              <p>No tasks yet. Add one above!</p>
            </div>
          )}
        </div>

        {/* Task Stats */}
        {tasks.length > 0 && (
          <div className="task-stats">
            <p>Total: {tasks.length} | Completed: {tasks.filter(t => t.completed).length}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
