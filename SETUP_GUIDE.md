# Image Caption AI - Setup & Usage Guide

## Project Structure

```
Project_SocialMedia/
├── backend/          # Express.js backend API
│   ├── src/
│   │   ├── app.js
│   │   ├── controller/
│   │   │   ├── auth.controller.js
│   │   │   └── post.controller.js
│   │   ├── middleware/
│   │   │   └── auth.middleware.js
│   │   ├── model/
│   │   │   ├── user.model.js
│   │   │   └── post.model.js
│   │   ├── router/
│   │   │   ├── auth.router.js
│   │   │   └── post.router.js
│   │   ├── service/
│   │   │   ├── ai.service.js
│   │   │   └── storage.service.js
│   │   └── db/
│   │       └── db.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
└── frontend/         # React + Vite frontend
    ├── src/
    │   ├── App.jsx
    │   ├── main.jsx
    │   ├── components/
    │   │   ├── Home.jsx         (Protected home page)
    │   │   ├── ImageCaption.jsx (Image upload & caption)
    │   │   └── NavBar.jsx       (Navigation with auth)
    │   ├── user/
    │   │   ├── Register.jsx     (Registration form)
    │   │   └── Login.jsx        (Login form)
    │   ├── services/
    │   │   └── api.js           (Axios API configuration)
    │   └── router/
    │       └── MainRouter.jsx
    ├── package.json
    ├── vite.config.js
    └── index.html
```

## Features Implemented

### ✅ Authentication System
- **Register Component**: New user registration with username & password
- **Login Component**: User login with session management
- **Protected Routes**: Only logged-in users can access caption generation
- **Local Storage**: User data and token storage for session persistence
- **Logout**: Clear session and redirect to login

### ✅ Image Caption Generation
- **File Upload**: Drag-and-drop or click to upload images
- **Image Preview**: Display selected image before submission
- **Caption Generation**: Send image to backend for AI caption generation
- **Caption Display**: Show generated caption in formatted view
- **Error Handling**: Display user-friendly error messages

### ✅ Navigation & Routing
- **React Router**: Client-side routing for all pages
- **Dynamic NavBar**: Shows login/register buttons for guests, logout for users
- **Route Protection**: Home page redirects to login if not authenticated

## Installation & Setup

### Backend Setup
```bash
cd backend

# Install dependencies
npm install

# Create .env file and configure
# Add your MongoDB connection, JWT secret, and API keys
echo "MONGODB_URI=your_mongodb_uri" > .env
echo "JWT_SECRET=your_secret_key" >> .env

# Start backend server
npm start
# Server runs on http://localhost:5000
```

### Frontend Setup
```bash
cd frontend

# Install dependencies (axios is already installed)
npm install

# Start development server
npm run dev
# Frontend runs on http://localhost:5173
```

## API Endpoints

### Authentication Endpoints
```
POST /api/auth/register
  Body: { username, password }
  Response: { message, user }

POST /api/auth/login
  Body: { username, password }
  Response: { message, user, token }
```

### Post/Caption Endpoints
```
POST /api/post
  Headers: Cookie with authentication token (auto-handled by middleware)
  Body: FormData with image file
  Response: { message, post: { caption, image, user, _id } }
```

## Component Details

### Register.jsx
- User registration form with username and password
- Form validation
- Error message display
- Redirect to login after successful registration
- Navigation link to login page

### Login.jsx
- User login form
- Stores user data and token in localStorage
- Error handling for invalid credentials
- Redirects to home page after successful login
- Navigation link to register page

### Home.jsx
- Protected route component
- Checks localStorage for user data
- Redirects to login if not authenticated
- Displays NavBar and ImageCaption components
- Full-page layout

### ImageCaption.jsx
- Image file input with preview
- Form submission for caption generation
- Loading state during API call
- Success/error message display
- Displays generated caption in formatted box
- Calls createPost API endpoint

### NavBar.jsx
- Dynamic navigation based on authentication state
- Shows user's username when logged in
- Logout button to clear session
- Login/Register buttons for guests
- Styled with Tailwind CSS

### api.js (API Service)
- Axios instance with baseURL configuration
- withCredentials enabled for cookie handling
- Four main functions:
  - `registerUser()`: Register new user
  - `loginUser()`: Login user
  - `createPost()`: Upload image and generate caption
  - `checkAuth()`: Verify authentication status

## Styling

- **Tailwind CSS**: Utility-first CSS framework
- **Color Scheme**: Dark theme with indigo accent (#6366f1)
- **Responsive Design**: Adapts to different screen sizes
- **Components**: Forms, buttons, cards with hover effects

## Security Features

- ✅ **JWT Tokens**: Secure token-based authentication
- ✅ **Password Hashing**: bcryptjs for password hashing
- ✅ **Protected Routes**: Middleware checks authentication
- ✅ **HTTP-Only Cookies**: Secure token storage
- ✅ **CORS**: Cross-origin requests configured

## Usage Flow

1. **User Registration**:
   - Navigate to /register
   - Fill in username and password
   - Click Register
   - Auto-redirected to home

2. **User Login**:
   - Navigate to /login
   - Enter credentials
   - Click Login
   - Auto-redirected to home

3. **Generate Caption**:
   - Upload an image
   - Click "Generate Caption"
   - Wait for backend processing
   - View generated caption
   - Logout to end session

## Environment Variables (Backend)

```
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_secret_key
PORT=5000
NODE_ENV=development
```

## Troubleshooting

### CORS Errors
- Ensure backend allows frontend origin
- Check `withCredentials: true` in axios instance

### Authentication Issues
- Clear localStorage and login again
- Check JWT token expiration
- Verify .env JWT_SECRET matches

### Image Upload Fails
- Check image size (should be < 5MB)
- Verify backend /post route has auth middleware
- Check multer configuration in backend

### Port Conflicts
- Change backend port in server.js
- Update baseURL in api.js accordingly

## Next Steps

- Add image history/gallery
- Implement user profile page
- Add multiple caption generation options
- Add image editing features
- Implement real-time notifications
- Add social sharing functionality

## Package Dependencies

### Frontend
```json
{
  "react": "^19.2.0",
  "react-dom": "^19.2.0",
  "react-router-dom": "^7.11.0",
  "axios": "^1.6.x",
  "tailwindcss": "^4.1.18"
}
```

### Backend
```json
{
  "express": "latest",
  "mongoose": "latest",
  "jsonwebtoken": "latest",
  "bcryptjs": "latest",
  "multer": "latest",
  "cookie-parser": "latest"
}
```
