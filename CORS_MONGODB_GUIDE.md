# CORS & MongoDB Authentication Setup

## 🔄 What Changed

### ✅ Backend Updates

#### 1. CORS Configuration (app.js)
```javascript
const cors = require("cors")

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}))
```
- Enables cross-origin requests from frontend
- Allows credentials (cookies) to be sent
- Specifies allowed HTTP methods

#### 2. New API Endpoints

**Logout Endpoint**
```
POST /api/auth/logout
Description: Clear JWT cookie and end session
Response: { message: "logged out successfully" }
```

**Check Auth Endpoint**
```
GET /api/auth/me
Description: Verify user authentication
Headers: Cookie with JWT token (auto-sent by axios)
Response: { message: "user authenticated", user: {...} }
```

#### 3. HTTP-Only Cookies
```javascript
res.cookie("token", token, {
  httpOnly: true,              // Cannot be accessed by JavaScript
  secure: process.env.NODE_ENV === "production",  // HTTPS only in production
  sameSite: "strict",          // CSRF protection
  expires: new Date(...)       // Expiration date
})
```

### ✅ Frontend Updates

#### 1. Removed localStorage
- No more `localStorage.setItem('user', ...)`
- No more `localStorage.getItem('user')`
- No more manual token storage

#### 2. Server-Side Sessions with Cookies
- JWT stored in HTTP-only cookie (set by backend)
- Axios automatically sends cookie with `withCredentials: true`
- No client-side token management needed

#### 3. Updated Components

**Register.jsx**
```javascript
// Before: localStorage.setItem('user', ...)
// After: JWT cookie automatically set by backend
navigate('/');  // Just redirect, cookie is handled
```

**Login.jsx**
```javascript
// Before: localStorage.setItem('user', ...) + localStorage.setItem('token', ...)
// After: JWT cookie automatically set by backend
navigate('/');  // Just redirect
```

**Home.jsx**
```javascript
// Before: Check localStorage
// After: Verify with backend via checkAuth()
const verifyAuth = async () => {
  try {
    await checkAuth();  // API endpoint /auth/me
    setIsAuthenticated(true);
  } catch (err) {
    navigate('/login');
  }
};
```

**NavBar.jsx**
```javascript
// Before: Read from localStorage
// After: Fetch from API
const fetchUser = async () => {
  const response = await checkAuth();
  setUser(response.data.user);
};

// Before: Clear localStorage
// After: Call logout endpoint
const handleLogout = async () => {
  await API.post('/auth/logout');  // Clears cookie
  navigate('/login');
};
```

#### 4. API Service (api.js)
```javascript
const API = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true,  // Auto-send cookies with requests
  headers: {
    'Content-Type': 'application/json',
  },
});
```

---

## 🔐 How Authentication Works Now

### Registration Flow
```
User fills form
    ↓
POST /api/auth/register
    ↓ Backend validates & creates user
Creates JWT token
    ↓
Sets HTTP-only cookie with JWT
    ↓
Responds with user data
    ↓
Frontend redirects to /
    ↓
Cookie automatically sent with all requests
```

### Login Flow
```
User enters credentials
    ↓
POST /api/auth/login
    ↓ Backend validates credentials
Creates JWT token
    ↓
Sets HTTP-only cookie with JWT
    ↓
Responds with user data
    ↓
Frontend redirects to /
    ↓
Cookie automatically sent with all requests
```

### Protected Route Check
```
User visits / (home)
    ↓
Home.jsx calls checkAuth()
    ↓
GET /api/auth/me with cookie
    ↓
Backend verifies JWT token
    ↓
✓ Valid: User authenticated, show page
✗ Invalid: Redirect to /login
```

### Logout Flow
```
User clicks Logout
    ↓
NavBar calls API.post('/auth/logout')
    ↓
Backend clears cookie
    ↓
Frontend redirects to /login
    ↓
Cookie no longer sent with requests
```

---

## 🛡️ Security Benefits

### HTTP-Only Cookies
- ✅ Cannot be accessed by JavaScript (XSS protection)
- ✅ Automatically sent with same-origin requests
- ✅ Safer than localStorage

