import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { createCheckout } from "../../redux/slices/checkoutSlice";
// Icopn - payment method
import zarinPalLogo from "../../assets/payment/zarinPalLogo.svg";

// Checkout Component
export const Checkout = () => {
  const navigate = useNavigate();

  // Redux
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const { user, loading, error } = useSelector((state) => state.auth);
  console.log(cart);

  // storing user informations in state
  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "Iran",
    phoneNumber: "",
  });

  // Ensure cart is not empty
  useEffect(() => {
    if (!cart || !cart.products || cart.products.length === 0) {
      navigate("/");
    }
  }, [navigate, cart]);

  // handleCreateCheckout Func
  const handleCreateCheckout = (e) => {
    // Stop page reload
    e.preventDefault();

    if (cart && cart.products.length > 0) {
      const cartData = {
        products: cart.products,
        totalPrice: cart.totalPrice,
      };

      const res = dispatch(
        createCheckout({
          cartData,
          shippingAddress,
        }),
      ).then(() => {
        console.log(res);
      });
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center">Error: {error}</p>;
  if (!cart || !cart.products || cart.products.length === 0) {
    return <p className="text-center">Your cart is empty...</p>;
  }

  // JSX
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking-tighter">
      {/* Left Section - info form */}
      <div className="bg-gray-100 rounded-lg p-6">
        <h2 className="text-2xl uppercase mb-6">Checkout</h2>
        <form onSubmit={handleCreateCheckout}>
          <h3 className="text-lg mb-4">Contacet Dateils</h3>
          <div className="mb-4">
            <label for="checkoutEmail" className="bloack text-gray-700">
              Email
            </label>
            <input
              id="checkoutEmail"
              type="email"
              value={user ? user.email : ""}
              className="w-full p-2 border bg-gray-200 border-gray-300 rounded"
              disabled
            />
          </div>
          <h3 className="text-lg mb-4">Delivery</h3>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label for="checkoutFirstName" className="block text-gray-700">
                First Name
              </label>
              <input
                id="checkoutFirstName"
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
                value={shippingAddress.firstName}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    firstName: e.target.value,
                  })
                }
                required
              />
            </div>
            <div>
              <label for="checkoutLastName" className="block text-gray-700">
                Last Name
              </label>
              <input
                id="checkoutLastName"
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
                value={shippingAddress.lastName}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    lastName: e.target.value,
                  })
                }
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label for="checkoutAddress" className="block text-gray-700">
              Address
            </label>
            <input
              id="checkoutAddress"
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              value={shippingAddress.address}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  address: e.target.value,
                })
              }
              required
            />
          </div>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label for="checkoutCity" className="block text-gray-700">
                City
              </label>
              <input
                id="checkoutCity"
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
                value={shippingAddress.city}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    city: e.target.value,
                  })
                }
                required
              />
            </div>
            <div>
              <label for="checkoutPostalCode" className="block text-gray-700">
                Postal Code
              </label>
              <input
                id="checkoutPostalCode"
                type="tel"
                minLength="4"
                maxLength="7"
                className="w-full p-2 border border-gray-300 rounded"
                value={shippingAddress.postalCode}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    postalCode: e.target.value,
                  })
                }
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label for="checkoutCountry" className="block text-gray-700">
              Country
            </label>
            <input
              id="checkoutCountry"
              type="text"
              className="w-full bg-gray-200 p-2 border border-gray-300 rounded"
              value={"Iran"}
              disabled
            />
          </div>
          <div className="mb-4">
            <label for="checkoutPhone" className="block text-gray-700">
              Phone
            </label>
            <input
              id="checkoutPhone"
              type="tel"
              minLength="11"
              maxLength="11"
              className="w-full p-2 border border-gray-300 rounded"
              value={shippingAddress.phoneNumber}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  phoneNumber: e.target.value,
                })
              }
              required
            />
          </div>
          {/* Payment Btns */}
          <div className="mt-6 w-full h-full rounded-lg">
            <div className="flex flex-col gap-y-5">
              <button
                type="submit"
                className="py-4 bg-gray-900 hover:bg-gray-800 hover:cursor-pointer text-white font-medium w-full rounded"
              >
                <img src={zarinPalLogo} alt="" className="mx-auto" />
              </button>
              <button
                type="submit"
                className=" py-4 bg-blue-500 text-white font-medium w-full rounded"
                disabled
              >
                PayPal
              </button>
            </div>
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
              <p className="text-xl">${product.price * product.quantity}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center text-lg mb-4">
          <p>Subtotal:</p>
          <p>${cart.totalPrice?.toLocaleString()}</p>
        </div>

        {cart.originalTotalPrice && cart.originalTotalPrice > 0 && (
          <div className="flex justify-between items-center text-lg mb-4">
            <p>Discount:</p>
            <p>${cart.originalTotalPrice - cart.totalPrice}</p>
          </div>
        )}

        <div className="flex justify-between items-center text-lg mb-2">
          <p>Shipping:</p>
          <p>Free</p>
        </div>

        {cart.originalTotalPrice && cart.originalTotalPrice > 0 ? (
          <div>
            <div className="flex line-through justify-end text-lg border-t border-gray-300 pt-4">
              <p className="">${cart.originalTotalPrice?.toLocaleString()}</p>
            </div>
            <div className="flex justify-between items-center text-lg  border-gray-300">
              <p>Total:</p>
              <p className="font-semibold">
                ${cart.totalPrice?.toLocaleString()}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex justify-between items-center text-lg border-t   border-gray-300 pt-4">
            <p>Total:</p>
            <p className="font-semibold">
              ${cart.totalPrice?.toLocaleString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
