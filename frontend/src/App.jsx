// URL Routing - react-router-dom(Dynamic Routing)
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Provider - Redux component
// => Makes "store" Accessable by every Component(by wrapping the "App" component)
import { Provider } from "react-redux";
// Redux store refrence   
import store from "./redux/store.js";

// User Layout Imports
import { UserLayout } from "./components/Layout/UserLayout";
import { Home } from "./pages/Home.jsx";
import { Login } from "./pages/Login.jsx";
import { Register } from "./pages/Register.jsx";
import { Profile } from "./pages/Profile.jsx";
import { CollectionsPage } from "./pages/CollectionsPage.jsx";
import { ProductDetails } from "./components/Products/ProductDetails.jsx";
import { Checkout } from "./components/Cart/Checkout.jsx";
import { OrderConfirmationPage } from "./pages/OrderConfirmationPage.jsx";
import { OrderDetailsPage } from "./pages/OrderDetailsPage.jsx";
import { MyOrders } from "./pages/MyOrders.jsx";

// Sonner Library - for add to cart notifications
import { Toaster } from "sonner";

// Admin Layout Imports
import { AdminLayout } from "./components/Admin/AdminLayout.jsx";
import { AdminHomePage } from "./pages/AdminHomePage.jsx";
import { UserManagement } from "./components/Admin/UserManagement.jsx";
import { ProductManagement } from "./components/Admin/ProductManagement.jsx";
import { EditProductPage } from "./components/Admin/EditProductPage.jsx";
import { OrderManagement } from "./components/Admin/OrderManagement.jsx";

// App component - Contains 2 Layouts: UserLayout & AdminLayout.
export const App = () => {
  // note: Provider - Passes "store" prop, Enabling React Components to access Global States.
  // note: react-router-dom - will be used to handle the routing between layouts.
  // JSX
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Routes>
          {/* User Layout - with homePage on index mode */}
          <Route path="/" element={<UserLayout />}>
            <Route index element={<Home />}></Route>
            <Route path="login" element={<Login />}></Route>
            <Route path="register" element={<Register />}></Route>
            <Route path="profile" element={<Profile />}></Route>
            <Route
              path="collections/:collection"
              element={<CollectionsPage />}
            ></Route>
            <Route path="product/:id" element={<ProductDetails />}></Route>
            <Route path="checkout" element={<Checkout />}></Route>
            <Route
              path="order-confirmation"
              element={<OrderConfirmationPage />}
            ></Route>
            <Route path="order/:id" element={<OrderDetailsPage />}></Route>
            <Route path="my-orders" element={<MyOrders />}></Route>
          </Route>

          {/* Admin Layout */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminHomePage />}></Route>
            <Route path="users" element={<UserManagement />}></Route>
            <Route path="products" element={<ProductManagement />}></Route>
            <Route
              path="products/:id/edit"
              element={<EditProductPage />}
            ></Route>
            <Route path="orders" element={<OrderManagement />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};
