import { useState } from 'react'
import './App.css'

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('Home')

  // Toggle sidebar open/close
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  // Handle navigation section change
  const handleSectionChange = (section) => {
    setActiveSection(section)
    // Close sidebar on mobile after selection
    if (window.innerWidth <= 768) {
      setIsSidebarOpen(false)
    }
  }

  // Content for different sections
  const renderContent = () => {
    switch (activeSection) {
      case 'Home':
        return (
          <div className="content-section">
            <h1>Welcome to My Website</h1>
            <p>This is the main content of the webpage.</p>
            <div className="content-details">
              <h2>Home Section</h2>
              <p>Welcome to our amazing website! Here you can find all the information you need about our services and products.</p>
              <div className="feature-cards">
                <div className="feature-card">
                  <h3>Feature 1</h3>
                  <p>Amazing feature that will help you achieve your goals.</p>
                </div>
                <div className="feature-card">
                  <h3>Feature 2</h3>
                  <p>Another great feature with incredible benefits.</p>
                </div>
                <div className="feature-card">
                  <h3>Feature 3</h3>
                  <p>The final feature that completes our offering.</p>
                </div>
              </div>
            </div>
          </div>
        )
      case 'About':
        return (
          <div className="content-section">
            <h1>About Us</h1>
            <p>Learn more about our company and mission.</p>
            <div className="content-details">
              <h2>Our Story</h2>
              <p>We are a passionate team dedicated to creating amazing web experiences. Our journey started with a simple idea to make the web more beautiful and functional.</p>
              <h2>Our Mission</h2>
              <p>To provide cutting-edge web solutions that help businesses grow and succeed in the digital world.</p>
              <h2>Our Values</h2>
              <ul>
                <li>Innovation and creativity</li>
                <li>Quality and excellence</li>
                <li>Customer satisfaction</li>
                <li>Continuous learning</li>
              </ul>
            </div>
          </div>
        )
      case 'Contact':
        return (
          <div className="content-section">
            <h1>Contact Us</h1>
            <p>Get in touch with our team.</p>
            <div className="content-details">
              <h2>Contact Information</h2>
              <div className="contact-info">
                <div className="contact-item">
                  <h3>📧 Email</h3>
                  <p>contact@mywebsite.com</p>
                </div>
                <div className="contact-item">
                  <h3>📞 Phone</h3>
                  <p>+1 (555) 123-4567</p>
                </div>
                <div className="contact-item">
                  <h3>📍 Address</h3>
                  <p>123 Web Street<br />Digital City, DC 12345</p>
                </div>
              </div>
              <div className="contact-form">
                <h3>Send us a message</h3>
                <form>
                  <input type="text" placeholder="Your Name" />
                  <input type="email" placeholder="Your Email" />
                  <textarea placeholder="Your Message" rows="4"></textarea>
                  <button type="submit">Send Message</button>
                </form>
              </div>
            </div>
          </div>
        )
      default:
        return (
          <div className="content-section">
            <h1>Welcome to My Website</h1>
            <p>This is the main content of the webpage.</p>
          </div>
        )
    }
  }

  return (
    <div className="app-container">
      {/* Sidebar Overlay for mobile */}
      {isSidebarOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}
      
      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-header">
          <h2>Navigation</h2>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li>
              <button 
                className={`nav-button ${activeSection === 'Home' ? 'active' : ''}`}
                onClick={() => handleSectionChange('Home')}
              >
                🏠 Home
              </button>
            </li>
            <li>
              <button 
                className={`nav-button ${activeSection === 'About' ? 'active' : ''}`}
                onClick={() => handleSectionChange('About')}
              >
                ℹ️ About
              </button>
            </li>
            <li>
              <button 
                className={`nav-button ${activeSection === 'Contact' ? 'active' : ''}`}
                onClick={() => handleSectionChange('Contact')}
              >
                📧 Contact
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className={`main-content ${isSidebarOpen ? 'content-shifted' : ''}`}>
        {/* Header with hamburger menu */}
        <header className="main-header">
          <button className="hamburger-menu" onClick={toggleSidebar}>
            <div className={`hamburger-line ${isSidebarOpen ? 'hamburger-open' : ''}`}></div>
            <div className={`hamburger-line ${isSidebarOpen ? 'hamburger-open' : ''}`}></div>
            <div className={`hamburger-line ${isSidebarOpen ? 'hamburger-open' : ''}`}></div>
          </button>
          <h1>My Website</h1>
        </header>

        {/* Content Area */}
        <main className="content-area">
          {renderContent()}
        </main>
      </div>
    </div>
  )
}

export default App
