import axios from 'axios';

const api = axios.create({
  baseURL: 'http://api-inventory-control.test/api',
});

export default api;