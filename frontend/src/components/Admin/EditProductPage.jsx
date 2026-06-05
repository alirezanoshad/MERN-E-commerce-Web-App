import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetails } from "../../redux/slices/productsSlice";
import { updateProduct } from "../../redux/slices/adminProductsSlice";
import axios from "axios";

//Exit icon
import { TbXboxXFilled } from "react-icons/tb";

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
  //  AltText Entry state
  const [altTextEntry, setAltTextEntry] = useState("");

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
    console.log(productInfo);
  };

  const handleImgDelete = (imgID) => {
    console.log(imgID);
    setProductInfo((prev) => ({
      ...prev,
      images: prev.images.filter((img) => img._id !== imgID),
    }));
  };

  const handleAltTextEntry = (e) => {
    setAltTextEntry(e.target.value);
  };

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
            "Content-Type": "multipart/form-data",
          },
        },
      );

      console.log(data);
      setProductInfo((prevData) => ({
        ...prevData,
        images: [...prevData.images, { url: data, altText: altTextEntry }],
      }));
      setUploading(false);
      setAltTextEntry("");
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
      <div className="flex flex-row justify-between ">
        <div>
          <h2 className="text-3xl font-bold mb-6">Edit Product</h2>
        </div>
        <div className="flex flex-col gap-y-2">
          <span className="rounded-xl bg-gray-200 text-center text-gray-800  py-1 px-3 text-sm font-semibold">
            Rating {productInfo?.rating ? `${productInfo.rating}` : "0.0"}
          </span>
          <span className="rounded-xl bg-gray-200 text-center text-gray-800  py-1 px-3  text-sm font-semibold">
            Reviews{" "}
            {productInfo?.numReviews ? `${productInfo.numReviews}` : "00"}
          </span>
        </div>
      </div>
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

          {/* Brand */}
          <div className="mb-6">
            <label className="block font-semibold mb-2">Brand</label>
            <input
              type="text"
              name="brand"
              value={productInfo?.brand}
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
          {/* discountPrice */}
          <div className="mb-6">
            <label className="block font-semibold mb-2">Discount Price</label>
            <input
              type="number"
              name="discountPrice"
              value={productInfo?.discountPrice}
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
          {/* Material */}
          <div className="mb-6">
            <label className="block font-semibold mb-2">Material</label>
            <input
              type="text"
              name="material"
              value={productInfo?.material}
              onChange={handleFormChange}
              className="w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          {/* Collection */}
          <div className="mb-6">
            <label className="block font-semibold mb-2">Collection</label>
            <input
              type="text"
              name="collections"
              value={productInfo?.collections}
              onChange={handleFormChange}
              className="w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          {/* Category */}
          <div className="mb-6">
            <label className="block font-semibold mb-2">Category</label>
            <select
              name="category"
              value={productInfo?.category}
              onChange={handleFormChange}
              className="w-full border border-gray-300 rounded-md p-2"
              required
            >
              <option value="Top Wear">Top Wear</option>
              <option value="Bottom Wear">Bottom Wear</option>
            </select>
          </div>

          {/* Gender */}
          <div className="mb-6">
            <label className="block font-semibold mb-2">Gender</label>
            <select
              name="gender"
              value={productInfo?.gender}
              onChange={handleFormChange}
              className="w-full border border-gray-300 rounded-md p-2"
              required
            >
              <option value="Men">Men</option>
              <option value="Women">Women</option>
            </select>
          </div>

          {/* Sizes */}
          <div className="mb-6">
            <label className="block font-semibold mb-2">
              Sizes (comma-separated)
            </label>
            <input
              type="text"
              name="sizes"
              value={productInfo?.sizes?.join(",")}
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
              value={productInfo?.colors?.join(",")}
              onChange={handleFormChange}
              className="w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          {/* Image Upload */}
          <div className="block mb-6">
            <div className="flex flex-row mb-2">
              <input
                placeholder="Enter Image AltText"
                value={altTextEntry}
                type="text"
                name="imgAltText"
                className=" rounded-l-md border focus:outline-none border-gray-300 p-2"
                onChange={handleAltTextEntry}
              />
              <label
                for="imgUploadID"
                className="bg-blue-500 px-2 py-2 text-white rounded-r hover:bg-blue-600 cursor-pointer  font-semibold "
              >
                Upload Image
              </label>
              <input
                type="file"
                name="image"
                onChange={handleImgUpload}
                className="w-full border p-2"
                id="imgUploadID"
                hidden
              />

              {uploading && (
                <div className="pl-3" role="status">
                  <svg
                    aria-hidden="true"
                    class="w-8 h-8 text-neutral-tertiary animate-spin fill-brand"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="white"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="blue"
                    />
                  </svg>
                  <span class="sr-only">Loading...</span>
                </div>
              )}
            </div>
            {/* Display Uploaded Images */}
            <div className="flex gap-4 mt-6">
              {productInfo &&
                productInfo.images?.length > 0 &&
                productInfo.images.map((img, index) => (
                  <div
                    key={index}
                    className="flex relative flex-col items-center bg-gray-100 rounded p-1"
                  >
                    <button
                      type="button"
                      onClick={() => handleImgDelete(img._id)}
                      className="bg-red-100 hover:cursor-pointer rounded absolute top-0 right-0 p-2"
                    >
                      <TbXboxXFilled className="h-6 w-6  text-red-400" />
                    </button>
                    <img
                      src={img.url}
                      alt={img.altText || "Product Image"}
                      className="h-20 w-20 object-cover rounded shadow-md"
                    ></img>
                    <span className="text-center">
                      {img.altText || "AltText not found"}
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
