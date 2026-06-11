import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { fetchSingleOrder } from "../redux/slices/orderSlice";

export const OrderDetailsPage = () => {
  // Providing order id that we pass in URL
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedOrder, loading, error } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(fetchSingleOrder(id));
  }, [dispatch, id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: ${error}</p>;

  // JSX
  return (
    <div className="max-w-7xl border border-gray-300 mx-auto p-4 sm:p-6 mt-10 mb-25 rounded">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">Order Derails</h2>
      {!selectedOrder ? (
        <p>No Order Details Found</p>
      ) : (
        <div className="p-4 sm:p6 rounded-lg border border-gray-300 mb-6">
          {/* Order Info */}
          <div className="flex flex-col sm:flex-row justify-between mb-8">
            <div>
              <h3 className="text-lg md:text-xl font-semibold">
                Order ID: #{selectedOrder._id}
              </h3>
              <p className="text-gray-600 pt-1">
                Created At: {selectedOrder.createdAt}
              </p>
              <p className="text-gray-600 pt-1">
                Delivered At:
                {selectedOrder.deliveredAt ? selectedOrder.deliveredAt : "..."}
              </p>
            </div>
            <div className="flex flex-col items-start sm:items-end mt-4 sm:mt-0 gap-y-1">
              <span
                className={`${selectedOrder.paymentStatus === "paid" ? "bg-green-100 text-green-700" : " bg-yellow-100 text-yellow-700"} px-2 py-1 rounded-lg text-xs sm:text-sm font-medium`}
              >
                {selectedOrder.paymentStatus}
              </span>
              <span
                className={`${selectedOrder.status === "Delivered" ? "bg-green-100 text-green-700" : selectedOrder.status === "Cancelled" ? "bg-red-100 text-red-700" : " bg-yellow-100 text-yellow-700"} px-2 py-1 rounded-lg text-xs sm:text-sm font-medium`}
              >
                {selectedOrder.status || "Proccessing"}
              </span>
            </div>
          </div>
          {/* Customer, Payment, Shipping Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h4 className="text-lg font-semibold mb-2">Payment Info</h4>
              <p>Payment Method: ZarinPal</p>
              <p>res number: ${selectedOrder.totalPrice}</p>
              <p>res number: {selectedOrder.resNumber}</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">Shipping Info</h4>
              <p>Shipping Method: {selectedOrder.shippingMethod}</p>
              <p>
                Address: {selectedOrder.shippingAddress.city},{" "}
                {selectedOrder.shippingAddress.country}
              </p>
            </div>
          </div>
          {/* Product List */}
          <div className="overflow-x-auto">
            <h4 className="text-lg font-semibold mb-4">Products</h4>
            <table className="min-w-full text-gray-600 mb-4">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-4 text-left">Name</th>
                  <th className="py-2 px-4 text-left">color</th>
                  <th className="py-2 px-4 text-left">size</th>
                  <th className="py-2 pr-4 text-left">Unit Price</th>
                  <th className="py-2 pr-6 text-left">Quantitiy</th>
                  <th className="py-2 px-4 text-left">Total</th>
                </tr>
              </thead>
              <tbody>
                {selectedOrder.orderItems.map((item) => (
                  <tr key={item.productID} className="border-b border-gray-300">
                    <td className="py-2 px-4 flex items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-lg mr-4"
                      />
                      <Link
                        to={`/product/${item.productID}`}
                        className="text-blue-500 hover:underline "
                      >
                        {item.name}
                      </Link>
                    </td>
                    <td className="py-2 px-4">{item.color}</td>
                    <td className="py-2 px-4">{item.size}</td>

                    <td className="py-2 px-4">${item.price}</td>
                    <td className="py-2 pr-4 pl-7">{item.quantity}</td>
                    <td className="py-2 px-4">${item.price * item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Back ro Orders Page Link */}
          <div className="mt-5">
            <Link to="/profile" className="text-blue-500 hover:underline">
              Back to My Orders
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
