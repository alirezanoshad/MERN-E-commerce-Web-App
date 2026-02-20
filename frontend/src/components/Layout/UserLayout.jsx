// Structure a layout that users could see(whether they are logged in or not)
import React from "react";
import { Header } from "../Common/Header";

// Our Userlayout includes 3 components: 2 common components(haeder - footer), and the main-content component(different context for different pages)
export const UserLayout = () => {
  return (
    <>
      {/* Header */}
      <Header />
      {/* Main-content */}
      {/* Footer */}
    </>
  );
};
