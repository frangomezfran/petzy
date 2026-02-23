import axios from 'axios';

/**
 * Instancia central de Axios configurada con el interceptor JWT.
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080',
});

// Interceptor para incluir el token en cada petición
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('petzy_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
