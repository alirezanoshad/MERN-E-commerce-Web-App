import { useState } from "react";
import { Link } from "react-router-dom";
import {
  HiOutlineUser,
  HiOutlineShoppingBag,
  HiBars3BottomRight,
} from "react-icons/hi2";
import { SearchBar } from "./SearchBar";
import { CartDrawer } from "../Layout/CartDrawer";

export const Navbar = () => {
  // to Open and Close CartDrawer (Stateful Variable )
  const [drawerOpen, setDrawerOpen] = useState(false);
  // to Open and Close CartDrawer (Functional Toggle )
  const toggleCartDrawer = () => {
    setDrawerOpen(!drawerOpen);
    console.log("CartDrawer Toggled");
  };

  return (
    <>
      <nav className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* leftsSide-logo */}
        <div>
          <Link to="/" className="text-2xl fonr-medium">
            Rabbit
          </Link>
        </div>
        {/* CenterSide - Navigation Links */}
        <div className="hidden md:flex space-x-6">
          <Link
            to="#"
            className="tetxt-gray-700 hover:text-black text size-sm font-medium uppercase"
          >
            men
          </Link>
          <Link
            to="#"
            className="tetxt-gray-700 hover:text-black text size-sm font-medium uppercase"
          >
            women
          </Link>
          <Link
            to="#"
            className="tetxt-gray-700 hover:text-black text size-sm font-medium uppercase"
          >
            Top Wear
          </Link>
          <Link
            to="#"
            className="tetxt-gray-700 hover:text-black text size-sm font-medium uppercase"
          >
            Bottom Wear
          </Link>
        </div>
        {/* RightSide - Icons */}
        <div className="flex items-center space-x-4">
          {/* First Icon - userIcon */}
          <Link to="/profile" className="hover:text-black">
            <HiOutlineUser className="h-6 w-6 text-gray-700" />
          </Link>
          {/* Second Icon - ShoppingBagIcon  */}
          <button
            onClick={toggleCartDrawer}
            className="relative hover:text-black"
          >
            <HiOutlineShoppingBag className="h-6 w-6 text-gray-700" />
            {/* => span to show items count in cart */}
            <span className="absolute -top-1 bg-rabbit-red text-white text-xs rounded-full px-2 py-0.5">
              4
            </span>
          </button>
          {/* Third Icon -SearchBar */}
          <div className="overflow-hidden cursor-pointer">
            <SearchBar />
          </div>
          {/* Humbuger Icon - only for mobile devices */}
          <button className="md:hidden">
            <HiBars3BottomRight className="h-6 w-6 text-gray-700 " />
          </button>
        </div>
      </nav>
      {/* CartDrawer Component - Outside of the nav tag */}
      <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />
    </>
  );
};
