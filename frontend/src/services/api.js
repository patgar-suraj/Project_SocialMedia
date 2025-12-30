import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const registerUser = (username, password) => {
  return API.post('/auth/register', { username, password });
};

export const loginUser = (username, password) => {
  return API.post('/auth/login', { username, password });
};

export const createPost = (formData) => {
  return API.post('/post', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const checkAuth = () => {
  return API.get('/auth/me');
};

export default API;
