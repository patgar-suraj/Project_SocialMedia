# Image Caption AI - Quick Start Guide

## 🚀 Quick Setup (2 minutes)

### Prerequisites
- Node.js 16+ installed
- Backend already set up and running on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**:
   ```bash
   cd frontend
   ```

2. **Dependencies are already installed** (including axios):
   ```bash
   npm install  # Optional - only if needed
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   - Frontend runs on `http://localhost:5173`

4. **Open in browser**:
   - Visit `http://localhost:5173`

## 📋 Component Overview

| Component | Path | Purpose |
|-----------|------|---------|
| **Home** | `src/components/Home.jsx` | Protected home page - checks auth |
| **Register** | `src/user/Register.jsx` | User registration form |
| **Login** | `src/user/Login.jsx` | User login form |
| **ImageCaption** | `src/components/ImageCaption.jsx` | Upload image & generate caption |
| **NavBar** | `src/components/NavBar.jsx` | Navigation with auth status |
| **API Service** | `src/services/api.js` | Axios configuration & API calls |

## 🔐 Authentication Flow

```
User Visits / 
    ↓
Check localStorage for user
    ↓
User found? → Show Home + ImageCaption ✓
    ↓ No
Redirect to Login
    ↓
New user? → Redirect to Register
    ↓ Yes
Enter credentials → POST /api/auth/register
    ↓ Success
Save user & redirect to Home
```

## 📤 Image Upload Flow

```
Select Image
    ↓
Preview displayed
    ↓
Click "Generate Caption"
    ↓
Send FormData to POST /api/post (with auth token)
    ↓
Backend processes image with AI
    ↓
Caption returned & displayed
    ↓
Clear form for next upload
```

## 🎯 User Flows

### New User (Register)
1. Click "Register" button in NavBar
2. Fill in username & password
3. Click "Register"
4. Automatically logged in & redirected to home
5. Can now upload images

### Existing User (Login)
1. Click "Login" button in NavBar
2. Enter credentials
3. Click "Login"
4. Redirected to home
5. Can now upload images

### Logout
1. Click "Logout" button in NavBar
2. Session cleared from localStorage
3. Redirected to login page
4. Cannot access home until login again

## 🛠️ File Structure Explanation

```
src/
├── App.jsx                    # Main router - defines all routes
├── main.jsx                   # Entry point with BrowserRouter
├── components/
│   ├── Home.jsx              # Protected route, redirects if not logged in
│   ├── ImageCaption.jsx      # Image upload form & caption display
│   └── NavBar.jsx            # Auth-aware navigation bar
├── user/
│   ├── Register.jsx          # Registration form component
│   └── Login.jsx             # Login form component
├── services/
│   └── api.js                # Axios instance & API functions
└── assets/                   # Images & static files
```

## 🔗 API Endpoints Used

### In `api.js`:
- `registerUser(username, password)` → POST `/api/auth/register`
- `loginUser(username, password)` → POST `/api/auth/login`
- `createPost(formData)` → POST `/api/post` (requires auth)
- `checkAuth()` → GET `/api/auth/me` (optional, not used yet)

## 💾 LocalStorage Usage

The app uses localStorage to persist authentication:

```javascript
// Register/Login Success:
localStorage.setItem('user', JSON.stringify(user_object));
localStorage.setItem('token', token_string);

// Check if logged in (in Home.jsx):
const user = localStorage.getItem('user');
if (!user) navigate('/login');

// Logout:
localStorage.removeItem('user');
localStorage.removeItem('token');
```

## 🎨 Styling Notes

- **Framework**: Tailwind CSS
- **Color Theme**: Dark mode with indigo accent (#6366f1)
- **Responsive**: Mobile-friendly design
- **Pre-configured**: tailwindcss already installed

## ⚙️ Configuration

### Backend URL
In `src/services/api.js` line 3:
```javascript
const API = axios.create({
  baseURL: 'http://localhost:5000/api',  // Change if backend port differs
  withCredentials: true,
});
```

## 🧪 Testing the App

### Test Registration
1. Go to /register
2. Enter: username=`testuser`, password=`password123`
3. Should register and redirect to home

### Test Login
1. Go to /login
2. Enter registered credentials
3. Should redirect to home with greeting

### Test Image Upload
1. Click "Upload an image"
2. Select any image file
3. Click "Generate Caption"
4. Wait for response
5. Caption should display below

## 🐛 Common Issues & Fixes

| Issue | Cause | Fix |
|-------|-------|-----|
| Blank home page | Not logged in | Register or login first |
| CORS error | Backend not responding | Check backend is running on :5000 |
| Image upload fails | Server error | Check backend logs |
| "Not logged in" message | Session expired | Login again |
| Routes not working | BrowserRouter issue | Check main.jsx has BrowserRouter |

## 📦 Installed Packages

```bash
✓ react ^19.2.0
✓ react-dom ^19.2.0
✓ react-router-dom ^7.11.0
✓ axios ^1.13.2 (newly installed)
✓ tailwindcss ^4.1.18
```

## 🎓 Learning Points

- **React Router**: Client-side routing with protected routes
- **Axios**: HTTP requests with FormData for file uploads
- **State Management**: useState for form data & UI state
- **localStorage**: Client-side persistent storage
- **Authentication Flow**: Registration → Login → Protected Routes
- **Tailwind CSS**: Utility-first CSS framework

## 📞 Next Steps

1. ✅ Start backend: `npm start` (in backend directory)
2. ✅ Start frontend: `npm run dev` (in frontend directory)
3. ✅ Open `http://localhost:5173`
4. ✅ Register a new account
5. ✅ Upload an image and generate a caption!

## 🎉 You're All Set!

Your social media image caption AI application is ready to use!
