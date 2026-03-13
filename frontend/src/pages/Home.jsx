// imports
import { HeroSection } from "../components/Layout/HeroSection.jsx";
import { GenderCollectionSection } from "../components/Products/GnederCollectionSection.jsx";
import { NewArrivals } from "../components/Products/NewArrivals.jsx";
import { ProductDetails } from "../components/Products/ProductDetails.jsx";

// Home component - includes main contetnts of home page
export const Home = () => {
  return (
    <div>
      <HeroSection />
      <GenderCollectionSection />
      <NewArrivals />

      {/* Best Seller */}
      <h2 className="text-3xl text-center font-bold mb-4">Best Seller</h2>
      <ProductDetails />
    </div>
  );
};
