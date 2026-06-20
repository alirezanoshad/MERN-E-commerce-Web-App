// Products => Fetch, Add, Delete, Update

//Imports
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "sonner";

// Fetch admin products
export const fetchAdminProducts = createAsyncThunk(
  "adminProducts/fetchAdminProducts",
  async () => {
    try {
      // Get - server request
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/admin/products`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.msg || "Fetch admin products Failed");
    }
  },
);

// Add New Product
export const createProduct = createAsyncThunk(
  "adminProducts/createProduct",
  async ({
    name,
    brand,
    description,
    price,
    discountPrice,
    countInStock,
    sku,
    material,
    collections,
    category,
    gender,
    sizes,
    colors,
    tags,
    images,
    isPublished,
    isFeatured,
  }) => {
    try {
      // Post - server request
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/product`,
        {
          name,
          brand,
          description,
          price,
          discountPrice,
          countInStock,
          sku,
          material,
          collections,
          category,
          gender,
          sizes,
          colors,
          tags,
          images,
          isPublished,
          isFeatured,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        },
      );

      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.msg || "Add New Product Failed");
    }
  },
);

// Update Specific Product by id
export const updateProduct = createAsyncThunk(
  "adminProducts/updateProduct",
  async ({ id, productData }) => {
    try {
      // Post - server request
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/product/${id}`,
        productData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        },
      );

      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.msg || "Update Product Failed");
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
        `${import.meta.env.VITE_API_URL}/product/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.msg || "Delete Product Failed");
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
