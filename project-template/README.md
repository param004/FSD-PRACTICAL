# Product Site Backend

A simple Express.js backend for a small product site with a clean black and white theme. This serves as a proof of concept to help the team understand the Express framework structure.

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm

### Installation

```bash
# Clone or navigate to the project
cd product-site-backend

# Install dependencies
npm install

# Start the server
npm start

# For development with auto-restart
npm run dev
```

### Access the Application

- **Home Page**: http://localhost:3000
- **API Endpoint**: http://localhost:3000/api
- **Health Check**: http://localhost:3000/health

## 📁 Project Structure

```
product-site-backend/
├── server.js           # Main Express server
├── package.json        # Dependencies and scripts
├── views/              # EJS templates
│   ├── home.ejs       # Home page
│   └── 404.ejs        # Error page
└── public/            # Static files
    └── css/
        └── style.css  # Black & white theme
```

## ✨ Features

- **Express.js Server**: Clean, scalable backend structure
- **Home Route**: Displays "Welcome to our site" message
- **JSON API**: RESTful endpoint for data access
- **Error Handling**: Custom 404 page and error responses
- **Black & White Theme**: Simple, professional design
- **Static File Serving**: CSS and asset support
- **Health Monitoring**: Server health check endpoint

## 🔗 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Home page with welcome message |
| GET | `/api` | JSON API response |
| GET | `/health` | Server health check |

## 🎨 Design Theme

- **Header**: Black background with white text
- **Content**: White background with black text
- **Navigation**: Hover effects with color inversion
- **Responsive**: Mobile-friendly design
- **Professional**: Clean, minimal aesthetic

## 🛠️ Technology Stack

- **Backend**: Node.js + Express.js
- **Templates**: EJS (Embedded JavaScript)
- **Styling**: Pure CSS (Black & White theme)
- **Development**: Nodemon for auto-restart

## 🔧 Development

### Available Scripts

- `npm start` - Start the production server
- `npm run dev` - Start development server with auto-restart
- `npm run server` - Alternative start command

### Project Goals

1. **Team Understanding**: Help developers learn Express.js structure
2. **Scalable Foundation**: Ready for future feature additions
3. **Clean Code**: Well-organized, maintainable codebase
4. **Production Ready**: Error handling and logging included

## 📝 Adding New Features

### Adding Routes
```javascript
app.get('/new-route', (req, res) => {
  res.render('new-page', { title: 'New Page' });
});
```

### Adding Templates
Create new `.ejs` files in the `views/` directory.

### Adding Styles
Modify `public/css/style.css` or add new CSS files.

## 🤝 Contributing

1. Follow the existing code structure
2. Maintain the black and white theme
3. Add proper error handling
4. Update documentation for new features

## 📄 License

MIT License - Feel free to use this as a starting point for your projects.

---

**Built with ❤️ for team onboarding and Express.js learning**+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
