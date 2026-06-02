import { useNavigate } from "react-router-dom";
import { MyOrders } from "./MyOrders";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/atuhSlice";
import { useEffect } from "react";
import { clearCart } from "../redux/slices/cartSlice";

export const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  console.log(user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [navigate, user]);

  const handleLogout = () => {
    // Logout user
    dispatch(logout());
    // Clear cart
    dispatch(clearCart());
    // Navigate to home
    navigate("/");
  };

  // JSX
  return (
    <div className="min-h-screen flex flex-col">
      <div className="grow container mx-auto p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
          {/* Left Section */}
          <div className="w-full md:w-1/3 lg:w-1/4 shadow-md rounded-lg p-6">
            <h1 className="text-2xl md:text-3xl font-bold mb-4">
              {user ? user.name : "Name not found"}
              <p className="text-lg text-gray-600 mb-4">
                {user ? user.email : "Email not found"}
              </p>
              <button
                onClick={handleLogout}
                className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </h1>
          </div>

          {/* Right Section: Orders Table */}
          <div className="w-full md:w-2/3 lg:w-3/4">
            <MyOrders />
          </div>
        </div>
      </div>
    </div>
  );
};
