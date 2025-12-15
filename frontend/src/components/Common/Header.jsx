import React from "react";
import { Topbar } from "../Layout/Topbar";
import { Navbar } from "./Navbar";

export const Header = () => {
  return (
    // border-b represents border bottom(1px by default)
    <header className="border-b border-gray-200">
      {/* Topbar */}
      <Topbar />
      {/* Navbar */}
      <Navbar />
      {/* Cart Drawer */}
    </header>
  );
};
