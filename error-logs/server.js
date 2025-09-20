// server.js - Express.js Log File Reader
import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ES Module setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Create logs directory if it doesn't exist
const logsDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Home route - displays available log files
app.get('/', async (req, res) => {
  try {
    const files = fs.readdirSync(logsDir).filter(file => file.endsWith('.txt'));
    
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Error Log Reader</title>
          <style>
              body {
                  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                  max-width: 1200px;
                  margin: 0 auto;
                  padding: 20px;
                  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                  min-height: 100vh;
                  color: #333;
              }
              .container {
                  background: white;
                  border-radius: 15px;
                  padding: 30px;
                  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
                  backdrop-filter: blur(10px);
              }
              h1 {
                  color: #4a5568;
                  text-align: center;
                  margin-bottom: 30px;
                  font-size: 2.5em;
              }
              .description {
                  background: #f7fafc;
                  padding: 20px;
                  border-radius: 10px;
                  margin-bottom: 30px;
                  border-left: 4px solid #667eea;
              }
              .file-list {
                  display: grid;
                  gap: 15px;
                  margin-bottom: 30px;
              }
              .file-item {
                  background: #f8f9fa;
                  padding: 15px;
                  border-radius: 8px;
                  border: 1px solid #e2e8f0;
                  transition: all 0.3s ease;
              }
              .file-item:hover {
                  background: #e6fffa;
                  transform: translateY(-2px);
                  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
              }
              .file-link {
                  color: #667eea;
                  text-decoration: none;
                  font-weight: 600;
                  font-size: 1.1em;
              }
              .file-link:hover {
                  color: #4c51bf;
              }
              .no-files {
                  text-align: center;
                  color: #718096;
                  font-style: italic;
                  padding: 40px;
                  background: #f7fafc;
                  border-radius: 10px;
              }
              .upload-section {
                  background: #edf2f7;
                  padding: 20px;
                  border-radius: 10px;
                  margin-top: 20px;
              }
              .api-info {
                  background: #e6fffa;
                  padding: 15px;
                  border-radius: 8px;
                  margin-top: 20px;
                  border-left: 4px solid #38b2ac;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <h1>📄 Error Log File Reader</h1>
              
              <div class="description">
                  <h3>📋 About This Tool</h3>
                  <p>This Express.js application reads and displays the content of .txt log files stored on the server. 
                  It provides a clean web interface for developers to debug without directly accessing server files.</p>
                  <p><strong>Features:</strong> File listing, content display, error handling for missing/inaccessible files</p>
              </div>

              <h2>📁 Available Log Files (${files.length})</h2>
              
              ${files.length > 0 ? `
                <div class="file-list">
                  ${files.map(file => `
                    <div class="file-item">
                      <a href="/logs/${file}" class="file-link">📄 ${file}</a>
                      <div style="font-size: 0.9em; color: #718096; margin-top: 5px;">
                        Click to view file contents
                      </div>
                    </div>
                  `).join('')}
                </div>
              ` : `
                <div class="no-files">
                  <h3>📭 No log files found</h3>
                  <p>No .txt files are currently available in the logs directory.</p>
                  <p>Add some .txt files to the <code>logs/</code> folder to see them here.</p>
                </div>
              `}

              <div class="api-info">
                  <h3>🔗 API Usage</h3>
                  <p><strong>View specific file:</strong> <code>GET /logs/filename.txt</code></p>
                  <p><strong>List all files:</strong> <code>GET /api/files</code></p>
                  <p><strong>File content API:</strong> <code>GET /api/logs/filename.txt</code></p>
              </div>
          </div>
      </body>
      </html>
    `);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error reading logs directory",
      error: error.message
    });
  }
});

// API route to list all .txt files
app.get('/api/files', (req, res) => {
  try {
    const files = fs.readdirSync(logsDir).filter(file => file.endsWith('.txt'));
    const fileDetails = files.map(file => {
      const filePath = path.join(logsDir, file);
      const stats = fs.statSync(filePath);
      return {
        name: file,
        size: stats.size,
        modified: stats.mtime,
        created: stats.ctime
      };
    });

    res.json({
      success: true,
      count: files.length,
      files: fileDetails
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error reading logs directory",
      error: error.message
    });
  }
});

// Route to display specific log file content on web page
app.get('/logs/:filename', (req, res) => {
  const filename = req.params.filename;
  
  // Security check - only allow .txt files
  if (!filename.endsWith('.txt')) {
    return res.status(400).send(`
      <!DOCTYPE html>
      <html>
      <head><title>Invalid File Type</title></head>
      <body style="font-family: Arial, sans-serif; max-width: 800px; margin: 50px auto; padding: 20px;">
        <h1 style="color: #e53e3e;">❌ Invalid File Type</h1>
        <p>Only .txt files are allowed. Please select a valid log file.</p>
        <a href="/" style="color: #667eea;">← Back to file list</a>
      </body>
      </html>
    `);
  }

  const filePath = path.join(logsDir, filename);

  try {
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).send(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>File Not Found</title>
          <style>
            body { font-family: Arial, sans-serif; max-width: 800px; margin: 50px auto; padding: 20px; }
            .error { background: #fed7d7; border: 1px solid #fc8181; padding: 20px; border-radius: 8px; }
          </style>
        </head>
        <body>
          <div class="error">
            <h1 style="color: #e53e3e;">📄 File Not Found</h1>
            <p><strong>File:</strong> ${filename}</p>
            <p><strong>Error:</strong> The requested log file does not exist on the server.</p>
            <p><strong>Path:</strong> <code>${filePath}</code></p>
          </div>
          <a href="/" style="color: #667eea;">← Back to file list</a>
        </body>
        </html>
      `);
    }

    // Read file content
    const content = fs.readFileSync(filePath, 'utf8');
    const stats = fs.statSync(filePath);

    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Log: ${filename}</title>
          <style>
              body {
                  font-family: 'Courier New', monospace;
                  margin: 0;
                  padding: 20px;
                  background: #1a202c;
                  color: #e2e8f0;
                  line-height: 1.6;
              }
              .header {
                  background: #2d3748;
                  padding: 20px;
                  border-radius: 8px;
                  margin-bottom: 20px;
                  border-left: 4px solid #48bb78;
              }
              .file-info {
                  display: grid;
                  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                  gap: 15px;
                  margin-bottom: 20px;
              }
              .info-item {
                  background: #4a5568;
                  padding: 10px;
                  border-radius: 5px;
              }
              .content {
                  background: #2d3748;
                  padding: 20px;
                  border-radius: 8px;
                  white-space: pre-wrap;
                  font-family: 'Courier New', monospace;
                  font-size: 14px;
                  max-height: 70vh;
                  overflow-y: auto;
                  border: 1px solid #4a5568;
              }
              .back-link {
                  color: #68d391;
                  text-decoration: none;
                  font-weight: bold;
              }
              .back-link:hover {
                  color: #48bb78;
              }
              .empty {
                  color: #a0aec0;
                  font-style: italic;
                  text-align: center;
                  padding: 40px;
              }
          </style>
      </head>
      <body>
          <div class="header">
              <h1>📄 ${filename}</h1>
              <div class="file-info">
                  <div class="info-item">
                      <strong>Size:</strong> ${(stats.size / 1024).toFixed(2)} KB
                  </div>
                  <div class="info-item">
                      <strong>Modified:</strong> ${stats.mtime.toLocaleString()}
                  </div>
                  <div class="info-item">
                      <strong>Lines:</strong> ${content.split('\n').length}
                  </div>
              </div>
              <a href="/" class="back-link">← Back to file list</a>
          </div>
          
          <div class="content">
              ${content.trim() || '<div class="empty">📭 This file is empty</div>'}
          </div>
      </body>
      </html>
    `);

  } catch (error) {
    // Handle file access errors
    let errorMessage = "Unknown error occurred";
    let errorCode = 500;

    if (error.code === 'ENOENT') {
      errorMessage = "File not found";
      errorCode = 404;
    } else if (error.code === 'EACCES') {
      errorMessage = "Permission denied - cannot access file";
      errorCode = 403;
    } else if (error.code === 'EISDIR') {
      errorMessage = "Path is a directory, not a file";
      errorCode = 400;
    }

    res.status(errorCode).send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Error Reading File</title>
        <style>
          body { font-family: Arial, sans-serif; max-width: 800px; margin: 50px auto; padding: 20px; }
          .error { background: #fed7d7; border: 1px solid #fc8181; padding: 20px; border-radius: 8px; }
          .error-details { background: #f7fafc; padding: 15px; border-radius: 5px; margin-top: 15px; }
        </style>
      </head>
      <body>
        <div class="error">
          <h1 style="color: #e53e3e;">⚠️ Error Reading File</h1>
          <p><strong>File:</strong> ${filename}</p>
          <p><strong>Error:</strong> ${errorMessage}</p>
          
          <div class="error-details">
            <h3>Technical Details:</h3>
            <p><strong>Error Code:</strong> ${error.code || 'Unknown'}</p>
            <p><strong>Path:</strong> <code>${filePath}</code></p>
            <p><strong>Message:</strong> ${error.message}</p>
          </div>
        </div>
        <a href="/" style="color: #667eea;">← Back to file list</a>
      </body>
      </html>
    `);
  }
});

