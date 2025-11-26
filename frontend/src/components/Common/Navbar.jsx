import React from "react";
import { Link } from "react-router-dom";
import {
  HiOutlineUser,
  HiOutlineShoppingBag,
  HiBars3BottomRight,
} from "react-icons/hi2";
import { SearchBar } from "./SearchBar";

export const Navbar = () => {
  return (
    <nav className="container mx-auto flex items-center justify-between py-4 px-6 bg-green-300">
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
        <Link to="/profile" className="hover:text-black">
          <HiOutlineUser className="h-6 w-6 text-gray-700" />
        </Link>
        <button className="relative hover:text-black">
          <HiOutlineShoppingBag className="h-6 w-6 text-gray-700" />
          {/* span to show items count in cart */}
          <span className="absolute -top-1 bg-rabbit-red text-white text-xs rounded-full px-2 py-0.5">
            4
          </span>
        </button>
        {/* Search Icon */}
        <div className="overflow-hidden">
          <SearchBar />
        </div>
        {/* Humbuger Icon - only for mobile devices */}
        <button className="md:hidden">
          <HiBars3BottomRight className="h-6 w-6 text-gray-700" />
        </button>
      </div>
    </nav>
  );
};
