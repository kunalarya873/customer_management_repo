import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Register customer
export const registerCustomer = async (data) => {
  try {
    const response = await apiClient.post('customers/', data);
    return response.data;
  } catch (error) {
    console.error('Error registering customer:', error);
    throw error;
  }
};

// Add product
export const addProduct = async (data) => {
  try {
    const response = await apiClient.post('products/', data);
    return response.data;
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};

// Create subscription
export const createSubscription = async (data) => {
  try {
    const response = await apiClient.post('subscriptions/', data);
    return response.data;
  } catch (error) {
    console.error('Error creating subscription:', error);
    throw error;
  }
};

// Update subscription
export const updateSubscription = async (id, data) => {
  try {
    const response = await apiClient.patch(`subscriptions/${id}/`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating subscription:', error);
    throw error;
  }
};

// Delete subscription
export const deleteSubscription = async (id) => {
  try {
    const response = await apiClient.delete(`subscriptions/${id}/`);
    return response.data;
  } catch (error) {
    console.error('Error deleting subscription:', error);
    throw error;
  }
};

// Get revenue data
export const getRevenue = async (data) => {
  try {
    const response = await apiClient.get('subscriptions/revenue/', { params: data });
    return response.data;
  } catch (error) {
    console.error('Error fetching revenue:', error);
    throw error;
  }
};

