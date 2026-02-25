import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserLayout } from "./components/Layout/UserLayout";
import { Home } from "./pages/Home.jsx";

// App component - 2 layouts considered: UserLayout & AdminLayout.
// react-router-dom will be used to handle the routing between layouts.
export const App = () => {
  return (
    // URL Routing(react-router-dom)
    <BrowserRouter>
      <Routes>
        {/* User Layout */}
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />}></Route>
        </Route>

        {/* Admin Layout */}
        <Route></Route>
      </Routes>
    </BrowserRouter>
  );
};
