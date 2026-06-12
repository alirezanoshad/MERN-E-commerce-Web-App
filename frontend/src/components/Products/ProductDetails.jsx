import { useEffect, useState } from "react";
import { ProductGrid } from "./ProductGrid.jsx";
// Sonner library - for add to cart notifications
import { toast } from "sonner";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductDetails,
  fetchSimilarProducts,
} from "../../redux/slices/productsSlice.js";
import { AddToCart } from "../../redux/slices/cartSlice.js";

// ProductDetails Component
export const ProductDetails = ({ productId }) => {
  const dispatch = useDispatch();
  // Get ID from URL
  const { id } = useParams();
  // Redux State - product
  const { selectedProduct, similarProducts, loading, error } = useSelector(
    (state) => state.products,
  );
  console.log(selectedProduct);

  // Redux State - userInfo
  const { user, guestId } = useSelector((state) => state.auth);
  const userID = user ? user.id : null;

  // Variables to store UI states
  const [mainImg, setMainImg] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isButtonDisabled, setButtonDisabled] = useState(false);

  const productFetchId = productId || id;

  useEffect(() => {
    // Reset seelected info
    setMainImg(null);
    setSelectedSize(null);
    setSelectedColor(null);
    setQuantity(1);

    // Fetch Product by ID
    if (productFetchId) {
      dispatch(fetchProductDetails(productFetchId)).then(() => {});

      dispatch(fetchSimilarProducts({ id: productFetchId }));
    }
  }, [dispatch, productFetchId]);

  useEffect(() => {
    // mainImg set
    if (selectedProduct?.images?.length > 0) {
      setMainImg(selectedProduct?.images[0]);
    }
  }, [selectedProduct]);

  // mainImgSwitch Function
  const mainImgSwitch = (image) => {
    setMainImg(image);
  };

  // => Functions to handle personal details of order
  const selectedSizeFunc = (size) => {
    setSelectedSize(size);
  };
  const selectedColorFunc = (color) => {
    setSelectedColor(color);
  };
  const quantityFunc = (action) => {
    if (action === "plus") setQuantity((prev) => prev + 1);
    if (action === "minus" && quantity > 1) setQuantity((prev) => prev - 1);
  };

  // Add to cart function
  const addToCartFunc = () => {
    // Checkpoint on size and color
    if (!selectedSize || !selectedColor) {
      toast.error("Please select size and color before adding to cart.", {
        duration: 1000,
      });
      return;
    }
    // Disable btn.
    setButtonDisabled(true);
    // dispatch the request
    dispatch(
      AddToCart({
        productID: productFetchId,
        quantity: quantity,
        size: selectedSize,
        color: selectedColor,
        guestID: guestId,
        userID,
      }),
    )
      .then(() => {
        // Dispay success toast after 2 sec.
        toast.success("Product added to cart", { duration: 1000 });

        // Reset seelected info
        setSelectedSize(null);
        setSelectedColor(null);
        setQuantity(1);
      })
      .finally(() => {
        // Enable btn again
        setButtonDisabled(false);
      });
  };

  // Check Loading Condition
  if (loading) {
    return <p className="text-center p-4">Loading...</p>;
  }

  // Check Error Condition
  if (error) {
    return <p className="text-center p-4">Error...</p>;
  }

  // JSX
  return (
    <div className="p-6">
      {selectedProduct && (
        <div className="max-w-6xl mx-auto p-8 rounded-lg">
          <div className="flex flex-col md:flex-row">
            {/* Left Thumbnails - Only displays on md & up */}
            <div className="hidden md:flex flex-col space-y-4 mr-6">
              {selectedProduct?.images.map((image, index) => (
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
              {selectedProduct?.images.map((image, index) => (
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
                {selectedProduct?.name}
              </h2>
              {selectedProduct?.price && selectedProduct?.discountPrice ? (
                <div>
                  <p className="text-lg text-gray-600 mb-1 line-through">
                    ${selectedProduct.price}
                  </p>
                  <p className="text-lg text-gray-800 mb-1 font-medium">
                    ${selectedProduct.discountPrice}
                  </p>
                </div>
              ) : (
                <p className="text-lg text-gray-800 mb-1 font-medium">
                  ${selectedProduct.price}
                </p>
              )}

              {/* <p className="text-xl text-gray-500 mb-2">
                $ {selectedProduct?.discountPrice}
              </p> */}
              <p className="text-gray-600 mb-4">
                {selectedProduct?.description}
              </p>

              {/* Color select */}
              <div className="mb-4">
                <p className="text-gray-700">Color:</p>
                <div className="flex gap-2 mt-2">
                  {selectedProduct?.colors?.map((color) => (
                    <button
                      key={color}
                      className={`w-8 h-8 rounded-full border ${selectedColor === color ? "border-black border-4" : "border-gray-300"}`}
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
                  {selectedProduct?.sizes?.map((size) => (
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
                      <td className="py-1">{selectedProduct?.brand}</td>
                    </tr>
                    <tr>
                      <td className="py-1">Material</td>
                      <td className="py-1">{selectedProduct?.material}</td>
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
            <ProductGrid
              passedProducts={similarProducts}
              loading={loading}
              error={error}
            />
          </div>
        </div>
      )}
    </div>
  );
};
