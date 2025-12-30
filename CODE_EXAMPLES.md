# Code Examples & Reference

## API Service (src/services/api.js)

```javascript
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true,
});

// Register new user
export const registerUser = (username, password) => {
  return API.post('/auth/register', { username, password });
};

// Login user
export const loginUser = (username, password) => {
  return API.post('/auth/login', { username, password });
};

// Create post with image
export const createPost = (formData) => {
  return API.post('/post', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

// Check authentication status
export const checkAuth = () => {
  return API.get('/auth/me');
};

export default API;
```

## Register Component (src/user/Register.jsx)

```jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../services/api';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await registerUser(username, password);
      if (response.status === 201) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen bg-gradient-to-tr from-[#0c1019] via-[#0c1019] to-[#1e293b] flex items-center justify-center">
      <div className="bg-[#1a1f2e] p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Register</h2>
        
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-400 p-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white text-sm font-semibold mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 bg-[#0c1019] text-white border border-[#3f46e1] rounded focus:outline-none focus:ring-2 focus:ring-[#6366f1]"
              placeholder="Enter username"
              required
            />
          </div>

          <div>
            <label className="block text-white text-sm font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-[#0c1019] text-white border border-[#3f46e1] rounded focus:outline-none focus:ring-2 focus:ring-[#6366f1]"
              placeholder="Enter password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#6366f1] hover:bg-[#4f46e5] text-white font-semibold py-2 rounded transition disabled:opacity-50"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <p className="text-white text-center mt-4 text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-[#6366f1] hover:underline font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
```

## Login Component (src/user/Login.jsx)

```jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../services/api';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await loginUser(username, password);
      if (response.status === 200 || response.status === 201) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('token', response.data.token);
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen bg-gradient-to-tr from-[#0c1019] via-[#0c1019] to-[#1e293b] flex items-center justify-center">
      <div className="bg-[#1a1f2e] p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Login</h2>
        
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-400 p-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white text-sm font-semibold mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 bg-[#0c1019] text-white border border-[#3f46e1] rounded focus:outline-none focus:ring-2 focus:ring-[#6366f1]"
              placeholder="Enter username"
              required
            />
          </div>

          <div>
            <label className="block text-white text-sm font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-[#0c1019] text-white border border-[#3f46e1] rounded focus:outline-none focus:ring-2 focus:ring-[#6366f1]"
              placeholder="Enter password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#6366f1] hover:bg-[#4f46e5] text-white font-semibold py-2 rounded transition disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-white text-center mt-4 text-sm">
          Don't have an account?{' '}
          <Link to="/register" className="text-[#6366f1] hover:underline font-semibold">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
```

## Home Component (src/components/Home.jsx)

```jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import ImageCaption from './ImageCaption';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="bg-gradient-to-tr from-[#0c1019] via-[#0c1019] to-[#1e293b] w-full min-h-screen">
      <NavBar />
      <ImageCaption />
    </div>
  );
};

export default Home;
```

## ImageCaption Component (src/components/ImageCaption.jsx)

```jsx
import { useState } from 'react';
import { createPost } from '../services/api';

const ImageCaption = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [caption, setCaption] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
      setError('');
      setCaption('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (!image) {
      setError('Please select an image');
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('image', image);

      const response = await createPost(formData);
      setCaption(response.data.post.caption);
      setSuccess('Caption generated successfully!');
      setImage(null);
      setPreview('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to generate caption. Please make sure you are logged in.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-[#1a1f2e] rounded-lg p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-white mb-6">Generate Image Caption</h2>

        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-400 p-3 rounded mb-4">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-500/20 border border-green-500 text-green-400 p-3 rounded mb-4">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="border-2 border-dashed border-[#6366f1] rounded-lg p-8 text-center cursor-pointer hover:border-[#8b5cf6] transition">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="image-input"
            />
            <label htmlFor="image-input" className="cursor-pointer block">
              {preview ? (
                <div>
                  <img
                    src={preview}
                    alt="Preview"
                    className="max-h-64 mx-auto mb-4 rounded"
                  />
                  <p className="text-[#6366f1] font-semibold">Change image</p>
                </div>
              ) : (
                <div>
                  <svg
                    className="w-12 h-12 mx-auto mb-2 text-[#6366f1]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  <p className="text-white font-semibold">Upload an image</p>
                  <p className="text-gray-400 text-sm mt-1">
                    Drag and drop or click to select
                  </p>
                </div>
              )}
            </label>
          </div>

          <button
            type="submit"
            disabled={loading || !image}
            className="w-full bg-[#6366f1] hover:bg-[#4f46e5] text-white font-semibold py-3 rounded transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Generating caption...' : 'Generate Caption'}
          </button>
        </form>

        {caption && (
          <div className="mt-8 bg-[#0c1019] p-6 rounded-lg border border-[#3f46e1]">
            <h3 className="text-white font-semibold mb-3">Generated Caption:</h3>
            <p className="text-gray-300 leading-relaxed">{caption}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageCaption;
```

## NavBar Component (src/components/NavBar.jsx)

```jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="bg-[#1a1f2e] border-b border-[#3f46e1] p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">ImageCaption AI</h1>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="text-white font-semibold">
                Welcome, {user.username}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate('/login')}
                className="text-white hover:text-[#6366f1] font-semibold transition"
              >
                Login
              </button>
              <button
                onClick={() => navigate('/register')}
                className="bg-[#6366f1] hover:bg-[#4f46e5] text-white font-semibold px-4 py-2 rounded transition"
              >
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
```

## App.jsx (Router Configuration)

```jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import Register from './user/Register';
import Login from './user/Login';
import Home from './components/Home';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
```

## Key Code Patterns

### Protected Route Pattern
```jsx
useEffect(() => {
  const user = localStorage.getItem('user');
  if (!user) {
    navigate('/login');
  }
}, [navigate]);
```

### Axios FormData Upload
```jsx
const formData = new FormData();
formData.append('image', imageFile);
const response = await createPost(formData);
```

### localStorage Auth Management
```jsx
// Save after login
localStorage.setItem('user', JSON.stringify(userData));

// Check on load
const user = localStorage.getItem('user');

// Clear on logout
localStorage.removeItem('user');
```

### Error Handling
```jsx
try {
  const response = await apiCall();
  // Success handling
} catch (err) {
  setError(err.response?.data?.message || 'Default error');
}
```
