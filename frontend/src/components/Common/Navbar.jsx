import { useState } from "react";
import { Link } from "react-router-dom";
import { CartDrawer } from "../Layout/CartDrawer";
import { SearchBar } from "./SearchBar";
import { NavDrawer } from "./NavDrawer";
import {
  HiOutlineUser,
  HiOutlineShoppingBag,
  HiBars3BottomRight,
} from "react-icons/hi2";
// Redux Store
import { useSelector } from "react-redux";

// Navbar component - includes 3 senctions: leftSide-logo, centerSide-navigation links, rightSide-icons.
export const Navbar = () => {
  // drawerOpen variable - storing drawer's statement
  const [drawerOpen, setDrawerOpen] = useState(false);
  // navDrawerOpen variable - storing navDrawer's statement(Only Mobile devices)
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);

  // Redux
  const { cart } = useSelector((state) => state.cart);
  const cartItemCount =
    cart?.products?.reduce((total, product) => total + product.quantity, 0) ||
    0;

  // function to toggle CartDrawer's statement
  const toggleCartDrawer = () => {
    setDrawerOpen(!drawerOpen);
    console.log("Drawer's Statement:", !drawerOpen);
  };
  // function to toggle NavDrawer's statement
  const toggleNavDrawer = () => {
    setNavDrawerOpen(!navDrawerOpen);
    console.log("NavDrawer's statement:", navDrawerOpen);
  };

  // Returns the JSX for the Navbar component + cartDrawer component
  return (
    <>
      <nav className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* leftSide-logo */}
        <div>
          <Link to="/" className="text-2xl font-medium">
            Rabbit
          </Link>
        </div>
        {/* CenterSide - Navigation Links(4 links) */}
        <div className="hidden md:flex space-x-6">
          <Link
            to="collections/all?gender=Men"
            className="text-gray-700 hover:text-black text-sm size-sm font-medium uppercase"
          >
            men
          </Link>
          <Link
            to="collections/all?gender=Women"
            className="text-gray-700 hover:text-black text-sm size-sm font-medium uppercase"
          >
            women
          </Link>
          <Link
            to="collections/all?category=Top Wear"
            className="text-gray-700 hover:text-black text-sm size-sm font-medium uppercase"
          >
            Top Wear
          </Link>
          <Link
            to="collections/all?category=Bottom Wear"
            className="text-gray-700 hover:text-black text-sm size-sm font-medium uppercase"
          >
            Bottom Wear
          </Link>
        </div>
        {/* RightSide - Icons */}
        <div className="flex items-center space-x-4">
          {/* Admin Button */}
          <Link
            to="/admin"
            className="block bg-black text-white rounded px-2 py-1 text-sm"
          >
            Admin
          </Link>

          {/* userIcon */}
          <Link to="/profile" className="hover:text-black">
            <HiOutlineUser className="h-6 w-6 text-gray-700" />
          </Link>

          {/* ShoppingBagIcon  */}
          <button
            onClick={toggleCartDrawer}
            className={`relative hover:text-black ${drawerOpen ? "cursor-auto" : "cursor-pointer"}`}
          >
            <HiOutlineShoppingBag className="h-6 w-6 text-gray-700" />
            {/* span tag - Displaying items count in cart */}

            {cartItemCount && cartItemCount > 0 ? (
              <span className="absolute -top-1 bg-rabbit-red text-white text-xs rounded-full px-2 py-0.5">
                {cartItemCount}
              </span>
            ) : null}
          </button>

          {/* SearchBar component - Returns the content based on its if statement */}
          <div className="overflow-hidden">
            <SearchBar />
          </div>

          {/* Humbuger Icon - only Displays on mobile devices */}
          <button type="button" onClick={toggleNavDrawer} className="md:hidden">
            <HiBars3BottomRight className="h-6 w-6 text-gray-700 " />
          </button>
        </div>
      </nav>

      {/* CartDrawer Component(Outside of the nav tag) */}
      <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />

      {/* NavDrawer - Mobile Navigation Drawer */}
      <NavDrawer
        navDrawerOpen={navDrawerOpen}
        toggleNavDrawer={toggleNavDrawer}
      />
    </>
  );
};
