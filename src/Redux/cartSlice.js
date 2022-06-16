import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

const initialState = {
  cartItems: [],
  status: "",
};

const updateCartApi =
  "http://164.92.166.103/pharmacy-backend/public/api/cart/update";
const addCartItemApi =
  "http://164.92.166.103/pharmacy-backend/public/api/cart/add";
const removeCartItemApi =
  "http://164.92.166.103/pharmacy-backend/public/api/cart/delete";
const token =
  "6jQd1a65Goi33SCRM0dSPAXttAYobSpRiRmcpVVz20LH9NzZO2m9oVZP6Xa1foUfMwzNA9JDF6yCRJSO";

  
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (formData) => {
    try {
      const response = await axios.post(
        addCartItemApi,
        { productId: formData.id, quantity: formData.quantities[0] },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const updateCart = createAsyncThunk(
  "cart/updateCart",
  async (formData) => {
    try {
      const response = await axios.post(
        updateCartApi,
        { itemId: formData.itemId, quantity: formData.quantity },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const removeItem = createAsyncThunk(
  "cart/removeItem",
  async (formData) => {
    const response = await axios.post(
      removeCartItemApi,
      { itemId: formData.inCart.itemId },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response?.data;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // addToCart(state, action) {
    //   const itemIndex = state.cartItems.findIndex(
    //     (item) => item.id === action.payload.id
    //   );
    //   if (itemIndex >= 0) {
    //     const itemQuantity = (state.cartItems[itemIndex].cartQuantity += 1);
    //     state.totalCartQuantity = itemQuantity;
    //   } else {
    //     const temp = { ...action.payload, cartQuantity: 1 };
    //     state.cartItems.push(temp);
    //   }
    // },
    // removeFromCart(state, action) {
    //   const nextCartItems = state.cartItems.filter(
    //     (item) => item.id !== action.payload.id
    //   );
    //   if (state.totalCartQuantity > 1) {
    //     state.totalCartQuantity -= 1;
    //   }
    //   state.cartItems = nextCartItems;
    // },
  },
  extraReducers: {
    [addToCart.pending]: (state, action) => {
      state.status = "pending";
    },
    [addToCart.fulfilled]: (state, action) => {
      state.status = "success";
      state.cartItems.push(action.payload.data.item);
    },
    [addToCart.rejected]: (state, action) => {
      state.status = "Failed";
    },
    [updateCart.pending]: (state, action) => {
      state.status = "pending";
    },
    [updateCart.fulfilled]: (state, action) => {
      state.status = "success";
      state.cartItems.map((item) =>
        item.productId === action.payload.id ? action.payload : item
      );
    },
    [updateCart.rejected]: (state, action) => {
      state.status = "Failed";
    },
    [removeItem.pending]: (state, action) => {
      state.status = "pending";
    },
    [removeItem.fulfilled]: (state, action) => {
      state.status = "success";
      const nextCartItems = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
      state.cartItems = nextCartItems;
    },
    [removeItem.rejected]: (state, action) => {
      state.status = "Failed";
    },
  },
});

export default cartSlice.reducer;
