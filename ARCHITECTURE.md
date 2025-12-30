# 🎯 Frontend Architecture & Visual Guide

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (React + Vite)                   │
│                    http://localhost:5173                     │
└────────────────────────────┬────────────────────────────────┘
                             │
                             ↓
                    ┌────────────────┐
                    │  React Router  │
                    │  (Client-Side) │
                    └────────┬───────┘
                             │
         ┌───────────────────┼───────────────────┐
         ↓                   ↓                   ↓
    /register             /login              / (Home)
    ┌──────────┐         ┌──────────┐      ┌─────────┐
    │Register  │         │ Login    │      │ Home    │
    │Component │         │Component │      │Component│
    └──────────┘         └──────────┘      └────┬────┘
         │                   │                   │
         └─────────┬─────────┘                   │
                   │                             │
                   ↓                             ↓
            ┌──────────────┐            ┌─────────────────┐
            │ localStorage │            │  NavBar         │
            │ (user data)  │            │ ImageCaption    │
            └──────────────┘            └────────┬────────┘
                   │                             │
                   └─────────┬───────────────────┘
                             │
                             ↓
                    ┌─────────────────┐
                    │  API Service    │
                    │  (Axios)        │
                    └────────┬────────┘
                             │
                             ↓
┌────────────────────────────────────────────────────────────┐
│              BACKEND (Express.js)                           │
│              http://localhost:5000/api                      │
│  /auth/register  │  /auth/login  │  /post                 │
└────────────────────────────────────────────────────────────┘
```

## Component Hierarchy

```
App.jsx
├── Routes
│   ├── /register
│   │   └── Register.jsx
│   │       ├── Input: username
│   │       ├── Input: password
│   │       └── API: registerUser()
│   │
│   ├── /login
│   │   └── Login.jsx
│   │       ├── Input: username
│   │       ├── Input: password
│   │       └── API: loginUser()
│   │
│   └── / (Protected)
│       └── Home.jsx (checks localStorage)
│           ├── NavBar.jsx
│           │   ├── Logo
│           │   ├── Conditional Buttons
│           │   │   ├── If logged in: Username + Logout
│           │   │   └── If not: Login + Register
│           │   └── Shows from: localStorage.getItem('user')
│           │
│           └── ImageCaption.jsx
│               ├── File Input
│               ├── Image Preview
│               ├── Form Submit
│               ├── Loading State
│               ├── Error Display
│               ├── Success Display
│               └── Caption Display
```

## Data Flow Diagrams

### Registration Flow
```
User Input (username, password)
         │
         ↓
    Form Validation
         │
         ↓
  registerUser(username, password)
         │
         ↓
  POST /api/auth/register
         │
         ├─→ Success: { user: {...}, token: "..." }
         │           │
         │           ↓
         │   localStorage.setItem('user', user)
         │           │
         │           ↓
         │   navigate('/') → Home
         │
         └─→ Error: { message: "..." }
                     │
                     ↓
              Display error message
```

### Login Flow
```
User Input (username, password)
         │
         ↓
    Form Validation
         │
         ↓
   loginUser(username, password)
         │
         ↓
  POST /api/auth/login
         │
         ├─→ Success: { user: {...}, token: "..." }
         │           │
         │           ↓
         │   localStorage.setItem('user', user)
         │   localStorage.setItem('token', token)
         │           │
         │           ↓
         │   navigate('/') → Home
         │
         └─→ Error: { message: "..." }
                     │
                     ↓
              Display error message
```

### Image Upload Flow
```
User selects image
         │
         ↓
FileReader creates preview
         │
         ↓
User clicks "Generate Caption"
         │
         ↓
FormData.append('image', file)
         │
         ↓
  createPost(formData)
         │
         ↓
POST /api/post (with auth token in cookie)
         │
         ├─→ Success: { post: { caption: "...", image: "url", _id: "..." } }
         │           │
         │           ↓
         │   setCaption(response.data.post.caption)
         │   setSuccess('Caption generated successfully!')
         │           │
         │           ↓
         │   Display caption
         │   Clear form
         │
         └─→ Error: { message: "..." }
                     │
                     ↓
              Display error message
```

## State Management

### Register Component
```javascript
State:
  - username: string
  - password: string
  - error: string (error message)
  - loading: boolean (API call state)

Actions:
  - setUsername(value)
  - setPassword(value)
  - handleSubmit() → calls registerUser API
```

### Login Component
```javascript
State:
  - username: string
  - password: string
  - error: string (error message)
  - loading: boolean (API call state)

Actions:
  - setUsername(value)
  - setPassword(value)
  - handleSubmit() → calls loginUser API
```

### Home Component
```javascript
Effects:
  - useEffect: Check localStorage.getItem('user')
    - If not found: navigate('/login')
    - If found: Display ImageCaption

Behavior:
  - Protected route
  - Auto-redirects unauthenticated users
```

### NavBar Component
```javascript
State:
  - user: object | null (from localStorage)

Effects:
  - useEffect: Load user from localStorage on mount

Actions:
  - handleLogout(): Clear localStorage + navigate('/login')
  - Conditional rendering based on user state
```

### ImageCaption Component
```javascript
State:
  - image: File | null
  - preview: string (data URL)
  - caption: string (generated)
  - loading: boolean (API call state)
  - error: string
  - success: string

Actions:
  - handleImageChange(): Update image + preview
  - handleSubmit(): Call createPost API
  - Display caption on success
  - Display error message on failure
```

## LocalStorage Data Structure

```javascript
// After successful registration/login:
localStorage = {
  user: JSON.stringify({
    _id: "mongo_id",
    username: "testuser",
    password: "hashed_password",
    ...
  }),
  
  token: "jwt_token_string"
}

