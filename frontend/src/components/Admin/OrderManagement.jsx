import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrders } from "../../redux/slices/adminOrderSlice";
import { updateOrderStatus } from "../../redux/slices/adminOrderSlice";

export const OrderManagement = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.adminOrder);
  console.log(orders);

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  const handleStatusChange = (id, status) => {
    console.log(`orderId: ${id}, newStatus: ${status}`);
    dispatch(updateOrderStatus({ id, status }));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error:${error}</p>;

  return (
    <div>
      <div className="max-w-7xl p-6 mx-auto">
        <h2 className="font-semibold text-2xl mb-6">Order Management</h2>
        <div className="overflow-x-auto shadow-md rounded">
          <table className="min-w-full text-left">
            <thead className="rounded bg-gray-100 textxs uppercase text-gray-700">
              <tr>
                <th className="py-3 px-4">order ID</th>
                <th className="py-3 px-3">Customer</th>
                <th className="py-3 px-4">Total Price</th>
                <th className="py-3 px-10 ">Status</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders?.length > 0 ? (
                orders.map((order) => (
                  <tr
                    key={order._id}
                    className="border-b border-gray-300  hover:bg-gray-50 "
                  >
                    <td className="p-4 font-medium whitespace-nowrap">
                      #{order._id}
                    </td>
                    <td className="p-4  font-medium text-gray-500">
                      {order.user.name}
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
