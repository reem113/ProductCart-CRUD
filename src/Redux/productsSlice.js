import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

const getProductsApi =
  "http://164.92.166.103/pharmacy-backend/public/api/products/10430";
const token =
  "6jQd1a65Goi33SCRM0dSPAXttAYobSpRiRmcpVVz20LH9NzZO2m9oVZP6Xa1foUfMwzNA9JDF6yCRJSO";

const initialState = {
  items: [],
  status: null,
};

export const productsFetch = createAsyncThunk(
  "products/productsFetch",
  async () => {
    const response = await axios.get(getProductsApi, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response?.data;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: {
    [productsFetch.pending]: (state, action) => {
      state.status = "pending";
    },
    [productsFetch.fulfilled]: (state, action) => {
      state.status = "success";
      state.items = action.payload.data.product;
    },
    [productsFetch.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default productsSlice.reducer;
