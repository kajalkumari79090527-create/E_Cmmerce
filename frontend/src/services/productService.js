import API from './api';
import toast from 'react-hot-toast';

export const productService = {
  async getAllProducts() {
    try {
      const response = await API.get('/products');
      return response.data;
    } catch (error) {
      toast.error('Failed to fetch products');
      throw error;
    }
  },

  async getProduct(id) {
    try {
      const response = await API.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      toast.error('Failed to fetch product');
      throw error;
    }
  }
};