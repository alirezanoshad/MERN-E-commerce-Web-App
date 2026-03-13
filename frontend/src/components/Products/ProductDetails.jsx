import { useEffect, useState } from "react";
import { ProductGrid } from "./ProductGrid.jsx";
// Sonner library - for add to cart notifications
import { toast } from "sonner";
// Test images - Best Seller section
import img1 from "../../assets/featured.webp";
import img2 from "../../assets/register.webp";
// Test images - Similar Products section
import p1 from "../../assets/similarProducts/p1.webp";
import p2 from "../../assets/similarProducts/p2.webp";
import p3 from "../../assets/similarProducts/p3.webp";
import p4 from "../../assets/similarProducts/p4.webp";



// Test product
const selectedProduct = {
  name: "Stylish Jacket",
  price: 120,

  description:
    "This is a stylish jacket made from high-quality materials. Perfect for any occasion.",
  brand: "FshionCo",
  material: "silk",
  colors: ["BluE", "rEd", "grEEn"],
  sizes: ["s", "m", "L", "xL"],
  images: [
    {
      url: img1,
      altText: "Stylish Jacket 1",
    },
    {
      url: img2,
      altText: "Stylish Jacket 2",
    },
  ],
};

// Test similar products
const similarProducts = [
  {
    _id: 1,
    name: "Classic Oxford Button-Down Shirt",
    price: 39.99,
    images: [
      { url: p1, altText: "product1 image" },
      { url: img2, altText: "product2 image" },
    ],
  },
  {
    _id: 2,
    name: "Slim-Fit Stretch Shirt",
    price: 29.99,
    images: [
      { url: p2, altText: "product1 image" },
      { url: img2, altText: "product2 image" },
    ],
  },
  {
    _id: 3,
    name: "Casual Denim Shirt",
    price: 49.99,
    images: [
      { url: p3, altText: "product1 image" },
      { url: img2, altText: "product2 image" },
    ],
  },
  {
    _id: 4,
    name: "Printed Resort Shirt",
    price: 29.99,
    images: [
      { url: p4, altText: "product1 image" },
      { url: img2, altText: "product2 image" },
    ],
  },
];