// API route for raw file content (JSON response)
app.get('/api/logs/:filename', (req, res) => {
  const filename = req.params.filename;
  
  if (!filename.endsWith('.txt')) {
    return res.status(400).json({
      success: false,
      message: "Only .txt files are allowed"
    });
  }

  const filePath = path.join(logsDir, filename);

  try {
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        success: false,
        message: "File not found",
        filename: filename,
        path: filePath
      });
    }

    const content = fs.readFileSync(filePath, 'utf8');
    const stats = fs.statSync(filePath);

    res.json({
      success: true,
      filename: filename,
      content: content,
      size: stats.size,
      modified: stats.mtime,
      lines: content.split('\n').length
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error reading file",
      filename: filename,
      error: error.message,
      code: error.code
    });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).send(`
    <!DOCTYPE html>
    <html>
    <head><title>Page Not Found</title></head>
    <body style="font-family: Arial, sans-serif; max-width: 800px; margin: 50px auto; padding: 20px;">
      <h1 style="color: #e53e3e;">404 - Page Not Found</h1>
      <p>The requested page could not be found.</p>
      <a href="/" style="color: #667eea;">← Go to home page</a>
    </body>
    </html>
  `);
});

// Error handler
app.use((err, req, res) => {
  console.error('Server Error:', err);
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: err.message
  });
});

// Start server
app.listen(PORT, () => {
  console.log('🚀 Error Log Reader Server Started!');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`📡 Server running on port ${PORT}`);
  console.log(`🌐 Local: http://localhost:${PORT}`);
  console.log(`📄 View logs: http://localhost:${PORT}/logs/filename.txt`);
  console.log(`📋 API: http://localhost:${PORT}/api/files`);
  console.log(`📁 Logs directory: ${logsDir}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('✅ Ready to serve log files!');
});

export default app;