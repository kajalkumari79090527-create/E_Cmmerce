import API from './api';
import toast from 'react-hot-toast';

export const authService = {
  async signup(userData) {
    try {
      const response = await API.post('/auth/signup', userData);
      toast.success('Registration successful! Please login.');
      return response.data;
    } catch (error) {
      toast.error(error.response?.data || 'Registration failed');
      throw error;
    }
  },

  async login(credentials) {
    try {
      const response = await API.post('/auth/login', credentials);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        toast.success('Login successful!');
      }
      return response.data;
    } catch (error) {
      toast.error(error.response?.data || 'Login failed');
      throw error;
    }
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
  },

  getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
};