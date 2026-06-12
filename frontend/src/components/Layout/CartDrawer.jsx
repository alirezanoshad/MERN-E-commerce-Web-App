import { IoMdClose } from "react-icons/io";
import { CartContents } from "../Cart/CartContents";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCartProducts } from "../../redux/slices/cartSlice";

// CartDrawer component - contains Cart Contents.
export const CartDrawer = ({ drawerOpen, toggleCartDrawer }) => {
  // Redux store
  const { guestId, user } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const userId = user ? user.id : null;
  // React Navigation
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // FetchCartProducts
  useEffect(() => {
    console.log("cart Trying..");
    dispatch(
      fetchCartProducts({ guestID: guestId, userID: userId }),
    );
  }, [dispatch, userId, guestId]);

  // Checkout navigation.
  const handleCheckoutBtn = () => {
    toggleCartDrawer((prev) => !prev);
    if (!user) {
      // Guest Navigations
      navigate("/login?redirect=checkout");
    } else {
      // User Navigation
      navigate("/checkout");
    }
  };

  // JSX
  return (
    // Returns a div - only Displayed by drawerOpen's statement
    <div
      className={`fixed top-0 right-0 w-3/4 md:w-120 h-full bg-white shadow-lg transform transition-transform duration-300 flex flex-col z-50 ${
        drawerOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Close Button */}
      <div className="flex justify-end p-4">
        <button onClick={toggleCartDrawer}>
          <IoMdClose className="h-6 w-6 text-gray-600 hover:cursor-pointer hover:text-gray-800" />
        </button>
      </div>

      {/* CartContents div - head text & scrollable area */}
      <div className="grow p-4 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
        {cart && cart?.products?.length > 0 ? (
          <CartContents cartProducts={cart} guestId={guestId} userId={userId} />
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>

      {/* bottomSide div - checkout button & note */}
      <div className="p-4 bg-white sticky bottom-0">
        {cart && cart?.products?.length > 0 ? (
          <button
            onClick={handleCheckoutBtn}
            className="w-full bg-black text-white py-3 rounded-lg hover:cursor-pointer hover:bg-gray-800 transition-all"
          >
            Checkout
          </button>
        ) : (
          <button
            disabled
            className="w-full bg-gray-800 text-white py-3 rounded-lg"
          >
            Checkout
          </button>
        )}

        <p className="text-sm tracking-tighter text-gray-500 mt-2 text-center">
          Shopping, taxes and discount codes calculated at checkout.
        </p>
      </div>
    </div>
  );
};
