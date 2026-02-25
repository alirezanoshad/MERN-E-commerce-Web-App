// imports
import { HeroSection } from "../components/Layout/HeroSection.jsx";
import { GenderCollectionSection } from "../components/Products/GnederCollectionSection.jsx";

// Home component - includes main contetnts of home page
export const Home = () => {
  return (
    <div>
      <HeroSection />
      <GenderCollectionSection />
    </div>
  );
};
