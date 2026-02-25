import { Link } from "react-router-dom";
import womenCollectionImg from "../../assets/womens-collection.webp";
import menCollectionImg from "../../assets/mens-collection.webp";
import { Component } from "react";

// GenderCollectionSection Component - includes 2 collection's banner.
export const GenderCollectionSection = () => {
  return (
    <section className="py-16 px-4 lg:px-0 bg-white">
      <div className="container mx-auto flex flex-col md:flex-row gap-8 bg-white">
        {/* Women's Collention */}
        <div className="relative flex-1">
          <img
            src={womenCollectionImg}
            alt="Women's Collection"
            className="w-full h-[700px] object-cover"
          />
          <div className="absolute bg-white/90 bottom-8 left-8 p-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Women's Collection
            </h2>
            <Link
              to="/collections/all?gender=women"
              className="underline text-gray-900"
            >
              Shop Now
            </Link>
          </div>
        </div>

        {/* Men's Collention */}
        <div className="relative flex-1">
          <img
            src={menCollectionImg}
            alt="Men's Collection"
            className="w-full h-[700px] object-cover"
          />
          <div className="absolute bg-white/90 bottom-8 left-8 p-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Men's Collection
            </h2>
            <Link
              to="/collections/all?gender=men"
              className="underline text-gray-900"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
