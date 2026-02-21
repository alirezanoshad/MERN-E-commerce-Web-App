import { useState } from "react";
// import searchBar icon
import { HiMagnifyingGlass } from "react-icons/hi2";
// import closingSearchBar Icon
import { HiMiniXMark } from "react-icons/hi2";

// SearchBar component
export const SearchBar = () => {
  // searchTerm variable - storing the search inputs'value.
  const [searchTerm, setSearchTerm] = useState("");

  // isOpen variable - storing the searchBar form's statement(open or close) - set default to false in order to be closed by default
  const [isOpen, setIsOpen] = useState(false);

  const handleSearchToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSearch = (e) => {
    // a js method that stops the default action from happening
    e.preventDefault();
    console.log("Search Term:", searchTerm);
    // to close the form(after searching)
    setIsOpen(false);
  };

  // Returns a div(with if statement for its css and content)
  return (
    <div
      className={`flex items-center justify-center w-full transition-all duration-300 ${
        isOpen ? "absolute top-0 left-0 w-full bg-white h-24 z-50" : "w-auto"
      }`}
    >
      {isOpen ? (
        // isOpen:true - Displays searchForm
        <form
          onSubmit={(e) => handleSearch(e)}
          className="relative flex item-center justify-center w-full"
        >
          <div className="relative w-1/2">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-gray-100 px-4 py-2 pl-2 pr-12 rounded-lg focus:outline-none w-full placeholder:text-gray-700"
            />
            {/* searchIcon - NOTE: we MUST add type="submit" to our btn to work out*/}
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
            >
              <HiMagnifyingGlass className="h-6 w-6" />
            </button>
          </div>
          {/* closingSearchFormIcon - NOTE: we MUST add type="button" to our btn to work out*/}
          <button
            type="button"
            className="absolute right-24 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
            onClick={() => handleSearchToggle()}
          >
            <HiMiniXMark className="h-6 w-6" />
          </button>
        </form>
      ) : (
        // isOpen:false - only Displays searchIcon
        <button className="cursor-pointer" onClick={() => handleSearchToggle()}>
          <HiMagnifyingGlass className="h-6 w-6" />
        </button>
      )}
    </div>
  );
};
