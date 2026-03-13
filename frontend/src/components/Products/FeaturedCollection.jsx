import featured from "../../assets/featured.webp";
import { Link } from "react-router-dom";

export const FeaturedCollection = () => {
  return (
    <section className="py-16 px-4 lg:px-0">
      <div className=" container mx-auto flex flex-col-reverse lg:flex-row items-center bg-green-50 rounded-3xl">
        {/* Left Content */}
        <div className="lg:w-1/2 p-8 text-center lg:text-left">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Comfort and Style
          </h2>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Apparel made for your everyday life
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Discover high-quality, comfortable clothing that effortlessly blends
            fashion and function. Designed to make you look and feel great
            eeveryday.
          </p>
          <Link
            to="/collections/all"
            className="bg-black text-white px-6 py-4 rounded-lg text-lg hover:bg-gray-800"
          >
            <button>Shop Now</button>
          </Link>
        </div>
        {/* Right Content */}
        <div className="lg:w-1/2">
          <img
            src={featured}
            alt="Featured Collection"
            className="w-full h-full object-cover lg:rounded-r-3xl"
          />
        </div>
      </div>
    </section>
  );
};
