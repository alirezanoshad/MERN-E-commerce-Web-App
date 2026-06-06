// Products => Fetch, Add, Delete, Update

//Imports
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch Users - admin fashboard
export const fetchAdminProducts = createAsyncThunk(
  "adminProducts/fetchAdminProducts",
  async () => {
    try {
      // Get - server request
      const response = await axios.get(
        "http://localhost:5000/api/admin/products",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
);

// Add New Product
export const createProduct = createAsyncThunk(
  "adminProducts/createProduct",
  async (productData) => {
    try {
      console.log(productData);
      // Post - server request
      const response = await axios.post(
        "http://localhost:5000/api/product",
        productData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        },
      );

      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
);

// Update Specific Product by id
export const updateProduct = createAsyncThunk(
  "adminProducts/updateProduct",
  async ({ id, productData }) => {
    try {
      console.log({ id, productData });
      // Post - server request
      const response = await axios.put(
        `http://localhost:5000/api/product/${id}`,
        productData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        },
      );

      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
);

// Delete Product
export const deleteProduct = createAsyncThunk(
  "adminProducts/deleteProduct",
  async ({ id }) => {
    try {
      // Delete - server request
      const response = await axios.delete(
        `http://localhost:5000/api/product/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
);

// adminProductsSlice
export const adminProductsSlice = createSlice({
  name: "adminProducts",
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchAdminProducts
      .addCase(fetchAdminProducts.pending, (state) => {
        state.loading = true;
        state.false = true;
      })
      .addCase(fetchAdminProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchAdminProducts.rejected, (state, action) => {
        state.loading = false;
        state.false = action.payload.msg;
      })
      // createProduct
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
      })
      // updateProduct
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.products.findIndex(
          (product) => product._id === action.payload._id,
        );
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      // deleteProduct
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter(
          (product) => product._id !== action.payload.prod._id,
        );
      });
  },
});
