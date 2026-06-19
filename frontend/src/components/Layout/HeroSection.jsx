//imports
import heroImg from "../../assets/rabbit-hero.webp";
import { Link } from "react-router-dom";

// HeroSection component - Home page
export const HeroSection = () => {
  return (
    <section className="relative">
      <img
        src={heroImg}
        alt="Hero Section"
        className="w-full h-100 md:h-150 lg:h-187.5 object-cover"
      />
      <div className="absolute inset-0 bg-black/15 flex items-center justify-center">
        <div className="text-center text-white p-6">
          <h1 className="text-4xl md:text-9xl font-bold uppercase tracking-tighter mb-4">
            Vacation <br /> Ready
          </h1>
          <p className="text-sm tracking-tighter md:text-lg mb-6">
            Explore out vacation-ready outfits with fast worldwde shipping.
          </p>
          <Link
            to="#"
            className="bg-white rounded-sm text-gray-950 py-2 px-6 text-lg"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
};
