// routes/index.js - Main routes for the product site
import express from 'express';

const router = express.Router();

// Home route - exactly as requested in the requirements
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: "Welcome to our site",
    description: "This is the home route for our small product site",
    timestamp: new Date().toISOString(),
    endpoints: [
      { path: '/', method: 'GET', description: 'Home page welcome message' },
      { path: '/health', method: 'GET', description: 'Server health check' },
      { path: '/api/products', method: 'GET', description: 'Get all products' },
      { path: '/api/products/:id', method: 'GET', description: 'Get specific product' }
    ]
  });
});

// Alternative HTML response for browsers
router.get('/welcome', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to Our Site</title>
        <style>
            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                max-width: 800px;
                margin: 50px auto;
                padding: 20px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                text-align: center;
            }
            .container {
                background: rgba(255, 255, 255, 0.1);
                backdrop-filter: blur(10px);
                border-radius: 20px;
                padding: 40px;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            }
            h1 { font-size: 2.5em; margin-bottom: 20px; }
            p { font-size: 1.2em; line-height: 1.6; }
            .features {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 20px;
                margin-top: 30px;
            }
            .feature {
                background: rgba(255, 255, 255, 0.1);
                padding: 20px;
                border-radius: 10px;
                border: 1px solid rgba(255, 255, 255, 0.2);
            }
            .api-link {
                display: inline-block;
                margin: 10px;
                padding: 10px 20px;
                background: rgba(255, 255, 255, 0.2);
                color: white;
                text-decoration: none;
                border-radius: 8px;
                border: 1px solid rgba(255, 255, 255, 0.3);
                transition: all 0.3s ease;
            }
            .api-link:hover {
                background: rgba(255, 255, 255, 0.3);
                transform: translateY(-2px);
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>🌟 Welcome to Our Site</h1>
            <p>This is a proof of concept Express.js server for our small product site. The backend is clean, scalable, and ready for future features!</p>
            
            <div class="features">
                <div class="feature">
                    <h3>🚀 Fast & Lightweight</h3>
                    <p>Built with Express.js for optimal performance</p>
                </div>
                <div class="feature">
                    <h3>📱 API Ready</h3>
                    <p>RESTful endpoints ready for integration</p>
                </div>
                <div class="feature">
                    <h3>🔧 Scalable</h3>
                    <p>Clean code structure for future features</p>
                </div>
                <div class="feature">
                    <h3>🛡️ Robust</h3>
                    <p>Error handling and logging included</p>
                </div>
            </div>

            <div style="margin-top: 30px;">
                <h3>🔗 API Endpoints:</h3>
                <a href="/" class="api-link">JSON Home</a>
                <a href="/health" class="api-link">Health Check</a>
                <a href="/api/products" class="api-link">Products API</a>
            </div>
        </div>
    </body>
    </html>
  `);
});

export default router;