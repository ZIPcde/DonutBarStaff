// src\api.js
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL || 'http://51.250.114.152:3000', // Замените на URL вашего API
});

export const fetchOrders = () => api.get('/orders');
export const fetchProducts = () => api.get('/products');
export const fetchCustomers = () => api.get('/customers');