export const ProductDetails = () => {
  // Variables to store UI states
  const [mainImg, setMainImg] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isButtonDisabled, setButtonDisabled] = useState(false);

  // mainImg set
  useEffect(() => {
    if (selectedProduct?.images?.length > 0) {
      setMainImg(selectedProduct.images[0]);
    }
  }, [selectedProduct]);

  // mainImgSwitch Function
  const mainImgSwitch = (image) => {
    setMainImg(image);
    // console.log(`
    // mainImgSwitch!
    // mainImg.url: ${mainImg.url}
    // mainImg.altText: ${mainImg.altText}`);
  };

  // => Functions to handle personal details of order
  const selectedSizeFunc = (size) => {
    setSelectedSize(size);
  };
  const selectedColorFunc = (color) => {
    setSelectedColor(color);
  };
  const quantityFunc = (action) => {
    console.log(action);
    if (action === "plus") setQuantity((prev) => prev + 1);
    if (action === "minus" && quantity > 1) setQuantity((prev) => prev - 1);
  };

  // Add to cart function
  const addToCartFunc = () => {
    if (!selectedSize || !selectedColor) {
      console.log("not selected");
      toast.error("Please select size and color before adding to cart.", {
        duration: 1000,
      });
      return;
    }
    // Disable btn.
    setButtonDisabled(true);
    // Enable btn again & show success toast after 2 sec.
    setTimeout(() => {
      toast.success("Added to cart!", { duration: 5000 });
      setButtonDisabled(false);
      console.log(isButtonDisabled);
    }, 2000);
  };

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto p-8 rounded-lg">
        <div className="flex flex-col md:flex-row">
          {/* Left Thumbnails - Only displays on md & up */}
          <div className="hidden md:flex flex-col space-y-4 mr-6">
            {selectedProduct.images.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={image.altText || `Thumbnail ${index}`}
                onClick={() => mainImgSwitch(image)}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${mainImg?.url === image.url ? "border-black" : "border-gray-300"}`}
              />
            ))}
          </div>

          {/* Main section - Image */}
          <div className="md:w-1/2">
            <div className="mb-4">
              <img
                src={mainImg?.url}
                alt={mainImg?.altText || `Thumbnail of ${mainImg?.url}`}
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
          </div>

          {/* Mobile Thumbnails - Only displays on sm */}
          <div className="md:hidden flex overflow-x-scroll space-x-4 mb-4">
            {selectedProduct.images.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={image.altText || `Thumbnail ${index}`}
                onClick={() => mainImgSwitch(image)}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${mainImg?.url === image.url ? "border-black" : "border-gray-300"}`}
              />
            ))}
          </div>

          {/* Right section - Product info  */}
          <div className="md:w-1/2 md:ml-10 ">
            <h2 className="text-2xl md:text-3xl font-semibold mb-2">
              {selectedProduct.name}
            </h2>
            <p className="text-lg text-gray-600 mb-1 line-through">
              {selectedProduct.originalPrice &&
                `${selectedProduct.originalPrice}`}
            </p>
            <p className="text-xl text-gray-500 mb-2">
              $ {selectedProduct.price}
            </p>
            <p className="text-gray-600 mb-4">{selectedProduct.description}</p>

            {/* Color select */}
            <div className="mb-4">
              <p className="text-gray-700">Color:</p>
              <div className="flex gap-2 mt-2">
                {selectedProduct.colors.map((color) => (
                  <button
                    key={color}
                    className={`w-8 h-8 rounded-full  ${selectedColor === color ? "border-black border-4" : "border-gray-200"}`}
                    style={{
                      backgroundColor: color.toLowerCase(),
                      filter: "brightness(0.9)",
                    }}
                    onClick={() => selectedColorFunc(color)}
                  ></button>
                ))}
              </div>
            </div>

            {/* Size select */}
            <div className="mb-4">
              <p className="text-gray-700">Size:</p>
              <div className="flex gap-2 mt-2">
                {selectedProduct.sizes.map((size) => (
                  <button
                    key={size}
                    className={`text-lg border py-2 px-4 border-gray-300 rounded ${size === selectedSize ? "bg-black text-white" : "bg-white"}`}
                    onClick={() => selectedSizeFunc(size)}
                  >
                    {size.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity select */}
            <div className="mb-6">
              <p className="text-gray-700">Quantity:</p>
              <div className="flex items-center space-x-4 mt-2">
                <button
                  className="px-2 py-1 bg-gray-200 rounded text-lg"
                  onClick={() => quantityFunc("minus")}
                >
                  -
                </button>
                <span className="text-lg">{quantity}</span>
                <button
                  className="px-2 py-1 bg-gray-200 rounded text-lg"
                  onClick={() => quantityFunc("plus")}
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to card btn */}
            <button
              className={`bg-black text-white w-full py-2 px-6 rounded mb-4 ${isButtonDisabled ? "bg-gray-500 cursor-not-allowed" : "hover:bg-gray-800 hover:cursor-pointer"}`}
              onClick={addToCartFunc}
              disabled={isButtonDisabled}
            >
              {isButtonDisabled ? "Please wait..." : "Add to Cart"}
            </button>

            {/* Characteristics details */}
            <div className="mt-10 text-gray-700">
              <h3 className="text-xl font-bold mb-4">Characteristics:</h3>
              <table className="w-full text-left text-sm text-gray-600">
                <tbody>
                  <tr>
                    <td className="py-1">Brand</td>
                    <td className="py-1">{selectedProduct.brand}</td>
                  </tr>
                  <tr>
                    <td className="py-1">Material</td>
                    <td className="py-1">{selectedProduct.material}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="mt-20">
          <h2 className="text-2xl text-center font-medium mb-4">
            You May Also Like
          </h2>
          <ProductGrid product={similarProducts} />
        </div>
      </div>
    </div>
  );
};
