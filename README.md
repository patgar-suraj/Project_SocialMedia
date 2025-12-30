# Image Caption AI - Social Media Application

## 🎯 Project Overview

A full-stack web application for generating AI-powered captions for images. Users can register, login, and upload images to get AI-generated captions. Built with **React + Vite** (frontend) and **Express.js** (backend).

## 🚀 Quick Start (30 seconds)

### Prerequisites
- Node.js 16+ installed
- Backend running on `http://localhost:5000`

### Start Frontend
```bash
cd frontend
npm run dev
# Open http://localhost:5173
```

### User Actions
1. Click **Register** → Create account
2. Fill username & password → Submit
3. Auto-logged in & redirected to home
4. Click **Upload Image** → Select image
5. Click **Generate Caption** → View result
6. Click **Logout** to end session

## 📋 Documentation Files

| File | Purpose | Best For |
|------|---------|----------|
| **QUICK_START.md** | 2-minute setup guide | Getting started fast |
| **SETUP_GUIDE.md** | Complete setup instructions | Detailed configuration |
| **IMPLEMENTATION_SUMMARY.md** | What was built | Feature overview |
| **CHECKLIST.md** | Requirements verification | Validating completion |
| **CODE_EXAMPLES.md** | Full code snippets | Copy-paste reference |
| **ARCHITECTURE.md** | System design diagrams | Understanding structure |

## ✨ Key Features

### ✅ Authentication System
- User registration with username/password
- Secure login with JWT tokens
- Session persistence with localStorage
- Protected routes for authenticated users only
- Logout functionality with session clearing

### ✅ Image Upload & Caption Generation
- Drag-and-drop image upload
- Live image preview
- AI-powered caption generation
- Formatted caption display
- Support for all common image formats

### ✅ User Experience
- Dark theme with modern UI
- Responsive design (mobile-friendly)
- Real-time loading indicators
- User-friendly error messages
- Success notifications

### ✅ Navigation & Routing
- Client-side routing with React Router
- Dynamic navbar based on auth status
- Protected routes with auth checks
- Seamless page transitions

## 🏗️ Project Structure

```
Project_SocialMedia/
├── frontend/
│   ├── src/
│   │   ├── App.jsx                 (Main router)
│   │   ├── main.jsx                (Entry point)
│   │   ├── components/
│   │   │   ├── Home.jsx            (Protected home)
│   │   │   ├── ImageCaption.jsx    (Upload form)
│   │   │   └── NavBar.jsx          (Navigation)
│   │   ├── user/
│   │   │   ├── Register.jsx        (Registration)
│   │   │   └── Login.jsx           (Login)
│   │   ├── services/
│   │   │   └── api.js              (API service)
│   │   └── assets/
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── src/
│   │   ├── app.js
│   │   ├── controller/
│   │   ├── middleware/
│   │   ├── model/
│   │   ├── router/
│   │   ├── service/
│   │   └── db/
│   ├── server.js
│   └── package.json
│
└── Documentation/
    ├── QUICK_START.md
    ├── SETUP_GUIDE.md
    ├── IMPLEMENTATION_SUMMARY.md
    ├── CHECKLIST.md
    ├── CODE_EXAMPLES.md
    ├── ARCHITECTURE.md
    └── README.md (this file)
```

## 🔐 Authentication Flow

```
1. User Registration
   └─ Register.jsx → POST /api/auth/register → Login auto
   
2. User Login
   └─ Login.jsx → POST /api/auth/login → Save token & user
   
3. Protected Route
   └─ Home.jsx checks localStorage → Redirect if not logged in
   
4. Logout
   └─ NavBar → Clear localStorage → Redirect to login
```

## 📤 Image Upload Flow

```
1. Select Image
   └─ ImageCaption.jsx → FileReader → Show preview

2. Generate Caption
   └─ FormData → POST /api/post → Backend processes

3. Receive Caption
   └─ Response → Display caption → Clear form

4. Error Handling
   └─ API error → Show user-friendly message
```

## 🛠️ Technologies Used

### Frontend
- **React 19.2** - UI library
- **Vite 7.3** - Build tool
- **Axios 1.13** - HTTP client
- **React Router DOM 7.11** - Routing
- **Tailwind CSS 4.1** - Styling

### Backend
- **Express.js** - Server framework
- **MongoDB** - Database
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Multer** - File uploads

