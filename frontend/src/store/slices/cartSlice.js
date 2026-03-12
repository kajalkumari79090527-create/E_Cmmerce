import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { cartService } from '../../services/cartService';

export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async () => {
    const response = await cartService.getCart();
    return response;
  }
);

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async (productId) => {
    await cartService.addToCart(productId);
    const updatedCart = await cartService.getCart();
    return updatedCart;
  }
);

export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async (cartId) => {
    await cartService.removeFromCart(cartId);
    const updatedCart = await cartService.getCart();
    return updatedCart;
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = action.payload;
      });
  },
});

export default cartSlice.reducer;