import { IoMdClose } from "react-icons/io";
import { CartContents } from "../Cart/CartContents";
import { useNavigate } from "react-router-dom";

// CartDrawer component - contains Cart Contents.
export const CartDrawer = ({ drawerOpen, toggleCartDrawer }) => {
  // Checkout navigation.
  const navigate = useNavigate();
  const handleCheckoutBtn = () => {
    navigate("/checkout");
  };

  // Returns a div - only Displayed by drawerOpen's statement
  return (
    <div
      className={`fixed top-0 right-0 w-3/4 md:w-[30rem] h-full bg-white shadow-lg transform transition-transform duration-300 flex flex-col z-50 ${
        drawerOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Close Button */}
      <div className="flex justify-end p-4">
        <button onClick={toggleCartDrawer}>
          <IoMdClose className="h-6 w-6 text-grey-600" />
        </button>
      </div>

      {/* CartContents div - head text & scrollable area */}
      <div className="grow p-4 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
        <CartContents />
      </div>

      {/* bottomSide div - checkout button & note */}
      <div className="p-4 bg-white sticky bottom-0">
        <button
          onClick={handleCheckoutBtn}
          className="w-full bg-black text-white py-3 rounded-lg hover:cursor-pointer hover:bg-gray-800 transition-all"
        >
          Checkout
        </button>
        <p className="text-sm tracking-tighter text-gray-500 mt-2 text-center">
          Shopping, taxes and discount codes calculated at checkout.
        </p>
      </div>
    </div>
  );
};
