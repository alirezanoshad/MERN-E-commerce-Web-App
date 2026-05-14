import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export const FilterSidebar = () => {
  // to read and modify the Search Parameters.
  const [searchParams, setSearchParams] = useSearchParams();
  // example: x.com/?a=1&b=2 search paramas= a=1&b=2

  // changing URL based on sidebar filters.
  const navigate = useNavigate();

  // an object to store all filter values -
  // note: size, material, brand can have multiple values, so we use arrays to store them.
  const [filters, setFilters] = useState({
    category: "",
    gender: "",
    color: "",
    size: [],
    material: [],
    brand: [],
    minPrice: 0,
    maxPrice: 100,
  });

  // backend task - filter data
  const [priceRange, setPriceRange] = useState([0, 100]);
  const categories = ["Top Wear", "Bottom Wear"];
  const colors = [
    "Red",
    "Blue",
    "Black",
    "Yellow",
    "Gray",
    "White",
    "Pink",
    "Beige",
    "Navy",
  ];
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const materials = [
    "Cotton",
    "Wool",
    "Denim",
    "Polyester",
    "Silk",
    "Linen",
    "Viscose",
    "Fleece",
  ];
  const brands = [
    "Urban Threads",
    "Modern Fit",
    "Street Style",
    "Beach Breeze",
    "Fashioninsta",
    "chicStyle",
  ];
  const genders = ["Men", "Women"];

  useEffect(() => {
    const params = Object.fromEntries(searchParams);
    // example: {category: "Top Wear", maxPrice: 100} => i can access category and maxPrice as params.category and params.maxPrice

    // lets set default values for filters - set parameters from search params if they exist, otherwise set default values.
    setFilters({
      category: params.category || "",
      gender: params.gender || "",
      color: params.color || "",
      size: params.size ? params.size.split(",") : [],
      material: params.material ? params.material.split(",") : [],
      brand: params.brand ? params.brand.split(",") : [],
      minPrice: params.minPrice || 0,
      maxPrice: params.maxPrice || 100,
    });
    setPriceRange([0, params.maxPrice || 100]);
  }, [searchParams]);

  const handleFilterChange = (e) => {
    const { name, value, checked, type } = e.target;

    // before changing filters, lets get a copy of filters variable
    let newFilters = { ...filters };

    // checkbox fields can store muyltiple values, we need to array to store all of them.
    if (type === "checkbox") {
      if (checked) {
        // Summary: create a new array for "name" key, that grabs the previous value and adds the new values.
        newFilters[name] = [...(newFilters[name] || []), value]; // create an array and store all previous values of this "name" checkbox(if no checkbox is checked(empty array)), then add "value" to end of the array. example if we had blue and red is going to be added - newFilter[colors] = [...["blue"], "red"] => newFilters[colosr] => [["blue"],["red"]]
      } else {
        // if unchecked, then value gets removed from the array
        newFilters[name] = newFilters[name].filter((item) => item !== value);
      }
    } else {
      // for non-checkbox types, simpply assign the value to its key
      newFilters[name] = value;
    }
    //// At last::
    // Store new filters in state
    setFilters(newFilters);
    // Change URL based on Filters by calling updateURLParams function.
    updateURLParams(newFilters);
  };

  // URL Update logic
  const updateURLParams = (newFilters) => {
    const params = new URLSearchParams();
    // {category: "Top Wear", size: ["X","XS"]}
    Object.keys(newFilters).forEach((key) => {
      if (Array.isArray(newFilters) && newFilters[key].length > 0) {
        params.append(key, newFilters[key].join(","));
      } else if (newFilters[key]) {
        // if non-array and existed, add the key-value
        params.append(key, newFilters[key]);
      }
    });
    // Store params is state
    setSearchParams(params);
    // Change the URL
    navigate(`?${params.toString()}`); // example: ?category=Bottow+wear&size=XS%2CS
  };

  // Price Range
  const handlePriceChange = (e) => {
    // Get new value
    const newPrice = e.target.value;
    // Store the new value in state
    setPriceRange([0, newPrice]);
    // Store new value in filters.
    const newFilters = { ...filters, minPrice: 0, maxPrice: newPrice };
    setFilters(newFilters);
    // Update URL params
    updateURLParams(newFilters);
  };

  // JSX part.
  return (
    <div className="p-4">
      <h3 className="text-xl font-medium text-shadow-gray-800 mb-4">Filter</h3>

      {/* Category Filter */}
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">Category</label>
        {categories.map((category) => {
          return (
            <div key={category} className="flex items-center mb-1">
              <input
                type="radio"
                name="category"
                value={category}
                onChange={handleFilterChange}
                checked={filters.category === category}
                className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-slate-300 checked:border-slate-400 transition-all checked:bg-purple-500 mr-2"
              />
              <span className="text-gray-700">{category}</span>
            </div>
          );
        })}

        {/* Gender Filter */}
        <div className="mb-6 mt-8">
          <label className="block text-gray-700 font-medium mb-2">Gender</label>
          {genders.map((gender) => {
            return (
              <div key={gender} className="flex items-center mb-1">
                <input
                  type="radio"
                  name="gender"
                  value={gender}
                  onChange={handleFilterChange}
                  checked={filters.gender === gender}
                  className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-slate-300 checked:border-slate-400 transition-all checked:bg-green-500 mr-2"
                />
                <span className="text-gray-700">{gender}</span>
              </div>
            );
          })}
        </div>

        {/* Color Filter */}
        <div className="flex flex-wrap mb-6 mt-8">
          <label className="block text-gray-700 font-medium mb-2">Color</label>
          <div className="flex flex-wrap gap-2">
            {colors.map((color) => {
              return (
                <button
                  key={color}
                  type="radio"
                  name="color"
                  value={color}
                  onClick={handleFilterChange}
                  checked={filters.color === color}
                  className={`mr-2 h-7 w-7 border rounded-full text-blue-500 focus:ring-blue-400 border-gray-400 cursor-pointer transition-all duration-300 hover:scale-105 focus:border-gray-700 ${filters.color === color ? "ring-2 ring-blue-500" : ""}`}
                  style={{ backgroundColor: color.toLowerCase() }}
                ></button>
              );
            })}
          </div>
        </div>

        {/* Size Filter */}
        <div className="mb-6 mt-8">
          <label className="block text-gray-700 font-medium mb-2">Size</label>
          <div className="flex flex-col gap-2">
            {sizes.map((size) => {
              return (
                <div key={size} className="flex items-center mb-1">
                  <input
                    type="checkbox"
                    name="size"
                    value={size}
                    onChange={handleFilterChange}
                    checked={filters.size.includes(size)}
                    className="mr-2 h-4 w-4 text-blue-500"
                  />
                  <span className="text-gray-700">{size}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Material Filter */}
        <div className="mb-6 mt-8">
          <label className="block text-gray-700 font-medium mb-2">
            Material
          </label>
          <div className="flex flex-col gap-2">
            {materials.map((material) => {
              return (
                <div key={material} className="flex items-center mb-1">
                  <input
                    type="checkbox"
                    name="material"
                    value={material}
                    onChange={handleFilterChange}
                    checked={filters.material.includes(material)}
                    className="mr-2 h-4 w-4 text-blue-500"
                  />
                  <span className="text-gray-700">{material}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Brand Filter */}
        <div className="mb-6 mt-8">
          <label className="block text-gray-700 font-medium mb-2">Brand</label>
          <div className="flex flex-col gap-2">
            {brands.map((brand) => {
              return (
                <div key={brand} className="flex items-center mb-1">
                  <input
                    type="checkbox"
                    name="brand"
                    value={brand}
                    onChange={handleFilterChange}
                    checked={filters.brand.includes(brand)}
                    className="mr-2 h-4 w-4 text-blue-500"
                  />
                  <span className="text-gray-700">{brand}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Price Range filter */}
        <div className="mb-8 block ">
          <label htmlFor="" className="text-gray-600 font-medium">
            Price range
          </label>
          <input
            type="range"
            name="PriceRange"
            onChange={handlePriceChange}
            value={priceRange[1]}
            min={0}
            max={100}
            className="w-full mt-2 h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
          />

          <div className="flex justify-between text-gray-600 mt-2">
            <span>${priceRange[0]}</span>
            <span>$ {priceRange[1]}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
