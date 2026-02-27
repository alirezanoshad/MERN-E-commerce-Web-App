// imports
import { HeroSection } from "../components/Layout/HeroSection.jsx";
import { GenderCollectionSection } from "../components/Products/GnederCollectionSection.jsx";
import { NewArrivals } from "../components/Products/NewArrivals.jsx";

// Home component - includes main contetnts of home page
export const Home = () => {
  return (
    <div>
      <HeroSection />
      <GenderCollectionSection />
      <NewArrivals />
    </div>
  );
};
