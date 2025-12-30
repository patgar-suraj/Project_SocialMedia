import axios from 'axios';

const API = axios.create({
  baseURL: 'https://captiongenerator-backend-o538.onrender.com',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const registerUser = (username, password) => {
  return API.post('/api/auth/register', { username, password });
};

export const loginUser = (username, password) => {
  return API.post('/api/auth/login', { username, password });
};

export const createPost = (formData) => {
  return API.post('/api/post', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const checkAuth = () => {
  return API.get('/api/auth/me');
};

export default API;
