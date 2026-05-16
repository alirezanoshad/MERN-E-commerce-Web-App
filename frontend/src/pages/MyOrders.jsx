import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// Images for MyOrders
import orderImg1 from "../assets/topWearsForWomen/wp1.webp";
import orderImg2 from "../assets/topWearsForWomen/wp2.webp";

export const MyOrders = () => {
  // Hold the orders
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  // Simulate fetching orders
  useEffect(() => {
    setTimeout(() => {
      const fakeOrders = [
        {
          _id: 1288,
          createdAt: new Date(),
          shippingAdress: { city: "New York", country: "USA" },
          orderItems: [{ name: "prduct1", image: orderImg1 }],
          totalPrice: 100,
          isPaid: true,
        },
        {
          _id: 15641,
          createdAt: new Date(),
          //   shippingAdress: { city: "Melborne", country: "Australia" },
          orderItems: [{ name: "prduct2", image: orderImg2 }],
          totalPrice: 169,
          isPaid: false,
        },
      ];
      setOrders(fakeOrders);
      return;
    }, 1000);
  }, []);

  // Navigation to Order Page by ID.
  const handleRowClick = (orderId) => {
    navigate(`/order/${orderId}`);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h2 className="text-xl sm:text2xl font-bold mb-6">My Orders</h2>
      <div className="relative shadow-md sm:rounded-lg orverflow-hidden">
        <table className="min-w-full text-left text-gray-500">
          {/* Table's Head */}
          <thead className="bg-gray-100 texdt-xs uppercase text-gray-700">
            <tr>
              <th className="py-2 px-4 sm:py-3">Image</th>
              <th className="py-2 px-4 sm:py-3">Order Id</th>
              <th className="py-2 px-4 sm:py-3">Created</th>
              <th className="py-2 px-4 sm:py-3">Shipping Adress</th>
              <th className="py-2 px-4 sm:py-3">Items</th>
              <th className="py-2 px-4 sm:py-3">Price</th>
              <th className="py-2 px-4 sm:py-3">Status</th>
            </tr>
          </thead>
          {/* Table's Body */}
          <tbody>
            {/* Order Card */}
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr
                  key={order._id}
                  onClick={() => handleRowClick(order._id)}
                  className="border-b border-gray-400 hover:border-gray-50 transition-colors duration-300 cursor-pointer"
                >
                  <td className="py-2 px-4 sm:px-4 sm:py-4">
                    <img
                      src={order.orderItems[0].image}
                      alt={order.orderItems[0].name}
                      className="w-10 h-10 sm:h-12 sm:w-12 object-cover rounded-lg"
                    />
                  </td>
                  <td className="py-2 px-4 sm:px-4 sm:py-4 font-medium text-gray-900 whitespace-nowrap">
                    #{order._id}
                  </td>
                  <td className="py-2 px-4 sm:px-4 sm:py-4">
                    {new Date(order.createdAt).toLocaleDateString()}{" "}
                    {new Date(order.createdAt).toLocaleTimeString()}
                  </td>
                  <td className="py-2 px-4 sm:px-4 sm:py-4">
                    {order.shippingAdress
                      ? `${order.shippingAdress.country}, ${order.shippingAdress.city}`
                      : "N/A"}
                  </td>
                  <td className="py-2 px-4 sm:px-4 sm:py-4">
                    {order.orderItems?.length}
                  </td>
                  <td className="py-2 px-4 sm:px-4 sm:py-4">
                    ${order.totalPrice}
                  </td>
                  <td className="py-2 px-4 sm:px-4 sm:py-4">
                    <span
                      className={`${order.isPaid ? "bg-green-100 text-green-700" : " bg-red-100 text-red-700"} px-2 py-1 rounded-lg text-xs sm:text-sm font-medium`}
                    >
                      {order.isPaid ? "Paid" : "Pending"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-4 px-4 text-center text-gray-500">
                  You have no orders
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
