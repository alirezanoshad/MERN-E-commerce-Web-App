// Icons importance - react-icons library
import { HiShoppingBag } from "react-icons/hi";
import { HiArrowPathRoundedSquare, HiOutlineCreditCard } from "react-icons/hi2";

export const FeaturesSection = () => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {/* Feature 1 */}
        <div className="flex flex-col items-center ">
          <div className="p-4 rounded-full mb-3">
            <HiShoppingBag className="text-2xl" />
          </div>
          <h4 className="tracking-tighter mb-2">FREE INTERNATIONAL SHIPPING</h4>
          <p className="text-gray-600 text-sm tracking-tighter">
            On all orders over $100.00
          </p>
        </div>
        {/* Feature 2 */}
        <div className="flex flex-col items-center ">
          <div className="p-4 rounded-full mb-3">
            <HiArrowPathRoundedSquare className="text-2xl" />
          </div>
          <h4 className="tracking-tighter mb-2">45 DAYS RETURN</h4>
          <p className="text-gray-600 text-sm tracking-tighter">
            Money back guarantee
          </p>
        </div>
        {/* Feature 3 */}
        <div className="flex flex-col items-center ">
          <div className="p-4 rounded-full mb-3">
            <HiOutlineCreditCard className="text-2xl" />
          </div>
          <h4 className="tracking-tighter mb-2">SECURE CHECKOUT</h4>
          <p className="text-gray-600 text-sm tracking-tighter">
            100% secure checkout proccess
          </p>
        </div>
      </div>
    </section>
  );
};
