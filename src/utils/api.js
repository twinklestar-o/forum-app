import axios from 'axios';

const api = axios.create({
  baseURL: 'https://forum-api.dicoding.dev/v1',
});

// Interceptor untuk menambahkan token Authorization
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    return {
      ...config,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      },
    };
  }
  return config;
});

export default api;
