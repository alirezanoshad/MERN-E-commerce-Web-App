import { IoMdClose } from "react-icons/io";

export const CartDrawer = ({ drawerOpen, toggleCartDrawer }) => {
  // Returns a div - only Displayed by drawerOpen's statement
  return (
    <div
      className={`fixed top-0 right-0 w-3/4 h-full bg-white shadow-lg transform transition-transform duration-300 flex flex-col z-50 ${
        drawerOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Close Button */}
      <div className="flex justify-end p-4">
        <button onClick={toggleCartDrawer}>
          <IoMdClose className="h-6 w-6 text-grey-600" />
        </button>
      </div>
      {/* Cart contents - scrollable area */}
    </div>
  );
};
