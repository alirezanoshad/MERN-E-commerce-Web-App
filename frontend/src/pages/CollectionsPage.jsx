import { useEffect, useRef, useState } from "react";

// Test images
import wp1 from "../assets/topWearsForWomen/wp1.webp";
import wp2 from "../assets/topWearsForWomen/wp2.webp";
import wp3 from "../assets/topWearsForWomen/wp3.webp";
import wp4 from "../assets/topWearsForWomen/wp4.webp";
import wp5 from "../assets/topWearsForWomen/wp5.webp";
import wp6 from "../assets/topWearsForWomen/wp6.webp";
import wp7 from "../assets/topWearsForWomen/wp7.webp";
import wp8 from "../assets/topWearsForWomen/wp8.webp";

// Filter Icon
import { FaFilter } from "react-icons/fa";
import { FilterSidebar } from "../components/Products/FilterSidebar";
import { SortOptions } from "../components/Products/SortOptions";
import { ProductGrid } from "../components/Products/ProductGrid";

export const CollectionsPage = () => {
  const [products, setProducts] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
    console.log("toggleSidebar happened");
  };

  // close the sidebar if clicked outside of it
  const handleClickOutside = (e) => {
    // if sidebar is loaded and click is not on sidebar, then close it
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      console.log("handleClickOutside happened");
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    // Add event listener for clicks
    document.addEventListener("mousedown", handleClickOutside);
    // Remove event listener - cleaup function
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  useEffect(() => {
    setTimeout(() => {
      const fetchedProducts = [
        {
          _id: 1,
          name: "High-Waist Skinny Jeans",
          price: 29.99,
          images: [{ url: wp1, altText: "" }],
        },
        {
          _id: 2,
          name: "Flared palazzo pants",
          price: 29.99,
          images: [{ url: wp2, altText: "" }],
        },
        {
          _id: 3,
          name: "Classic Pleated Trousers",
          price: 29.99,
          images: [{ url: wp3, altText: "" }],
        },
        {
          _id: 4,
          name: "Classic Pleated Trousers",
          price: 29.99,
          images: [{ url: wp4, altText: "" }],
        },
        {
          _id: 5,
          name: "Classic Pleated Trousers",
          price: 29.99,
          images: [{ url: wp5, altText: "" }],
        },
        {
          _id: 6,
          name: "Classic Pleated Trousers",
          price: 29.99,
          images: [{ url: wp6, altText: "" }],
        },
        {
          _id: 7,
          name: "Classic Pleated Trousers",
          price: 29.99,
          images: [{ url: wp7, altText: "" }],
        },
        {
          _id: 8,
          name: "Classic Pleated Trousers",
          price: 29.99,
          images: [{ url: wp8, altText: "" }],
        },
      ];
      setProducts(fetchedProducts);
    }, 1000);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Mobile Filter Btn */}
      <button
        className="lg:hidden border border-gray-300 p-2 flex justify-center items-center"
        onClick={toggleSidebar}
      >
        <FaFilter className="mr-2" />
        <span>Filters</span>
      </button>

      {/* Filter Sidebar */}
      <div
        ref={sidebarRef}
        className={`z-50 fixed ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out inset-y-0 left-0 w-64 bg-white lg:static lg:translate-x-0`}
      >
        <FilterSidebar />
      </div>

      <div className="grow p-4">
        <h2 className="text-2xl uppercase mb-4 text-center">All Collection</h2>

        <div className="flex justify-end pr-4">
          {/* Sort Options */}
          <SortOptions />
        </div>

        {/* Product Grid */}
        <ProductGrid products={products} />
      </div>
    </div>
  );
};
