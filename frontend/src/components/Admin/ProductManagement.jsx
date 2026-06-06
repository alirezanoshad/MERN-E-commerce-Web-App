import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  fetchAdminProducts,
} from "../../redux/slices/adminProductsSlice";

export const ProductManagement = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(
    (state) => state.adminProducts,
  );
  console.log(products);

  useEffect(() => {
    dispatch(fetchAdminProducts());
  }, [dispatch]);

  const handleDeleteProduct = (productId, productName) => {
    if (
      window.confirm(
        `Are you sure you want to delete: ${productName} #${productId}`,
      )
    ) {
      dispatch(deleteProduct({ id: productId }));
    }
  };

  if (loading) return <p className="text-center">loading...</p>;
  if (error) return <p className="text-center">Error: ${error}</p>;

  // JSX
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl  font-bold">Product Management</h2>
        <Link to="create-product">
          <button className="py-1 px-2 mr-2  bg-green-500 rounded text-white cursor-pointer hover:bg-green-600">
            Add New Product
          </button>
        </Link>
      </div>
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full text-left text-gray-500">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
              <th className="py-3 px-4">name</th>
              <th className="py-3 px-4">Images</th>
              <th className="py-3 px-4">price</th>
              <th className="py-3 px-4">sku</th>
              <th className="py-3 px-4">actions</th>
            </tr>
          </thead>
          <tbody>
            {products && products.length > 0 ? (
              products.map((product) => (
                <tr
                  key={product._id}
                  className="border-b border-gray-300 hover:bg-gray-100 cursor-pointer"
                >
                  <td className="p-4 font-medium text-gray-900 whitespace-nowrap">
                    {product?.name || "N/A"}
                  </td>
                  <td className="p-4">{product.images?.length || "N/A"}</td>
                  <td className="p-4">
                    {product.price ? `$${product.price}` : "N/A"}
                  </td>
                  <td className="p-4">{product.sku || "N/A"}</td>
                  <td>
                    <Link
                      className="py-1 px-2 mr-2  bg-yellow-500 rounded text-white cursor-pointer hover:bg-yellow-600"
                      to={`/admin/products/${product._id}/edit`}
                    >
                      Edit
                    </Link>
                    <button
                      className="py-1 px-2 mr-2  bg-red-500 rounded text-white cursor-pointer hover:bg-red-600"
                      onClick={() =>
                        handleDeleteProduct(product._id, product.name)
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500">
                  No Products Found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
