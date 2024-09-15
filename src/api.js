// src\api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://51.250.115.233:3000/', // Замените на URL вашего API
});

export const fetchOrders = () => api.get('/orders');
export const fetchProducts = () => api.get('/products');
export const fetchCustomers = () => api.get('/customers');
