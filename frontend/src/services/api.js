import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const apiClient = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth services
export const authService = {
  register: async (data) => {
    const response = await apiClient.post('/auth/register', data);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  login: async (data) => {
    const response = await apiClient.post('/auth/login', data);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
};

// Dataset services
export const datasetService = {
  getAll: async () => {
    const response = await apiClient.get('/datasets');
    return response.data;
  },

  create: async (data) => {
    const response = await apiClient.post('/datasets', data);
    return response.data;
  },

  getById: async (id) => {
    const response = await apiClient.get(`/datasets/${id}`);
    return response.data;
  },

  rollback: async (id) => {
    const response = await apiClient.post(`/datasets/${id}/rollback`);
    return response.data;
  },
};

// Model services
export const modelService = {
  getAll: async () => {
    const response = await apiClient.get('/models');
    return response.data;
  },

  create: async (data) => {
    const response = await apiClient.post('/models', data);
    return response.data;
  },

  getById: async (id) => {
    const response = await apiClient.get(`/models/${id}`);
    return response.data;
  },
};

// Prediction services
export const predictionService = {
  getAll: async () => {
    const response = await apiClient.get('/predictions');
    return response.data;
  },

  create: async (data) => {
    const response = await apiClient.post('/predictions', data);
    return response.data;
  },

  getById: async (id) => {
    const response = await apiClient.get(`/predictions/${id}`);
    return response.data;
  },
};

export default apiClient;
