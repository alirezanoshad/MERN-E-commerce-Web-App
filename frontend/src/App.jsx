import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserLayout } from "./components/Layout/UserLayout";

// Here we have 2 layouts, one for user(UserLayout) and one for admin(AdminLayout).
// We will use react-router-dom to handle the routing between these layouts.
export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserLayout />}>
          {/* User Layout */}
        </Route>
        <Route>{/* Admin Layout */}</Route>
      </Routes>
    </BrowserRouter>
  );
};
