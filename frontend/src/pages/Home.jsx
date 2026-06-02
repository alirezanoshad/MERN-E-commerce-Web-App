// Imports.
import { HeroSection } from "../components/Layout/HeroSection.jsx";
import { GenderCollectionSection } from "../components/Products/GnederCollectionSection.jsx";
import { NewArrivals } from "../components/Products/NewArrivals.jsx";
import { ProductDetails } from "../components/Products/ProductDetails.jsx";
import { ProductGrid } from "../components/Products/ProductGrid.jsx";
import { FeaturedCollection } from "../components/Products/FeaturedCollection.jsx";
import { FeaturesSection } from "../components/Products/FeaturesSection.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
// Redux Hooks.
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByFilters } from "../redux/slices/productsSlice.js";

// Home component - includes main contetnts of home page
export const Home = () => {
  const dispatch = useDispatch();
  // Redux store states.
  const { products, loading, error } = useSelector((state) => state.products);
  // Store best seller product info
  const [bestSellerProduct, setBestSellerProduct] = useState();

  useEffect(() => {
    // Fetch Products for a specific collection
    dispatch(
      fetchProductsByFilters({
        gender: "Women",
        category: "Bottom Wear",
        limit: 8,
      }),
    );

    // Fetch Best Seller Product
    const fetchBestSeller = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/product/best-seller",
        );
        setBestSellerProduct(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBestSeller();
  }, [dispatch]);

  // JSX
  return (
    <div>
      <HeroSection />
      <GenderCollectionSection />
      <NewArrivals />

      {/* Best Seller & Similar Products */}
      <h2 className="text-3xl text-center font-bold mb-4">Best Seller</h2>
      {bestSellerProduct ? (
        <ProductDetails productId={bestSellerProduct._id} />
      ) : (
        <p className="text-center p-2 mb-8">Loading Best Seller Product...</p>
      )}

      {/* Top Wears For Women section */}
      <div className="container mx-auto">
        <h2 className="text-3xl text-center font-bold mb-4">
          Top Wears For Women
        </h2>
        <ProductGrid
          passedProducts={products}
          loading={loading}
          error={error}
        />
      </div>

      <FeaturedCollection />
      <FeaturesSection />
    </div>
  );
};
