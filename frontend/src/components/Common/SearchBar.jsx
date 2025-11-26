import React from "react";
import { useState } from "react";
// importing searchBar icon
import { HiMagnifyingGlass } from "react-icons/hi2";
// importing closingSearchBar Icon
import { HiMiniXMark } from "react-icons/hi2";

export const SearchBar = () => {
  // for the search term
  const [searchTerm, setSearchTerm] = useState("");
  // to open and close the searchBar form (set the default value to false in order to be closed by default)
  const [isOpen, setIsOpen] = useState(false);

  function handleSraechToggle() {
    setIsOpen(!isOpen);
  }
  function handleSearch(e) {
    // a js method that stops the default action from happening
    e.preventDefault();
    console.log("Search Term:", searchTerm);
    // to close the form(after searching)
    setIsOpen(false);
  }

  return (
    <div
      className={`flex items-center justify-center w-full transition-all duration-300 ${
        isOpen ? "absolute top-0 left-0 w-full bg-white h-24 z-50" : "w-auto"
      }`}
    >
      {/* if only isOpen variaable is set to true, show the SearchForm, otherwise only show SearchIcon */}
      {isOpen ? (
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
              className="bg-gray-100 px-4 py-2 pl-2 pr-12 rounded-lg focus:outline-none w-full placehold:tex-gray-700"
            />
            {/* searchIcon while form is open - note: we MUST add type="submit" to our btn to work out*/}
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
            >
              <HiMagnifyingGlass className="h-6 w-6" />
            </button>
          </div>
          {/* closingSearchIcon - note: we MUST add type="button" to our btn to work out*/}
          <button
            type="button"
            className="absolute right-24 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
            onClick={() => handleSraechToggle()}
          >
            <HiMiniXMark className="h-6 w-6" />
          </button>
        </form>
      ) : (
        // searchIcon while form is open
        <button onClick={() => handleSraechToggle()}>
          <HiMagnifyingGlass className="h-6 w-6" />
        </button>
      )}
    </div>
  );
};
