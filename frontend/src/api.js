import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api/', // Adjust to your Django backend URL
});

// Customer API functions
export const fetchCustomers = () => api.get('customers/');
export const createCustomer = (data) => api.post('customers/', data);
export const updateCustomer = (id, data) => api.patch(`customers/${id}/`, data);
export const deleteCustomer = (id) => api.delete(`customers/${id}/`);

// Product API functions
export const fetchProducts = () => api.get('products/');
export const createProduct = (data) => api.post('products/', data);
export const updateProduct = (id, data) => api.patch(`products/${id}/`, data);
export const deleteProduct = (id) => api.delete(`products/${id}/`);

// Subscription API functions
export const fetchSubscriptions = () => api.get('subscriptions/');
export const createSubscription = (data) => api.post('subscriptions/', data);
export const updateSubscription = (id, data) => api.patch(`subscriptions/${id}/`, data);
export const deleteSubscription = (id) => api.delete(`subscriptions/${id}/`);
export const fetchRevenue = () => api.get('subscriptions/revenue/');
