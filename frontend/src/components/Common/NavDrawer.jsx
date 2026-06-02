import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";

export const NavDrawer = ({ navDrawerOpen, toggleNavDrawer }) => {
  return (
    <div
      className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:1/3 h-full bg-white shadow-lg transition-transform duration-300 z-50 ${navDrawerOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      <div className="flex justify-end p-4">
        <button type="button" onClick={toggleNavDrawer}>
          <IoMdClose className="h-6 w-6 text-gray-600" />
        </button>
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">Menu</h2>
        <nav className="flex flex-col space-y-4">
          <Link
            to="collections/all?gender=Men"
            className="block text-gray-600 hover:text-black"
          >
            men
          </Link>
          <Link
            to="collections/all?gender=Women"
            className="block text-gray-600 hover:text-black"
          >
            woman
          </Link>
          <Link
            to="collections/all?cartgory=Top Wear"
            className="block text-gray-600 hover:text-black"
          >
            Top Wear
          </Link>
          <Link
            to="collections/all?category=Bottom Wear"
            className="block text-gray-600 hover:text-black"
          >
            Bottom Wear
          </Link>
        </nav>
      </div>
    </div>
  );
};
