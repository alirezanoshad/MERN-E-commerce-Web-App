// Structures The layout that users could see(whether they are logged in or not)
import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../Common/Header.jsx";
import { Footer } from "../Common/Footer.jsx";
import { Home } from "../../pages/Home.jsx";

// Our Userlayout includes 3 components: 2 common components(haeder - footer), and the main-content component(different context for different pages)
// Haeder & Footer are fixed(ثابت)
// Main-Content is dynamic(متغیر), so we need Outlet to render the content of different pages in the same layout.
export const UserLayout = () => {
  return (
    <>
      {/* Header */}
      <Header />

      {/* Main-content - based on page's URL */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
};
