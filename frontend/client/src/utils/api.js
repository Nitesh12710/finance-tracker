import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth
export const login = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    return {
      success: true,
      token: response.data.token,
      user: response.data.user
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Login failed'
    };
  }
};

export const register = async (userData) => {
  try {
    const response = await api.post('/auth/signup', userData);
    return {
      success: true,
      token: response.data.token,
      user: response.data.user
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Registration failed'
    };
  }
};

// Transactions
export const getTransactions = async () => {
  try {
    const response = await api.get('/transactions');
    return {
      success: true,
      data: response.data.data || []
    };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to fetch transactions'
    };
  }
};

export const addTransaction = async (transactionData) => {
  try {
    const response = await api.post('/transactions', transactionData);
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to add transaction'
    };
  }
};

export const updateTransaction = async (id, transactionData) => {
  try {
    const response = await api.put(`/transactions/${id}`, transactionData);
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to update transaction'
    };
  }
};

export const deleteTransaction = async (id) => {
  try {
    await api.delete(`/transactions/${id}`);
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to delete transaction'
    };
  }
};
