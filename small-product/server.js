// server.js - Main Express.js server for small product site
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import process from 'process';
import { fileURLToPath } from 'url';

// Import route modules
import indexRoutes from './routes/index.js';
import productRoutes from './routes/products.js';

// Load environment variables
dotenv.config();

// Get directory name for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create Express application
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware Configuration
app.use(cors()); // Enable CORS for all routes
app.use(morgan('combined')); // HTTP request logging
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Routes Configuration (MUST come before static files to prevent conflicts)
app.use('/', indexRoutes); // Home routes
app.use('/api/products', productRoutes); // Product API routes

// Serve static files from public directory (after routes)
app.use(express.static(path.join(__dirname, 'public')));

// Health check route for monitoring
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: "Server is running healthy",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    version: "1.0.0"
  });
});

// Error handling middleware
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, _next) => {
  console.error('Error:', err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler for undefined routes (must be last)
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.originalUrl,
    suggestion: "Try visiting / for the home page",
    availableRoutes: [
      "GET /",
      "GET /welcome",
      "GET /health",
      "GET /api/products",
      "GET /api/products/:id",
      "GET /api/products/categories/list",
      "POST /api/products"
    ]
  });
});

// Start server
app.listen(PORT, () => {
  console.log('🚀 Express.js Server Information:');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`📡 Server running on port ${PORT}`);
  console.log(`🌐 Local: http://localhost:${PORT}`);
  console.log(`🏠 Home route: http://localhost:${PORT}/`);
  console.log(`🎨 Welcome page: http://localhost:${PORT}/welcome`);
  console.log(`❤️ Health check: http://localhost:${PORT}/health`);
  console.log(`📦 Products API: http://localhost:${PORT}/api/products`);
  console.log(`⚡ Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('✅ Small Product Site Backend Ready!');
  console.log('📝 As requested: Visit / to see "Welcome to our site"');
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('👋 SIGTERM received, shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('👋 SIGINT received, shutting down gracefully...');
  process.exit(0);
});

export default app;