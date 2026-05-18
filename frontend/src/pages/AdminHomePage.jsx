import { Link } from "react-router-dom";

export const AdminHomePage = () => {
  const orders = [
    {
      _id: 12312,
      user: {
        name: "Johm Doe",
      },
      totalPrice: 110,
      status: "Proccessing",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-4 shadow-md rounded-lg">
          <h2 className="text-xl font-semibold">Revenue</h2>
          <p className="text-2xl">$1000</p>
        </div>
        <div className=" p-4 shadow-md rounded-lg">
          <h2 className="text-xl font-semibold">Total Orders:</h2>
          <p className="text-2xl">$1000</p>
          <Link to="/admin/orders" className="text-blue-500 hover:underline">
            Manage Orders
          </Link>
        </div>
        <div className="p-4 shadow-md rounded-lg">
          <h2 className="text-xl font-semibold">Total Products</h2>
          <p className="text-2xl">$319.14</p>
          <Link to="/admin/products" className="text-blue-500 hover:underline">
            Manage Produtcs
          </Link>
        </div>
      </div>
      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-4">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-gray-500">
            <thead className="bg-gray-300 text-xs uppercase text-gray-700">
              <tr>
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">TOtal Price</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr
                    key={order._id}
                    className="border-b border-gray-300 hover:bg-gray-50 cursor-pointer"
                  >
                    <td className="p-4">{order._id}</td>
                    <td className="p-4">{order.user.name}</td>
                    <td className="p-4">${order.totalPrice}</td>
                    <td className="p-4">{order.status}</td>
                  </tr>
                ))
              ) : (
                <tr className="border-b border-gray-300">
                  <td colSpan={4} className="p-4 text-center">
                    No recent orders found
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
