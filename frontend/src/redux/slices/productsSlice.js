// Managing Product Data

//Imports
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "sonner";

// AsyncThunk - Fetch Products by Filters.
export const fetchProductsByFilters = createAsyncThunk(
  "products/fetchByFilters",
  async (
    // Parameters - Object Destructure
    {
      collection,
      size,
      color,
      gender,
      minPrice,
      maxPrice,
      sortBy,
      search,
      category,
      material,
      brand,
      limit,
    },
    { rejectWithValue },
  ) => {
    try {
      // URLSearchParams metod - Creating Query String
      const query = new URLSearchParams();
      // Only Selcted Filters
      if (collection) query.append("collection", collection);
      if (size) query.append("size", size);
      if (color) query.append("color", color);
      if (gender) query.append("gender", gender);
      if (minPrice) query.append("minPrice", minPrice);
      if (maxPrice) query.append("maxPrice", maxPrice);
      if (sortBy) query.append("sortBy", sortBy);
      if (search) query.append("search", search);
      if (category) query.append("category", category);
      if (material) query.append("material", material);
      if (brand) query.append("brand", brand);
      if (limit) query.append("limit", limit);

      // Get - Server request
      const response = await axios.get(
        // change URLSearchParams Type to String
        `http://localhost:5000/api/product?${query.toString()}`,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

// AsyncThunk - Fetch single product by ID.
export const fetchProductDetails = createAsyncThunk(
  "products/fetchProductDetails",
  async (id) => {
    // Get - Server request
    const response = await axios.get(`http://localhost:5000/api/product/${id}`);
    return response.data;
  },
);

// AsyncThunk - Update The *Existing* Product by ID.
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, productData }) => {
    // Put - Server Request
    const response = await axios.put(
      `http://localhost:5000/api/product/${id}`,
      productData,
      // Admin Authorization Info - Only Admin Can Update Products
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      },
    );
    return response.data;
  },
);

// AsyncThunk - Similar Products.
export const fetchSimilarProducts = createAsyncThunk(
  "products/fetchSimilarProducts",
  async ({ id }) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/product/similar/${id}`,
      );
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.msg || "Similar Products Failed")
    }
  },
);

// Products Slice
export const productsSlice = createSlice({
  name: "products",
  initialState: {
    // Store All the Fetced Products
    products: [],
    // Store Single Product Details
    selectedProduct: null,
    // Store Similar Products
    similarProducts: [],
    loading: false,
    error: null,
    // Store Active filter of fetching products
    filters: {
      collection: "",
      size: "",
      color: "",
      gender: "",
      minPrice: "",
      maxPrice: "",
      sortBy: "",
      // Store searchBar value
      search: "",
      category: "",
      material: "",
      brand: "",
      limit: "",
    },
  },
  reducers: {
    setFilters: (state, action) => {
      // Mege previous and new selected filters - searchBar
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        collection: "",
        size: "",
        color: "",
        gender: "",
        minPrice: "",
        maxPrice: "",
        sortBy: "",
        search: "",
        category: "",
        material: "",
        brand: "",
        limit: "",
      };
    },
  },

  // AsyncThunk Handling
  extraReducers: (builder) => {
    builder
      // Handle fetchProductsByFilters
      .addCase(fetchProductsByFilters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsByFilters.fulfilled, (state, action) => {
        state.loading = false;
        // Array Type Check
        state.products = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchProductsByFilters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.msg;
      })
      // Handle fetchProductDetails
      .addCase(fetchProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.msg;
      })
      // Handle updateProduct
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        // Store new product details
        const updatedProduct = action.payload;
        // Find The Product Index in list
        const index = state.products.findIndex((product) => {
          product._id === updatedProduct._id;
        });
        // Replace The New Produt Details by Index(if exists)
        if (index === -1) {
          state.products[index] = updatedProduct;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.msg;
      })
      // Handle fetchSimilarProducts
      .addCase(fetchSimilarProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSimilarProducts.fulfilled, (state, action) => {
        state.loading = false;
        // Array Type Check
        state.similarProducts = Array.isArray(action.payload)
          ? action.payload
          : [];
      })
      .addCase(fetchSimilarProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.msg;
      });
  },
});

export const { setFilters, clearFilters } = productsSlice.actions;
