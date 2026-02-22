import { RiDeleteBin3Line } from "react-icons/ri";

// CartContents component - contains the products in the cart.
export const CartContents = () => {
  // Dummy data for cart products
  const cartProducts = [
    {
      ID: 1,
      name: "polo shirt",
      size: "L",
      color: "Blue",
      price: 1500,
      quantity: 1,
      image: "https://picsum.photos/200?random=1",
    },
    {
      ID: 2,
      name: "polo jeans",
      size: "M",
      color: "Yellow",
      price: 700,
      quantity: 1,
      image: "https://picsum.photos/200/300?random=1",
    },
  ];

  // Returns a div - scrollable area with the products in the cart
  return (
    <div>
      {cartProducts.map((product) => (
        // cartProduct div
        <div
          key={product.ID}
          className="flex items-start justify-between py-4 border-b border-gray-200"
        >
          <div className="flex items-start">
            <img
              src={product.image}
              alt={product.name}
              className=" w-20 h-24 object-cover mr-4 rounded"
            />
          </div>
          <div>
            <h3>{product.name}</h3>
            <p className="text-sm text-gray-500">
              Size: {product.size} | Color: {product.color}{" "}
            </p>
          </div>
          <div className="flex items-center mt-2 mr-4">
            <button
              className="border rounded px-2  text-xl font-medium text-gray-500"
              type="button"
            >
              -
            </button>
            <span className="mx-1">{product.quantity}</span>
            <button
              className="border rounded px-2  text-xl font-medium text-gray-500"
              type="button"
            >
              +
            </button>
          </div>
          <div className="flex flex-col items-center">
            <p>${product.price}</p>
            <button>
              <RiDeleteBin3Line className="h-6 w-6 mt-2 text-red-400" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