// After logout:
localStorage = {
  // Empty
}
```

## API Request/Response Format

### Register
```
Request:
  POST /api/auth/register
  Content-Type: application/json
  {
    "username": "testuser",
    "password": "password123"
  }

Response (Success - 201):
  {
    "message": "user registered successfully",
    "user": {
      "_id": "60d5ec49c...",
      "username": "testuser",
      "password": "$2a$10...",
      ...
    }
  }

Response (Error - 400):
  {
    "message": "username already in use"
  }
```

### Login
```
Request:
  POST /api/auth/login
  Content-Type: application/json
  {
    "username": "testuser",
    "password": "password123"
  }

Response (Success - 200):
  {
    "message": "user logged in",
    "user": {...},
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }

Response (Error - 400):
  {
    "message": "invalid password"
  }
```

### Create Post (Image Upload)
```
Request:
  POST /api/post
  Content-Type: multipart/form-data
  Cookie: token=jwt_token
  
  FormData:
    - image: File

Response (Success - 201):
  {
    "message": "post created",
    "post": {
      "_id": "60d5...",
      "caption": "A person riding a bicycle...",
      "image": "https://s3.amazonaws.com/...",
      "user": "60d5ec49c...",
      ...
    }
  }

Response (Error - 401):
  {
    "message": "unauthorized"
  }

Response (Error - 500):
  {
    "message": "Error generating caption"
  }
```

## Component Communication

```
App
  │
  ├── Register → registerUser() → API → localStorage
  │
  ├── Login → loginUser() → API → localStorage
  │
  └── Home
      ├── NavBar
      │   └── Reads localStorage (user)
      │       └── Logout → Clear localStorage
      │
      └── ImageCaption
          └── createPost() → API → Display caption
```

## Error Handling Flow

```
API Call
  │
  ├── Success
  │   └── Handle response data
  │       └── Update state + localStorage
  │           └── Navigate to new route
  │
  └── Error
      └── axios error.response?.data?.message
          │
          ├── If available: Show specific error
          │
          └── If not available: Show generic error
              └── Keep user on current page
```

## URL Routing Structure

```
Browser URL          Component           Behavior
────────────────────────────────────────────────────────
/                    Home                Protected (redirects to /login if not auth)
/register            Register            Public (redirect to / if already auth)
/login               Login               Public (redirect to / if already auth)
/anything-else       Navigate to /       Catch-all redirect
```

## Styling System

```
Tailwind CSS Classes Used:
─────────────────────────

Colors:
  - Primary: #6366f1 (indigo)
  - Dark BG: #0c1019, #1a1f2e
  - Text: white, gray-300
  - Error: red-500/20, red-400
  - Success: green-500/20, green-400

Components:
  - Buttons: px-4 py-2 rounded hover:bg-...
  - Forms: border-[#3f46e1] focus:ring-2
  - Cards: bg-[#1a1f2e] rounded-lg p-8
  - Inputs: bg-[#0c1019] text-white
  - Backgrounds: bg-gradient-to-tr

Utilities:
  - Spacing: p-6, gap-4, mb-6
  - Flexbox: flex justify-between items-center
  - Display: hidden, block
  - Transitions: transition hover: states
```

## Performance Considerations

```
1. Component Splitting
   ├── Each component has single responsibility
   ├── Lazy loading via React Router
   └── Prevents unnecessary re-renders

2. State Management
   ├── Local state (useState) where possible
   ├── No global state needed
   └── localStorage for persistence

3. API Calls
   ├── Only when user interacts
   ├── Loading state prevents duplicate calls
   ├── Error handling prevents crashes
   └── FormData for efficient file upload

4. Rendering
   ├── Conditional rendering based on state
   ├── No unnecessary computations
   ├── useEffect cleanup
   └── Proper key usage in lists (N/A here)
```

## Security Measures

```
1. Authentication
   ├── JWT tokens in cookies (HTTP-only)
   ├── withCredentials enabled in axios
   └── Protected routes check localStorage

2. Data Validation
   ├── Form validation before submit
   ├── Backend validation (server-side)
   └── Error messages don't expose internals

3. Storage
   ├── Sensitive data in localStorage
   ├── No passwords stored client-side
   └── Token cleared on logout

4. Communication
   ├── CORS configured
   ├── HTTPS ready (in production)
   └── FormData for file uploads
```

## Testing Scenarios

```
Scenario 1: New User Registration
  1. Navigate to /register
  2. Fill form with valid data
  3. Submit → Success → Logged in + at /
  Expected: User logged in, NavBar shows username + logout

Scenario 2: Login Existing User
  1. Clear localStorage
  2. Navigate to /login
  3. Enter credentials
  4. Submit → Success → Logged in + at /
  Expected: Same as scenario 1

Scenario 3: Protected Route
  1. Clear localStorage (log out)
  2. Try navigate to /
  Expected: Redirected to /login

Scenario 4: Image Upload
  1. Be logged in
  2. Select image from local file system
  3. See preview
  4. Click Generate Caption
  5. Wait for response
  Expected: Caption displays below image

Scenario 5: Error Handling
  1. Try register with existing username
  Expected: Error message shows
  
  2. Try login with wrong password
  Expected: Error message shows
  
  3. Try upload without image
  Expected: Error message shows
```

---

**This visual guide provides complete understanding of:**
- ✅ Architecture & structure
- ✅ Component hierarchy
- ✅ Data flow & state management
- ✅ API integration
- ✅ Error handling
- ✅ Security measures
- ✅ Performance optimization
- ✅ Testing scenarios
