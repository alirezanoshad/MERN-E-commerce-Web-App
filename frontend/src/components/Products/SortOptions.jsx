import { useSearchParams } from "react-router-dom";

export const SortOptions = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Handling option change.
  const handleSortChange = (e) => {
    console.log("Option changed");
    const sortBy = e.target.value;
    // Add sortBy to URL
    searchParams.set("sortBy", sortBy);
    setSearchParams(searchParams);
  };

  return (
    <div className="flex mb-4 items-center justify-end ">
      <select
        id="sort"
        onChange={handleSortChange}
        value={searchParams.get("sortBy") || ""}
        className="border p-2 border-gray-300 rounded-md focus:outline-none p"
      >
        <option value="">Default</option>
        <option value="priceAsc">Price: Low to High</option>
        <option value="priceDesc">Price: High to Low</option>
        <option value="popularity">Popularity</option>
      </select>
    </div>
  );
};
