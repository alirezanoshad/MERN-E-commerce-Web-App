import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

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
      console.log({ guestID, userID });
      // Get - server request
      const response = await axios.get(
        "http://localhost:5000/api/cart",
        { params: { userID, guestID } },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        },
      );

      console.log(response.data);
      return response.data;
    } catch (error) {
      return console.log(error.response.data.msg);
    }
  },
);

// Add an item to the cart for a user or guest
export const AddToCart = createAsyncThunk(
  "cart/AddToCart",
  async ({ productID, quantity, size, color, guestID, userID }) => {
    try {
      console.log({ productID, quantity, size, color, guestID, userID });
      // Post - server request
      const response = await axios.post("http://localhost:5000/api/cart", {
        productID,
        quantity,
        size,
        color,
        guestID,
        userID,
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error.response?.data);
      console.log(error.response?.status);
    }
  },
);

// Update the quantity  of an item in the cart
export const updateCartItemQuantity = createAsyncThunk(
  "cart/updateCartItemQuantity",
  async ({ productID, quantity, size, color, guestID, userID }) => {
    try {
      // Put - server request
      const response = await axios.put("http://localhost:5000/api/cart", {
        productID,
        quantity,
        size,
        color,
        guestID,
        userID,
      });
      return response.data;
    } catch (error) {
      return console.log(error);
    }
  },
);

// Remove an item from the cart
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ productID, size, color, guestID, userID }) => {
    try {
      console.log({ productID, size, color, guestID, userID });
      // Delete - server request
      const response = await axios.delete("http://localhost:5000/api/cart", {
        data: { productID, size, color, guestID, userID },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
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
        "http://localhost:5000/api/cart/merge",
        { guestID, user },
        // Atuhorization
        {
          headers: {
            Authorization: `bearer ${localStorage.getItem("userToken")}`,
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
        console.log(action.payload);
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
        console.log(action.payload);
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
        console.log(action.payload);
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
        console.log(action.payload);
      })
      .addCase(mergeCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.msg || "Failed to remove merge cart";
      });
  },
});

export const { clearCart } = cartSlice.actions;
