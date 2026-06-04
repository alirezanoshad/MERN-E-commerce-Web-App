import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetails } from "../../redux/slices/productsSlice";
import { updateProduct } from "../../redux/slices/adminProductsSlice";
import axios from "axios";

// EditProductPage Component
export const EditProductPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id } = useParams();
  const { selectedProduct, loading, error } = useSelector(
    (state) => state.products,
  );
  console.log(selectedProduct);

  // Image uploading state
  const [uploading, setUploading] = useState(false);
  // To Hold Product Information
  const [productInfo, setProductInfo] = useState({
    name: "",
    description: "",
    price: 0,
    countInStock: 0,
    sku: "",
    sizes: [],
    colors: [],
    images: [],
  });

  useEffect(() => {
    if (id) {
      dispatch(fetchProductDetails(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedProduct) {
      setProductInfo(selectedProduct);
    }
  }, [selectedProduct]);

  // Handling form change.
  const handleFormChange = (e) => {
    console.log(`${e.target.name}:${e.target.value}`);
    // Updating state
    setProductInfo((prevState) => ({
      ...prevState,
      [e.target.name]:
        e.target.name === "sizes" || e.target.name === "colors"
          ? e.target.value.split(",").map((item) => item.trim())
          : e.target.value,
    }));
  };

  // Handlig Image Upload
  const handleImgUpload = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploading(true);
      console.log(formData);
      // Post - server request
      const { data } = await axios.post(
        "http://localhost:5000/api/upload",
        formData,
        {
          headers: {
            "Contetn-Type": "multipart/form-data",
          },
        },
      );

      console.log(data);
      setProductInfo((prevData) => ({
        ...prevData,
        images: [...prevData.images, { url: data.imageUrl, altText: "" }],
      }));
      setUploading(false);
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  };

  // Hnadle Form Submit
  const hanldeProductSubmit = (e) => {
    e.preventDefault();
    console.log({ id, productData: productInfo });
    dispatch(updateProduct({ id, productData: productInfo })).then(() => {
      navigate("/admin/products");
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Errot: ${error}</p>;

  // JSX
  return (
    <div className="max-w-5xl mx-auto p-6 border border-gray-300 rounded shadow-md">
      <h2 className="text-3xl font-bold mb-6">Edit Product</h2>
      <div>
        <form onSubmit={hanldeProductSubmit}>
          {/* Name */}
          <div className="mb-6">
            <label className="block font-semibold mb-2">Product Name</label>
            <input
              type="text"
              name="name"
              value={productInfo?.name}
              onChange={handleFormChange}
              className="w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          {/* Description - textarea instead of input */}
          <div className="mb-6">
            <label className="block font-semibold mb-2">Description</label>
            <textarea
              name="description"
              value={productInfo?.description}
              onChange={handleFormChange}
              className="w-full border border-gray-300 rounded-md p-2"
              required
              rows={4}
            />
          </div>

          {/* Price */}
          <div className="mb-6">
            <label className="block font-semibold mb-2">Price</label>
            <input
              type="number"
              name="price"
              value={productInfo?.price}
              onChange={handleFormChange}
              className="w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          {/* countInStock */}
          <div className="mb-6">
            <label className="block font-semibold mb-2">Quantity</label>
            <input
              type="number"
              name="countInStock"
              value={productInfo?.countInStock}
              onChange={handleFormChange}
              className="w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          {/* SKU */}
          <div className="mb-6">
            <label className="block font-semibold mb-2">SKU</label>
            <input
              type="text"
              name="sku"
              value={productInfo?.sku}
              onChange={handleFormChange}
              className="w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          {/* Sizes */}
          <div className="mb-6">
            <label className="block font-semibold mb-2">
              Sizes (comma-separated)
            </label>
            <input
              type="text"
              name="sizes"
              value={productInfo?.sizes.join(",")}
              onChange={handleFormChange}
              className="w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          {/* Colors */}
          <div className="mb-6">
            <label className="block font-semibold mb-2">
              Colors (comma-separated)
            </label>
            <input
              type="text"
              name="colors"
              value={productInfo?.colors.join(",")}
              onChange={handleFormChange}
              className="w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          {/* Image Upload */}
          <div className="block mb-6">
            <label
              for="meow"
              className="bg-blue-500 p-2 text-white rounded hover:bg-blue-600 cursor-pointer  font-semibold mb-2"
            >
              Upload Image{" "}
            </label>
            <input
              type="file"
              name="image"
              onChange={handleImgUpload}
              className="w-full rounded-md border p-2"
              id="meow"
              hidden
            />
            {/* Display Uploaded Images */}
            <div className="flex gap-4 mt-4">
              {productInfo &&
                productInfo.images?.length > 0 &&
                productInfo.images.map((img, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center bg-gray-100 rounded p-1"
                  >
                    <img
                      src={img.url}
                      alt={img.alt || "Product Image"}
                      className="h-20 w-20 object-cover rounded shadow-md"
                    ></img>
                    <span className="text-center">
                      {img.alt || "Product Image"}
                    </span>
                  </div>
                ))}
            </div>
          </div>

          {/* Update Button */}
          <button
            type="submit"
            className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition-colors cursor-pointer font-bold"
          >
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
};
