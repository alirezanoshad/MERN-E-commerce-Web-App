// imports
import { Link } from "react-router-dom";
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";
import { TbBrandMeta } from "react-icons/tb";
import { FiPhoneCall } from "react-icons/fi";

// Footer component - includes 4 sections and footer's bottom.
export const Footer = () => {
  return (
    <footer className="border-t border-gray-300 py-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4 lg:px-0">
        {/* Section1 - Newsletter text */}
        <div>
          <h3 className="text-lg text-gray-800 mb-4 ">Newslatter</h3>
          <p className="text-gray-500 mb-4">
            Be The First To Hear about new products, exclusive events, and
            online offers.
          </p>
          <p className="font-medium text-sm text-gray-600 mb-6">
            Sign up and get 10% off your first order.
          </p>

          {/* Newsletter form */}
          <form className="flex ">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-3 w-full text-sm border-t border-l border-b border-gray-300 rounded-l-md focus:ring-2 focus:ring-gray-500"
              required
            />
            <button
              type="submit"
              className="bg-black text-white px-4 py-3 text-sm rounded-r-md hover:bg-gray-800 transition-all pt-2"
            >
              Subscribe
            </button>
          </form>
        </div>
        {/* Section2 - Shop Links */}
        <div>
          <h3 className="text-lg text-gray-800 mb-4 ">Shop</h3>
          <ul className="text-gray-600 space-y-3">
            <li>
              <Link
                to="#"
                className="text-sm text-gray-500 hover:text-gray-600 transition-colors"
              >
                Men's Top wear
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="text-sm text-gray-500 hover:text-gray-600 transition-colors"
              >
                Women's Top wear
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="text-sm text-gray-500 hover:text-gray-600 transition-colors"
              >
                Men's Bottom wear
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="text-sm text-gray-500 hover:text-gray-600 transition-colors"
              >
                Women's Bottom wear
              </Link>
            </li>
          </ul>
        </div>
        {/* Section3 - Support Links */}
        <div>
          <h3 className="text-lg text-gray-800 mb-4 ">Support</h3>
          <ul className="text-gray-600 space-y-3">
            <li>
              <Link
                to="#"
                className="text-sm text-gray-500 hover:text-gray-600 transition-colors"
              >
                Contact us
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="text-sm text-gray-500 hover:text-gray-600 transition-colors"
              >
                About us
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="text-sm text-gray-500 hover:text-gray-600 transition-colors"
              >
                FAQs
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="text-sm text-gray-500 hover:text-gray-600 transition-colors"
              >
                Features
              </Link>
            </li>
          </ul>
        </div>

        {/* Section4 - Follow us */}
        <div>
          <h3 className="text-lg text-gray-800 mb-4">Follow us</h3>
          <div className="flex items-center space-x-4 mb-6">
            <a
              href="https://facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-500"
            >
              <TbBrandMeta className="h-5 w-5" />
            </a>
            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-500"
            >
              <IoLogoInstagram className="h-5 w-5 " />
            </a>
            <a
              href="https://x.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-500"
            >
              <RiTwitterXLine className="h-4 w-4 " />
            </a>
          </div>
          <div className="mt-5 space-y-2">
            <p className=" text-gray-500">Call us</p>
            <p>
              <FiPhoneCall className="inline-block mr-2" />
              0123-456-789
            </p>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="container mx-auto mt-12 px-4 lg:px-0 border-t border-gray-200 pt-6">
        <p className="text-center text-gray-500 text-sm tracking-tighter">
          © 2025, NOREX. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};