### CORS Configuration
- ✅ Only allows frontend origin (http://localhost:5173)
- ✅ Credentials sent only to allowed origins
- ✅ Prevents cross-site attacks

### SameSite Cookies
- ✅ Protects against CSRF attacks
- ✅ Cookies only sent if request originates from same site

### Secure Flag
- ✅ Cookies only sent over HTTPS in production
- ✅ Prevents interception over HTTP

---

## 📋 Setup Instructions

### Backend Setup

1. **Install cors package** (if not already installed)
```bash
cd backend
npm install cors
```

2. **Verify .env file has:**
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
NODE_ENV=development
PORT=5000
```

3. **Start backend server:**
```bash
npm start
# Server runs on http://localhost:5000
```

### Frontend Setup

1. **Install dependencies** (axios already installed)
```bash
cd frontend
npm install
```

2. **Start frontend:**
```bash
npm run dev
# Frontend runs on http://localhost:5173
```

---

## 🧪 Testing the New Setup

### Test Registration
```
1. Go to http://localhost:5173/register
2. Username: testuser
3. Password: password123
4. Click Register
5. Check Network tab → Cookies
   ✓ Should see "token" cookie set
6. Should redirect to home
```

### Test Authentication Check
```
1. Open Developer Tools → Application → Cookies
2. Should see "token" cookie with JWT value
3. Visit /login → Should redirect to /
   (because cookie is still valid)
4. Refresh page → Should stay on /
   (because cookie is sent with request)
```

### Test Logout
```
1. Click Logout button
2. Check Cookies → token should be gone
3. Should redirect to /login
4. Visit / → Should redirect to /login
   (because no cookie)
```

### Test CORS
```
Network requests should show:
- Request Origin: http://localhost:5173
- Response Access-Control-Allow-Origin: http://localhost:5173
- Response includes Set-Cookie header
```

---

## 🔍 Debugging Tips

### Check Cookies in Browser
```
DevTools → Application → Cookies → http://localhost:5173
Should see:
- Name: token
- Value: eyJhbGciOiJIUzI1NiIs...
- HttpOnly: ✓ (checked)
- Secure: ✗ (unchecked in dev)
- SameSite: Strict
```

### Check Network Requests
```
DevTools → Network → (any API request)
Request Headers should include:
  Cookie: token=eyJhbGciOiJIUzI1NiIs...

Response Headers should include:
  Set-Cookie: token=...; HttpOnly; SameSite=Strict
```

### Check CORS in Console
If you see CORS errors:
- Verify backend CORS config includes frontend URL
- Check backend is running on correct port
- Verify axios `withCredentials: true`

### Verify MongoDB Data
```bash
# Connect to MongoDB and check users collection
db.users.find()

# Should show registered users:
{
  _id: ObjectId(...),
  username: "testuser",
  password: "$2a$10$...",  // hashed
  createdAt: ISODate(...)
}
```

---

## 📝 API Reference

### POST /api/auth/register
```
Request:
  Content-Type: application/json
  {
    "username": "testuser",
    "password": "password123"
  }

Response (201):
  Set-Cookie: token=...
  {
    "message": "user registered successfully",
    "user": {
      "id": "60d5ec49c...",
      "username": "testuser"
    }
  }

Errors (400):
  {
    "message": "username already in use"
  }
```

### POST /api/auth/login
```
Request:
  Content-Type: application/json
  {
    "username": "testuser",
    "password": "password123"
  }

Response (200):
  Set-Cookie: token=...
  {
    "message": "user logged in successfully",
    "user": {
      "id": "60d5ec49c...",
      "username": "testuser"
    }
  }

Errors (400):
  {
    "message": "user not exist"
  }
  {
    "message": "invalid password"
  }
```

### POST /api/auth/logout
```
Request:
  Cookie: token=...

Response (200):
  Set-Cookie: token=; Max-Age=0  (clears cookie)
  {
    "message": "logged out successfully"
  }
```

### GET /api/auth/me
```
Request:
  Cookie: token=...

Response (200):
  {
    "message": "user authenticated",
    "user": {
      "id": "60d5ec49c...",
      "username": "testuser"
    }
  }

Errors (401):
  {
    "message": "invalid token"
  }
  {
    "message": "no token found"
  }
```

---

## ✨ Benefits Summary

### Before (localStorage)
- ❌ Vulnerable to XSS attacks
- ❌ Manual token management
- ❌ Token visible in localStorage
- ❌ Manual logout cleanup

### After (HTTP-Only Cookies + CORS)
- ✅ XSS protection (HTTP-only)
- ✅ Automatic cookie handling by browser
- ✅ CORS ensures only allowed origins
- ✅ Server-side session management
- ✅ CSRF protection (SameSite)
- ✅ Secure in production (HTTPS only)

---

## 🚀 Production Checklist

Before deploying:
- [ ] Change `NODE_ENV=production`
- [ ] Update CORS origin to frontend domain
- [ ] Enable HTTPS (secure flag will activate)
- [ ] Use strong JWT_SECRET
- [ ] Set secure MongoDB credentials
- [ ] Update backend baseURL in api.js
- [ ] Test CORS with production domain

---

## 📚 Files Modified

### Backend
- ✅ `src/app.js` - Added CORS
- ✅ `src/controller/auth.controller.js` - Added logout & checkAuth
- ✅ `src/router/auth.router.js` - Added new routes

### Frontend
- ✅ `src/services/api.js` - Corrected baseURL
- ✅ `src/user/Register.jsx` - Removed localStorage
- ✅ `src/user/Login.jsx` - Removed localStorage
- ✅ `src/components/Home.jsx` - Use checkAuth() API
- ✅ `src/components/NavBar.jsx` - Use API for user data & logout

---

**Your application is now secure with CORS & MongoDB!** 🎉
