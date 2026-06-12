// Icon
import { RiDeleteBin3Line } from "react-icons/ri";
// Redux
import { useDispatch } from "react-redux";
import {
  updateCartItemQuantity,
  removeFromCart,
} from "../../redux/slices/cartSlice";

// CartContents component - contains the products in the cart.
export const CartContents = ({ cartProducts, guestId, userId }) => {
  console.log(cartProducts?.products);

  const dispatch = useDispatch();

  // Hanle adding or substracting to cart
  const handleAddToCart = ({ quantity, delta, color, size, productID }) => {
    console.log("handleAddToCart");
    console.log({ quantity, delta, color, size, productID });
    // Calculate new quantity
    const newQuantity = quantity + delta;
    // Checkpoint quantity amount
    if (newQuantity >= 1) {
      dispatch(
        updateCartItemQuantity({
          productID,
          guestID: guestId,
          userID: userId,
          color,
          size,
          quantity: newQuantity,
        }),
      );
    }
  };

  // Handle removing a product from cart
  const handleRemoveFromCart = ({ color, size, productID }) => {
    console.log("handleRemoveFromCart");
    dispatch(
      removeFromCart({
        productID,
        guestID: guestId,
        userID: userId,
        color,
        size,
      }),
    );
  };

  // JSX
  return (
    // Returns a div - scrollable area with the products in the cart
    <div>
      {cartProducts &&
        cartProducts?.products?.map((product) => (
          // cartProduct div
          <div
            key={product.productID}
            className="flex items-start justify-between py-4 border-b border-gray-200"
          >
            <div className="flex items-start">
              <img
                src={product.image}
                alt={product.name}
                className=" w-20 h-24 object-cover mr-4 rounded"
              />
              <div>
                <div>
                  <h3>{product.name}</h3>
                  <p className="text-sm text-gray-500">
                    Size: {product.size} | Color: {product.color}{" "}
                  </p>
                </div>
                <div className="flex items-center mt-2 mr-4">
                  <button
                    className="border rounded-full px-2 text-xl font-medium text-gray-500 hover:cursor-pointer hover:text-gray-700"
                    type="button"
                    onClick={() =>
                      handleAddToCart({
                        size: product.size,
                        color: product.color,
                        productID: product.productID,
                        quantity: product.quantity,
                        delta: -1,
                      })
                    }
                  >
                    -
                  </button>
                  <span className="mx-2">{product.quantity}</span>
                  <button
                    className="border rounded-full px-2  text-xl font-medium text-gray-500 hover:cursor-pointer hover:text-gray-700"
                    type="button"
                    onClick={() =>
                      handleAddToCart({
                        size: product.size,
                        color: product.color,
                        productID: product.productID,
                        quantity: product.quantity,
                        delta: 1,
                      })
                    }
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <p>
                $
                {product?.discountPrice
                  ? product?.discountPrice * product?.quantity
                  : product?.price * product?.quantity}
              </p>
              <button
                className="cursor-pointer"
                onClick={() =>
                  handleRemoveFromCart({
                    size: product.size,
                    color: product.color,
                    productID: product.productID,
                  })
                }
              >
                <RiDeleteBin3Line className="h-6 w-6 mt-2 text-red-400" />
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};
