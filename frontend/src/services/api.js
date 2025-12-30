import axios from 'axios';

const API = axios.create({
  baseURL: 'https://captiongenerator-backend-o538.onrender.com',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const registerUser = (username, password) => {
  return API.post('/register', { username, password });
};

export const loginUser = (username, password) => {
  return API.post('/login', { username, password });
};

export const createPost = (formData) => {
  return API.post('/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const checkAuth = () => {
  return API.get('/me');
};

export default API;
