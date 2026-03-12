import API from './api';
import toast from 'react-hot-toast';

export const orderService = {
  async createOrder(total) {
    try {
      const response = await API.post('/orders/create', { total });
      toast.success('Order placed successfully!');
      return response.data;
    } catch (error) {
      toast.error('Failed to place order');
      throw error;
    }
  },

  async getOrders() {
    try {
      const response = await API.get('/orders');
      return response.data;
    } catch (error) {
      toast.error('Failed to fetch orders');
      throw error;
    }
  }
};