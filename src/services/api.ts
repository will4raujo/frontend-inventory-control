import axios from 'axios';

const api = axios.create({
  baseURL: 'http://api-inventory-control.test/api',
  withCredentials: true,
  withXSRFToken: true,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('@inventorystocktoken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;