import { useState } from "react";

export const OrderManagement = () => {
  const [orders, setOrders] = useState([
    {
      _id: 1234,
      user: { name: "jogn dige" },
      totalPrice: "169.43",
      status: "delivered",
    },
    {
      _id: "dgfewrihip41564",
      customer: "Admin User",
      totalPrice: "240",
      status: "proccessing",
    },
    {
      _id: "dgfewrihip41564",
      customer: "Admin User",
      totalPrice: "240",
      status: "",
    },
  ]);

  const handleStatusChange = (orderId, newStaus) => {
    console.log(`orderId: ${orderId}, newStatus: ${newStaus}`);
    // setOrders((prev) => ({...prev, prev[orderId]: newStaus}));
  };

  return (
    <div>
      <div className="max-w-7xl p-6 mx-auto">
        <h2 className="font-semibold text-2xl mb-6">Order Management</h2>
        <div className="overflow-x-auto shadow-md rounded">
          <table className="min-w-full text-left">
            <thead className="rounded bg-gray-100 textxs uppercase text-gray-700">
              <tr>
                <th className="py-3 px-4">order ID</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Total Price</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr
                    key={order}
                    className="border-b border-gray-300  hover:bg-gray-50 "
                  >
                    <td className="p-4 font-medium whitespace-nowrap">
                      #{order._id}
                    </td>
                    <td className="p-4  font-medium text-gray-500">
                      {order.customer}
                    </td>
                    <td className="p-4 font-medium text-gray-500">
                      ${order.totalPrice}
                    </td>
                    <td className="p-4 font-medium text-gray-500">
                      <select
                        value={order.status || "proccessing"}
                        onChange={(e) =>
                          handleStatusChange(order._id, e.target.value)
                        }
                        className="block p-2.5 cursor-pointer  bg-gray-100 rounded border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="proccessing">Proccessing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() =>
                          handleStatusChange(order._id, "delivered")
                        }
                        className="cursor-pointer rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
                      >
                        Mark as Delivered
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="text-left border-b border-gray-300">
                  <td className="p-4 text-center text-gray-500" colSpan={5}>
                    Orders Not Found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
