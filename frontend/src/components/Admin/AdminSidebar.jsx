// Imports
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/atuhSlice";
// icon import
import {
  FaBoxOpen,
  FaClipboardList,
  FaStore,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

// AdminSidebar Component
export const AdminSidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // hamdleLogout func
  const hamdleLogout = () => {
    // Logout user
    dispatch(logout());
    // Navigate to home
    navigate("/");
  };

  // JSX
  return (
    <div className="p-6">
      <div className="mb-6 ">
        <Link to="/admin" className="text-2xl font-medium">
          Rabbit
        </Link>
      </div>
      <h2 className="text-xl font-medium mb-6 text-center">Admin Dashboard</h2>
      <nav className="flex flex-col space-y-2">
        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            isActive
              ? "bg-gray-700 hover:bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2"
              : " hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"
          }
        >
          <FaUser />
          <span>Users</span>
        </NavLink>
        <NavLink
          to="/admin/products"
          className={({ isActive }) =>
            isActive
              ? "bg-gray-700 hover:bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2"
              : " hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"
          }
        >
          <FaBoxOpen />
          <span>Products</span>
        </NavLink>

        <NavLink
          to="/admin/orders"
          className={({ isActive }) =>
            isActive
              ? "bg-gray-700 hover:bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2"
              : " hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"
          }
        >
          <FaClipboardList />
          <span>Orders</span>
        </NavLink>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "bg-gray-700 hover:bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2"
              : " hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"
          }
        >
          <FaStore />
          <span>Shop</span>
        </NavLink>
      </nav>
      <div className="mt-6">
        <button
          onClick={hamdleLogout}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-3 px-4 rounded flex items-center justify-center space-x-2"
        >
          <FaSignOutAlt />
        </button>
      </div>
    </div>
  );
};
