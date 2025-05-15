import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS } from '../config/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const message = error.response.data?.message || 'Something went wrong';
      return Promise.reject({ message, status: error.response.status });
    } else if (error.request) {
      return Promise.reject({ message: 'No response from server', status: 500 });
    } else {
      return Promise.reject({ message: 'Request failed', status: 500 });
    }
  }
);

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const registerCustomer = async (userData) => {
  try {
    const response = await api.post(API_ENDPOINTS.REGISTER_CUSTOMER, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const registerAdmin = async (userData) => {
  try {
    const response = await api.post(API_ENDPOINTS.REGISTER_ADMIN, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const adminLogin = async (credentials) => {
  try {
    const response = await api.post(API_ENDPOINTS.ADMIN_LOGIN, credentials);
    localStorage.setItem('token', response.data.token);
    return response.data;
  } catch (error) {
    localStorage.removeItem('token');
    throw error;
  }
};

export const verifyEmail = async (verificationData) => {
  try {
    const response = await api.post(API_ENDPOINTS.VERIFY_EMAIL, verificationData);
    return response.data;
  } catch (error) {
    throw error;
  }
}; 