// Fake data test
const checkout = {
  // Order id
  id: "123456",
  // time
  createdAt: new Date(),
  // items bought(list)
  checkoutItems: [
    {
      productId: "1",
      name: "T-Shirt",
      color: "black",
      size: "M",
      price: 120,
      quantitiy: 1,
      image: "https://picsum.photos/150/150?/random=1",
    },
    {
      productId: "2",
      name: "Jacket",
      color: "blue",
      size: "XS",
      price: 150,
      quantitiy: 2,
      image: "https://picsum.photos/150/150?/random=2",
    },
  ],
  // user shopping info.
  shippingAdress: {
    address: "123 fashion street",
    country: "USA",
    city: "New York",
  },
};

// OrderConfirmationPage Component
export const OrderConfirmationPage = () => {
  // Estimated Delivery func
  const calculatedEstimatedDelivery = (createdAt) => {
    const orderDate = new Date(createdAt);
    orderDate.setDate(orderDate.getDate() + 10); // Add 10 days to the order date
    return orderDate.toLocaleDateString();
  };


  


  // JSX
  return (
    <div className="p-6 max-w-4xl mx-auto bg-white">
      <h1 className="text-4xl font-bold text-center text-emerald-700 mb-8">
        Thank you for your order!
      </h1>
      {/* Order id and Date */}
      {checkout && (
        <div className="p-6 rounded-lg border border-gray-300 ">
          <div className="flex justify-between mb-20 pb-3 border-b border-gray-300 rounded">
            <div>
              <h2 className="text-xl font-semibold">Order ID: {checkout.id}</h2>
              <p className="text-gray-500">
                Order Date: {new Date(checkout.createdAt).toLocaleDateString()}
              </p>
            </div>
            {/* Estimated Delivery - the predicted date or time for package to arrive */}
            <div>
              <p className="text-emerald-700 text-sm">
                Estimated Delivery:{" "}
                {calculatedEstimatedDelivery(checkout.createdAt)}
              </p>
            </div>
          </div>
          {/* Ordered Items */}
          <div className="mb-20">
            {checkout.checkoutItems.map((item) => (
              <div className="flex items-center mb-4 border-b border-gray-100 ">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-md mr-4"
                />
                <div>
                  <h4 className="font-semibold text-md">{item.name}</h4>
                  <p className="text-sm text-gray-500">
                    {item.color} | {item.size}
                  </p>
                </div>
                <div className="ml-auto text-right">
                  <p className="text-md font-medium text-end">${item.price}</p>
                  <p className="text-gray-500 text-sm">Qty: {item.quantitiy}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Payment and Delivery Info */}
          <div className="grid grid-cols-2 gap-8 border-t border-gray-300 pt-3">
            {/* Payment Info */}
            <div>
              <h4 className="text-lg font-semibold mb-2">Payment</h4>
              <p className="text-gray-600">Paypal</p>
            </div>
            {/* Delivery Info */}
            <div className="text-lg">
              <h4 className="text-lg font-semibold mb-2">Delivery</h4>
              <p className="text-gray-600">{checkout.shippingAdress.address}</p>
              <p className="text-gray-600">{checkout.shippingAdress.country}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
