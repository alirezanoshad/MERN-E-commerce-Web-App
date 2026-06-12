// Imports
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

// NewArrivals component - displays new arrival products.
export const NewArrivals = () => {
  // *Reference to scroll container (direct DOM access)
  const scrollRef = useRef(null);

  // Controls button enable/disable state
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  //// => Mouse drag interactions
  // Checks if it can be scrolled.
  const [isDragging, setIsDragging] = useState(false);
  // Scroll location at start of scroll.
  const [scrollLeft, setScrollLeft] = useState(0);
  // Start point of  X-axis scroll - initial = 0
  const [startX, setStartX] = useState(0);

  // NewArrivals Section State
  const [newArrivals, setNewArrivals] = useState([]);

  // Fetch Data & Store In State - New Arrivals Section
  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/product/new-arrivals",
        );
        setNewArrivals(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchNewArrivals();
  }, []);

  // adds eventListener(on mount) => updateScrollButtons function when "scroll" happens.
  useEffect(() => {
    const container = scrollRef.current;
    // console.log(container);
    if (container) {
      container.addEventListener("scroll", updateScrollButtons);
      updateScrollButtons();
    }
    return () => container.removeEventListener("scroll", updateScrollButtons);
  }, [newArrivals]);

  // Button'statement Update - Determines possibility of right & left srolling
  const updateScrollButtons = () => {
    const container = scrollRef.current;

    if (container) {
      const leftScroll = container.scrollLeft;
      const rightScrollable =
        container.scrollWidth > leftScroll + container.clientWidth;

      setCanScrollLeft(leftScroll > 0);
      setCanScrollRight(rightScrollable);
    }
  };

  // Button scroll function - scrollBy method(300px by every click)
  const scrollFunBtn = (direction) => {
    const scrollAmount = direction === "left" ? -300 : 300;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  //// => Functions of mouse drag below:
  // 1-MouseDown - records starting point of mouse drag
  const handleMouseDown = (e) => {
    setIsDragging(true);
    console.log(e);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };
  // 2-MouseMove - mouse drag proccess
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = x - startX;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };
  // 3-MouseUpOrLeave - Stops dargging proccess(when mouse leaves)
  const handleMouseuUpOrLeave = () => {
    setIsDragging(false);
  };

  // JSX
  return (
    <section className="py-16 px-4 lg:px-0">
      {/* Text section */}
      <div className="container mx-auto flex flex-col mb-10">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-950 mb-4">
            Explore New Arrivals
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Discover the latest style straight off the runway, freshly added to
            keep your wardrobe on the cutting edge of fashion
          </p>
        </div>

        {/* Slider */}
        <div className="relative">
          {/* Scroll Button */}
          <div className="absolute right-0 top-0 space-x-1.5 mr-1">
            <button
              onClick={() => scrollFunBtn("left")}
              disabled={!canScrollLeft}
              className={`p-1 rounded-xl border ${canScrollLeft ? "bg-white text-black" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
            >
              <FiChevronLeft className="text-xl" />
            </button>
            <button
              onClick={() => scrollFunBtn("right")}
              disabled={!canScrollRight}
              className={`p-1 rounded-xl border ${canScrollRight ? "bg-white text-black" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
            >
              <FiChevronRight className="text-xl" />
            </button>
          </div>

          {/* Products div - Scrollable content */}
          <div
            ref={scrollRef}
            className={`container mx-auto overflow-x-scroll flex space-x-6 mt-10  relative ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseuUpOrLeave}
            onMouseLeave={handleMouseuUpOrLeave}
          >
            {/* Generating produtc div */}
            {newArrivals.length > 0 &&
              newArrivals.map((product) => (
                <div
                  key={product._id}
                  className="relative min-w-full sm:min-w-[50%] lg:min-w-[30%]"
                >
                  <img
                    src={product.images[0]?.url}
                    alt={product.images[0]?.altText}
                    className="w-full h-125 object-cover rounded-lg"
                    draggable="false"
                  />
                  <div className="absolute bottom-0 right-0 left-0 w-full h-25 backdrop-blur-md p-4 rounded-b-lg cursor-pointer">
                    <div className="w-full h-full flex flex-col justify-center">
                      <Link to={`/product/${product._id}`} className="block">
                        <h4 className=" text-white font-medium">
                          {product.name}
                        </h4>
                        <p className="text-white mt-1.5">
                          {product.discountPrice}
                        </p>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};
