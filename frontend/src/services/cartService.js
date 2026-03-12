import API from './api';
import toast from 'react-hot-toast';

export const cartService = {
  async getCart() {
    try {
      const response = await API.get('/cart');
      return response.data;
    } catch (error) {
      toast.error('Failed to fetch cart');
      throw error;
    }
  },

  async addToCart(productId) {
    try {
      const response = await API.post('/cart/add', { product_id: productId });
      toast.success('Added to cart');
      return response.data;
    } catch (error) {
      toast.error('Failed to add to cart');
      throw error;
    }
  },

  async removeFromCart(cartId) {
    try {
      const response = await API.delete(`/cart/${cartId}`);
      toast.success('Removed from cart');
      return response.data;
    } catch (error) {
      toast.error('Failed to remove from cart');
      throw error;
    }
  }
};