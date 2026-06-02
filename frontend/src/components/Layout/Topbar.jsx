import { TbBrandMeta } from "react-icons/tb";
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";
// Icons got imported from react-icons library, and will be use as components in the code.

// Topbar component includes 3 sections: leftSide(3 social media icons), center(text), rightSide(phone number)
export const Topbar = () => {
  return (
    <div className="bg-rabbit-red text-white">
      {/* container div */}
      <div className="container mx-auto flex justify-between items-center ">
        {/* leftside section */}
        <div className="hidden md:flex item-center space-x-4 md  ">
          <a href="#" className="hover:text-gray-300">
            {/* meta icon */}
            <TbBrandMeta className="h-5 w-5" />
          </a>
          <a href="#" className="hover:text-gray-300">
            {/* instagram icon */}
            <IoLogoInstagram className="h-5 w-5" />
          </a>
          <a href="#" className="hover:text-gray-300">
            {/* twitter icon */}
            <RiTwitterXLine className="h-5 w-4" />
          </a>
        </div>
        {/* center section */}
        <div className="text-sm text-center grow">
          {/* center text */}
          <span>We Ship WorldWide - Fast and Reliable Shipping!</span>
        </div>
        {/* rightside section */}
        <div className="hidden md:block text-sm">
          {/* phone number as a link */}
          <a href="tel:09363241408" className="hover:text-gray-300">
            (+98) 936-324-1408
          </a>
        </div>
      </div>
    </div>
  );
};
