import { useEffect, useState } from "react";
import loginImg from "../assets/loginPage/loginImg.webp";
import { Link, useLocation, useNavigate } from "react-router-dom";

//
import { useDispatch, useSelector } from "react-redux";
// loginUser - AsyncThunk from authSlice.
import { loginUser } from "../redux/slices/atuhSlice";
import { mergeCart } from "../redux/slices/cartSlice";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //Redux
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, guestId } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  // Get redirect parameter and check if it's chekout or something
  const redirect = new URLSearchParams(location.search).get("redirect") || "/";
  const isCheckoutRedirect = redirect.includes("checkout");

  // Auto Login - based on localStorage
  useEffect(() => {
    // for logged-in users
    if (user) {
      if (cart?.products?.length > 0) {
        // Merge existing and new cart
        dispatch(mergeCart({ user, guestID: guestId })).then(() => {
          navigate(isCheckoutRedirect ? "/checkout" : "/");
        });
      } else {
        navigate(isCheckoutRedirect ? "/checkout" : "/");
      }
    }
  }, [navigate, isCheckoutRedirect, cart, user, guestId, dispatch]);

  // Login Submit Function.
  const handleSubmit = (e) => {
    // Stops submit reloading
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  // JSX
  return (
    <div className="flex">
      {/* Left Side */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 md:p-12">
        {/* Login Form */}
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="w-full max-w-md bg-white flex flex-col md:p-12 p-8 border border-gray-300 rounded-lg shadow-sm"
        >
          {/* Text Section */}
          <div className="flex justify-center mb-6">
            <h2 className="font-medium text-xl">Rabbit</h2>
          </div>
          <h2 className="mb-6 font-bold text-center text-2xl">Hey There!👋</h2>
          <p className="text-center mb-6">
            Enter your username and password to Login
          </p>

          {/* Email Section */}
          <div className="mb-4 ">
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              value={email}
              placeholder="Enter your email"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none  "
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Section */}
          <div className="mb-4 ">
            <label className="block text-sm font-semibold mb-2">Password</label>
            <input
              type="password"
              value={password}
              placeholder="Enter your password"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none  "
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Buntton */}
          <button
            type="submit"
            className="w-full cursor-pointer text-white bg-black rounded-lg p-2 font-semibold hover:bg-gray-800 transition"
          >
            Sign in
          </button>

          {/* Rigester Switch */}
          <p className="text-center mt-4 text-sm">
            Don't have an account?{" "}
            {
              <Link
                to={`/register/?redirect=${encodeURIComponent(redirect)}`}
                className="text-blue-500 font-semibold"
              >
                Register
              </Link>
            }
          </p>
        </form>
      </div>

      {/* Right Side */}
      <div className="hidden sm:block w-1/2 bg-gray-800">
        <div className="h-full flex flex-col justify-center items-center">
          <img
            src={loginImg}
            alt="Login to account"
            className="h-200 w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};
