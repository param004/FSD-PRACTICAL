// server.js - Express.js Product Site Backend
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Enhanced Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Set view engine for rendering HTML
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.get('/', (req, res) => {
  res.render('home', { 
    title: 'Welcome to our site',
    message: 'Welcome to our site',
    timestamp: new Date().toLocaleString(),
    features: [
      'Express.js server setup',
      'Home route displaying welcome message',
      'JSON API endpoint',
      'Static file serving',
      'Error handling',
      'Scalable structure'
    ]
  });
});

// API route for JSON response
app.get('/api', (req, res) => {
  res.json({
    message: 'Welcome to our site',
    status: 'success',
    timestamp: new Date().toISOString(),
    server: 'Express.js',
    version: '1.0.0',
    endpoints: [
      'GET / - Home page',
      'GET /api - This API info',
      'GET /health - Server health check'
    ]
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    memory: process.memoryUsage()
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).render('404', { 
    title: 'Page Not Found',
    message: 'Page not found' 
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Something went wrong!',
    message: err.message
  });
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

// Start server
app.listen(PORT, () => {
  console.log('='.repeat(50));
  console.log(`🚀 Product Site Backend Server Started`);
  console.log(`📍 Server: http://localhost:${PORT}`);
  console.log(`🏠 Home: http://localhost:${PORT}/`);
  console.log(`� API: http://localhost:${PORT}/api`);
  console.log(`❤️  Health: http://localhost:${PORT}/health`);
  console.log('='.repeat(50));
});

module.exports = app;