## 📦 Installation

### Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Backend Setup (Already Configured)
```bash
cd backend

# Install dependencies
npm install

# Configure .env file
# Add: MONGODB_URI, JWT_SECRET, etc.

# Start server
npm start
```

## 🔌 API Endpoints

### Authentication
```
POST /api/auth/register
  Body: { username, password }
  
POST /api/auth/login
  Body: { username, password }
```

### Posts/Captions
```
POST /api/post
  Headers: Cookie with JWT token
  Body: FormData with image file
  Returns: { caption, image_url, ... }
```

## 💾 LocalStorage Usage

```javascript
// After login/register
localStorage.setItem('user', JSON.stringify(userData));
localStorage.setItem('token', tokenString);

// Check authentication
const user = localStorage.getItem('user');
if (!user) navigate('/login');

// Logout
localStorage.removeItem('user');
localStorage.removeItem('token');
```

## 🎨 Styling

- **Framework**: Tailwind CSS
- **Theme**: Dark mode with indigo accent (#6366f1)
- **Responsive**: Mobile-first design
- **Animations**: Smooth transitions and hover effects

## 🧪 Testing the Application

### Test Registration
```
1. Go to /register
2. Username: testuser
3. Password: password123
4. Click Register
✓ Should redirect to home with greeting
```

### Test Login
```
1. Go to /login
2. Enter registered credentials
3. Click Login
✓ Should redirect to home with greeting
```

### Test Image Upload
```
1. Select an image
2. Click Generate Caption
3. Wait for response
✓ Caption should display below
```

### Test Protection
```
1. Clear browser localStorage
2. Try to access /
✓ Should redirect to /login
```

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| CORS error | Backend must allow frontend origin |
| Can't login | Check credentials, ensure backend running |
| Image upload fails | Check backend is running on :5000 |
| Can't access home | Clear localStorage and login again |
| Routes not working | Ensure BrowserRouter in main.jsx |

## 🔒 Security Features

- ✅ JWT token-based authentication
- ✅ Password hashing with bcryptjs
- ✅ HTTP-only secure cookies
- ✅ Protected routes with auth checks
- ✅ CORS configuration
- ✅ FormData for secure file transfer

## 📈 Performance Optimizations

- Component splitting for better organization
- LocalStorage for session persistence
- FormData for efficient file upload
- Lazy loading with React Router
- Conditional rendering to prevent unnecessary renders

## 🚀 Deployment

### Frontend (Vercel, Netlify, etc.)
```bash
npm run build
# Deploy the 'dist' folder
```

### Backend (Heroku, Railway, etc.)
```bash
git push heroku main
# Or use hosting service CLI
```

## 📚 Learn More

- [React Documentation](https://react.dev)
- [React Router Guide](https://reactrouter.com)
- [Axios Documentation](https://axios-http.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Express.js Guide](https://expressjs.com)

## 📞 Support

For issues or questions:
1. Check troubleshooting section above
2. Review documentation files
3. Check component code comments
4. Verify backend is running

## 📝 Version History

- **v1.0** (Current) - Initial release
  - User authentication system
  - Image upload functionality
  - Caption generation
  - Responsive UI

## 🎉 What's Included

✅ Complete authentication system
✅ Image upload form with preview
✅ Protected routes
✅ API integration with Axios
✅ Error handling & validation
✅ Responsive design
✅ Dark theme UI
✅ Comprehensive documentation
✅ Code examples
✅ Architecture diagrams

## 🔄 Next Steps

1. **Setup Backend**
   - Configure MongoDB connection
   - Set JWT_SECRET in .env
   - Run `npm start`

2. **Start Frontend**
   - Run `npm run dev`
   - Open http://localhost:5173

3. **Create Account**
   - Register new user
   - Automatic login
   - Test image upload

4. **Deploy** (Optional)
   - Build frontend
   - Deploy to hosting service
   - Update backend URL in api.js

## 📄 License

This project is part of Sheriyans Coding School curriculum.

---

## 🎯 Summary

Your **Image Caption AI** application is **fully functional** with:
- ✨ Complete authentication
- 📤 Image upload system  
- 🤖 AI caption generation
- 🎨 Professional UI/UX
- 📱 Responsive design
- 📚 Comprehensive documentation

**Ready to use!** Just start both servers and begin generating captions.
