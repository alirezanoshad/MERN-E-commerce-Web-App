import { Link } from "react-router-dom";

export const ProductManagement = () => {
  // Test products to display
  const products = [
    {
      _id: 123,
      name: "jacket polo",
      price: "120",
      sku: "Ydc44W2nW",
    },
  ];

  const handleDeleteProduct = (productId, productName) => {
    if (
      window.confirm(
        `Are you sure you want to delete: ${productName} #${productId}`,
      )
    ) {
      console.log(`item will be deleted: ${productName} #${productId}`);
    }
  };
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl mb-6 font-bold">Product Management</h2>
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full text-left text-gray-500">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
              <th className="py-3 px-4">name</th>
              <th className="py-3 px-4">price</th>
              <th className="py-3 px-4">sku</th>
              <th className="py-3 px-4">actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr
                  key={product}
                  className="border-b border-gray-300 hover:border-t-gray-50 cursor-pointer"
                >
                  <td className="p-4 font-medium text-gray-900 whitespace-nowrap">
                    {product.name}
                  </td>
                  <td className="p-4">${product.price}</td>
                  <td className="p-4">{product.sku}</td>
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
