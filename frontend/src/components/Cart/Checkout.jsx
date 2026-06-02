import { useState } from "react";
import { useNavigate } from "react-router-dom";
// Redux
import { useDispatch, useSelector } from "react-redux";

export const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cart } = useSelector((state) => state.cart);
  const { user, loading, error } = useSelector((state) => state.auth);
  console.log(cart);
  console.log(user);

  // storing sure about checkout id
  const [checkoutId, setCheckoutId] = useState();

  // storing user informations in state
  const [shippingAdress, setShippingAdress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
  });

  const handleCreateCheckout = (e) => {
    // to cancel the default event(Page Reload)
    e.preventDefault();
    // change checkout id to fake data to test.
    setCheckoutId(123);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking-tighter">
      {/* Left Section - info form */}
      <div className="bg-gray-100 rounded-lg p-6">
        <h2 className="text-2xl uppercase mb-6">Checkout</h2>
        <form onSubmit={handleCreateCheckout}>
          <h3 className="text-lg mb-4">Contacet Dateils</h3>
          <div className="mb-4">
            <label htmlFor="" className="bloack text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={user?.email ? user.email : ""}
              className="w-full p-2 border bg-gray-200 border-gray-300 rounded"
              disabled
            />
          </div>
          <h3 className="text-lg mb-4">Delivery</h3>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="" className="block text-gray-700">
                First Name
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
                value={shippingAdress.firstName}
                onChange={(e) =>
                  setShippingAdress({
                    ...shippingAdress,
                    firstName: e.target.value,
                  })
                }
                required
              />
            </div>
            <div>
              <label htmlFor="" className="block text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
                value={shippingAdress.lastName}
                onChange={(e) =>
                  setShippingAdress({
                    ...shippingAdress,
                    lastName: e.target.value,
                  })
                }
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="" className="block text-gray-700">
              Address
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              value={shippingAdress.address}
              onChange={(e) =>
                setShippingAdress({
                  ...shippingAdress,
                  address: e.target.value,
                })
              }
              required
            />
          </div>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="" className="block text-gray-700">
                City
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
                value={shippingAdress.city}
                onChange={(e) =>
                  setShippingAdress({
                    ...shippingAdress,
                    city: e.target.value,
                  })
                }
                required
              />
            </div>
            <div>
              <label htmlFor="" className="block text-gray-700">
                Postal Code
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
                value={shippingAdress.postalCode}
                onChange={(e) =>
                  setShippingAdress({
                    ...shippingAdress,
                    postalCode: e.target.value,
                  })
                }
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="" className="block text-gray-700">
              Country
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              value={shippingAdress.country}
              onChange={(e) =>
                setShippingAdress({
                  ...shippingAdress,
                  country: e.target.value,
                })
              }
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="" className="block text-gray-700">
              Phone
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              value={shippingAdress.phone}
              onChange={(e) =>
                setShippingAdress({
                  ...shippingAdress,
                  phone: e.target.value,
                })
              }
              required
            />
          </div>
          <div className="mt-6 w-full h-full rounded-lg">
            {/* Based on checkout id, show user ways to pay - {!checkoutId ? () : () } */}

            {!checkoutId ? (
              <button
                type="submit"
                className=" py-3 bg-black hover:bg-gray-800 hover:cursor-pointer text-white font-medium w-full rounded"
              >
                Continue to payment
              </button>
            ) : (
              <div className="flex flex-col gap-y-5">
                <button
                  type="submit"
                  className=" py-3 bg-blue-700 hover:bg-blue-500 hover:cursor-pointer text-white font-medium w-full rounded"
                >
                  PayPal
                </button>
                <button
                  type="submit"
                  className=" py-3 bg-gray-900 hover:bg-gray-800 hover:cursor-pointer text-white font-medium w-full rounded"
                >
                  Other Payment ways
                </button>
              </div>
            )}
          </div>
        </form>
      </div>

      {/* Right Section */}
      <div className="bg-gray-100 rounded-lg p-6">
        <h3 className="text-lg mb-4">Order Summary</h3>
        <div className="border-t py-4 mb-4  border-gray-300">
          {cart.products.map((product, index) => (
            <div
              key={index}
              className="flex items-start justify-between py-2 border-b border-gray-300"
            >
              <div className="flex">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h-24 object-cover mr-4 rounded"
                />
                <div>
                  <h3 className="font-medium">{product.name}</h3>
                  <p className="text-gray-500">Size: {product.size}</p>
                  <p className="text-gray-500">Color: {product.color}</p>
                  <p className="text-gray-500">Quantity: {product.quantity}</p>
                </div>
              </div>
              <p className="text-xl">${product.price?.toLocaleString()}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center text-lg mb-4">
          <p>Subtotal:</p>
          <p>${cart.totalPrice?.toLocaleString()}</p>
        </div>
        <div className="flex justify-between items-center text-lg mb-2">
          <p>Shipping:</p>
          <p>Free</p>
        </div>
        <div className="flex justify-between items-center text-lg border-t border-gray-300 pt-4">
          <p>Total:</p>
          <p>${cart.totalPrice?.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};
