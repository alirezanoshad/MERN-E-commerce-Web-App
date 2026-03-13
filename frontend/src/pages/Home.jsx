// imports
import { HeroSection } from "../components/Layout/HeroSection.jsx";
import { GenderCollectionSection } from "../components/Products/GnederCollectionSection.jsx";
import { NewArrivals } from "../components/Products/NewArrivals.jsx";
import { ProductDetails } from "../components/Products/ProductDetails.jsx";
import { ProductGrid } from "../components/Products/ProductGrid.jsx";
import { FeaturedCollection } from "../components/Products/FeaturedCollection.jsx";
import { FeaturesSection } from "../components/Products/FeaturesSection.jsx";

// Test images
import wp1 from "../assets/topWearsForWomen/wp1.webp";
import wp2 from "../assets/topWearsForWomen/wp2.webp";
import wp3 from "../assets/topWearsForWomen/wp3.webp";
import wp4 from "../assets/topWearsForWomen/wp4.webp";
import wp5 from "../assets/topWearsForWomen/wp5.webp";
import wp6 from "../assets/topWearsForWomen/wp6.webp";
import wp7 from "../assets/topWearsForWomen/wp7.webp";
import wp8 from "../assets/topWearsForWomen/wp8.webp";

// Test products - Top Wears For Women section
const placeholderProducts = [
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

// Home component - includes main contetnts of home page
export const Home = () => {
  return (
    <div>
      <HeroSection />
      <GenderCollectionSection />
      <NewArrivals />

      {/* Best Seller & Similar Products */}
      <h2 className="text-3xl text-center font-bold mb-4">Best Seller</h2>
      <ProductDetails />

      {/* Top Wears For Women section */}
      <div className="container mx-auto">
        <h2 className="text-3xl text-center font-bold mb-4">
          Top Wears For Women
        </h2>
        <ProductGrid products={placeholderProducts} />
      </div>

      <FeaturedCollection />
      <FeaturesSection />
    </div>
  );
};
