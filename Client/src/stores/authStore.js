import { create } from 'zustand';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  
  login: async (userId, password) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await api.post('/auth/login', { userId, password });
      localStorage.setItem('token', data.token);
      set({ user: data.user, isAuthenticated: true, isLoading: false });
      return true;
    } catch (err) {
      set({ 
        error: err.response?.data?.message || 'Login failed', 
        isLoading: false 
      });
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, isAuthenticated: false, error: null });
  },

  checkAuth: async () => {
     const token = localStorage.getItem('token');
    if (!token) return;
    try {
      const { data } = await api.get('/auth/me');
      set({ user: data, isAuthenticated: true });
    } catch {
          localStorage.removeItem('token');
    }
  },
  createUser: async (userData) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await api.post('/admin/users', userData);
      set({ isLoading: false });
      return data;
    } catch (err) {
      set({ 
        error: err.response?.data?.message || 'Failed to create user', 
        isLoading: false 
      });
      return null;
    }
  }
}));

export default useAuthStore;