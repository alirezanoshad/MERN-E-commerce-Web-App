import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserLayout } from "./components/Layout/UserLayout";
import { Home } from "./pages/Home.jsx";
import { Login } from "./pages/Login.jsx";
// Sonner library - for add to cart notifications
import { Toaster } from "sonner";

// App component - 2 layouts considered: UserLayout & AdminLayout.
// react-router-dom will be used to handle the routing between layouts.
export const App = () => {
  return (
    // URL Routing(react-router-dom)
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        {/* User Layout */}
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />}></Route>
          <Route path="login" element={<Login />}></Route>
        </Route>

        {/* Admin Layout */}
        <Route></Route>
      </Routes>
    </BrowserRouter>
  );
};
