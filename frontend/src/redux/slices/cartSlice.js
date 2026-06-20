import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "sonner";

// Initial State - Helper funtion to load cartProducts from localStorage
const loadCartFromStorage = () => {
  const storedCart = localStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : { products: [] };
};

// Initial State - Helper funtcion to save cartProducts to localStorage
const saveCartToStorage = (cart) => {
  if (cart === undefined || cart === null) return;
  localStorage.setItem("cart", JSON.stringify(cart));
};

// Fetch cart for user or guest
export const fetchCartProducts = createAsyncThunk(
  "cart/FetchCartProducts",
  async ({ guestID, userID }) => {
    try {
      // Get - server request
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/cart`,
        { params: { userID, guestID } },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        },
      );

      return response.data;
    } catch (error) {
      toast.error(
        error?.response?.data?.msg || "Fetch cart for user or guest Failed",
      );
    }
  },
);

// Add an item to the cart for a user or guest
export const AddToCart = createAsyncThunk(
  "cart/AddToCart",
  async ({ productID, quantity, size, color, guestID, userID }) => {
    try {
      // Post - server request
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/cart`, {
        productID,
        quantity,
        size,
        color,
        guestID,
        userID,
      });
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.msg || "AddToCart Failed");
    }
  },
);

// Update the quantity  of an item in the cart
export const updateCartItemQuantity = createAsyncThunk(
  "cart/updateCartItemQuantity",
  async ({ productID, quantity, size, color, guestID, userID }) => {
    try {
      // Put - server request
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/cart`,
        {
          productID,
          quantity,
          size,
          color,
          guestID,
          userID,
        },
      );
      return response.data;
    } catch (error) {
      toast.error(
        error?.response?.data?.msg || "update Cart Item Quantity Failed",
      );
    }
  },
);

// Remove an item from the cart
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ productID, size, color, guestID, userID }) => {
    try {
      // Delete - server request
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/cart`,
        {
          data: { productID, size, color, guestID, userID },
        },
      );
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.msg || "remove From Cart Failed");
    }
  },
);

// Merge guest card into user card
export const mergeCart = createAsyncThunk(
  "cart/mergeCart",
  async ({ guestID, user }) => {
    try {
      // Post - server request
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/cart/merge`,
        { guestID, user },
        // Atuhorization
        {
          headers: {
            Authorization: `bearer ${localStorage.getItem("userToken")}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.msg || "mergeCart Failed");
    }
  },
);

// CartSlice
export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    // load cart from localStorage
    cart: loadCartFromStorage(),
    loading: false,
    error: null,
  },
  reducers: {
    clearCart: (state) => {
      state.cart = { products: [] };
      localStorage.removeItem("cart");
    },
  },
  // AsyncThunk Handling
  extraReducers: (builder) => {
    builder

      // fetchCartProducts
      .addCase(fetchCartProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCartProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload; // Store in redux store
        saveCartToStorage(action.payload); // Store in localStorage
      })
      .addCase(fetchCartProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch cart";
      })

      // AddToCart
      .addCase(AddToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(AddToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload; // Store in redux store
        saveCartToStorage(action.payload); // Store in localStorage
      })
      .addCase(AddToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.msg || "Failed to add to cart";
      })

      // updateCartItemQuantity
      .addCase(updateCartItemQuantity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload; // Store in redux store
        saveCartToStorage(action.payload); // Store in localStorage
      })
      .addCase(updateCartItemQuantity.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload.msg || "Failed to update cart item quantity";
      })
      // removeFromCart
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload; // Store in redux store
        saveCartToStorage(action.payload); // Store in localStorage
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.msg || "Failed to remove cart item";
      })
      // mergeCart
      .addCase(mergeCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(mergeCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload; // Store in redux store
        saveCartToStorage(action.payload); // Store in localStorage
      })
      .addCase(mergeCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.msg || "Failed to remove merge cart";
      });
  },
});

export const { clearCart } = cartSlice.actions;
