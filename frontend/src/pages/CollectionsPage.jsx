// React Hooks
import { useEffect, useRef, useState } from "react";
// Filter Icon.
import { FaFilter } from "react-icons/fa";
// Components
import { FilterSidebar } from "../components/Products/FilterSidebar";
import { SortOptions } from "../components/Products/SortOptions";
import { ProductGrid } from "../components/Products/ProductGrid";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { fetchProductsByFilters } from "../redux/slices/productsSlice";

// CollectionsPage Component
export const CollectionsPage = () => {
  // Sidebar State
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  // Redux Store
  const { products, loading, error } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const { collection } = useParams();
  // Read URL Params
  const [searchParams] = useSearchParams();

  // Convert URL Params into an object
  const queryParams = Object.fromEntries([...searchParams]);

  // Toggle Sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  // handleClickOutside - Close the sidebar if clicked outside of it
  const handleClickOutside = (e) => {
    // if sidebar is loaded and click is not on sidebar, then close it
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setIsSidebarOpen(false);
    }
  };

  // Fetch Products By Filters By URL Params
  useEffect(() => {
    dispatch(fetchProductsByFilters({ collection, ...queryParams }));
  }, [dispatch, collection, searchParams]);

  // Sidebar event listener
  useEffect(() => {
    // Add event listener for clicks
    document.addEventListener("mousedown", handleClickOutside);
    // Remove event listener - cleaup function
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  // JSX
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
        <ProductGrid
          passedProducts={products}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  );
};
