import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createProduct } from "../../redux/slices/adminProductsSlice";
import axios from "axios";

//Icons
import { TbXboxXFilled } from "react-icons/tb";

// CreateProductPage Component
export const CreateProductPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Image uploading state
  const [uploading, setUploading] = useState(false);
  const [imgUploadBtnDisable, setImgUploadBtnDisable] = useState(false);
  //  AltText Entry state
  const [altTextEntry, setAltTextEntry] = useState("");

  // To Hold Product Information
  const [productInfo, setProductInfo] = useState({
    name: "",
    brand: "",
    description: "",
    price: 0,
    discountPrice: 0,
    countInStock: 0,
    sku: "",
    material: "",
    collections: "",
    category: "Top Wear",
    gender: "Men",
    sizes: [],
    colors: [],
    tags: [],
    images: [],
    isPublished: false,
    isFeatured: false,
  });

  // Handling form change.
  const handleFormChange = (e) => {
    console.log(`${e.target.name}:${e.target.value}`);
    // Updating state
    setProductInfo((prevState) => ({
      ...prevState,
      [e.target.name]:
        // Array
        e.target.name === "sizes" ||
        e.target.name === "colors" ||
        e.target.name === "tags"
          ? e.target.value.split(",").map((item) => item.trim())
          : // Boolean
            e.target.name === "isPublished" || e.target.name === "isFeatured"
            ? !prevState[e.target.name]
            : // Other inputs
              e.target.value,
    }));
    console.log(productInfo);
  };

  const handleImgDelete = (imgURL, imgAltText) => {
    console.log(imgURL, imgAltText);
    setProductInfo((prev) => ({
      ...prev,
      images: prev.images.filter(
        (img) => !(img.url === imgURL && img.altText === imgAltText),
      ),
    }));
  };

  const handleAltTextEntry = (e) => {
    setAltTextEntry(e.target.value);
  };

  const handleImgUpload = async (e) => {
    if (handleAltTextEntry === "") return;
    const file = e.target.files[0];
    console.log(file);
    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploading(true);
      setImgUploadBtnDisable(true);
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
      console.log(productInfo);
      setUploading(false);
      setImgUploadBtnDisable(false);

      setAltTextEntry("");
    } catch (error) {
      console.log(error);
      setUploading(false);
      setImgUploadBtnDisable(false);
    }
  };

  // Hnadle Form Submit
  const hanldeProductSubmit = (e) => {
    e.preventDefault();
    console.log({ productData: productInfo });
    dispatch(createProduct({ productData: productInfo })).then(() => {
      navigate("/admin/products");
    });
  };

  // JSX
  return (
    <div className="max-w-5xl mx-auto p-6 border border-gray-300 rounded shadow-md">
      <div className="flex flex-row justify-between ">
        <div>
          <h2 className="text-3xl font-bold mb-6">Edit Product</h2>
        </div>
        <div className="flex flex-row gap-x-2">
          <div className="flex flex-col gap-y-2">
            <button
              type="button"
              name="isPublished"
              value={productInfo?.isPublished}
              onClick={handleFormChange}
              className={`rounded-xl text-center py-1 px-3 text-sm font-semibold text-white cursor-pointer ${productInfo.isPublished ? "bg-green-800" : "bg-red-800"}`}
            >
              Published
            </button>
            <button
              type="button"
              name="isFeatured"
              value={productInfo?.isFeatured}
              onClick={handleFormChange}
              className={`rounded-xl text-center py-1 px-3 text-sm font-semibold text-white cursor-pointer ${productInfo.isFeatured ? "bg-green-800" : "bg-red-800"}`}
            >
              Featured
            </button>
          </div>
          <div className="flex flex-col gap-y-2">
            <span className="rounded-xl bg-gray-200 text-center text-gray-800  py-1 px-3 text-sm font-semibold">
              Rating {productInfo?.rating ? `${productInfo.rating}` : "0.0"}
            </span>
            <span className="rounded-xl bg-gray-200 text-center text-gray-800  py-1 px-3  text-sm font-semibold">
              Reviews
              {productInfo?.numReviews ? `${productInfo.numReviews}` : " 0"}
            </span>
          </div>
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
          <div className="flex flex-row justify-between gap-1">
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
          </div>

          <div className="flex flex-row justify-between gap-1">
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
              <option value="Unisex">Unisex</option>
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
          {/* Tags */}
          <div className="mb-6">
            <label className="block font-semibold mb-2">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              name="tags"
              value={productInfo?.tags?.join(",")}
              onChange={handleFormChange}
              className="w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          {/* Image Upload */}
          <div className="block mb-6">
            <div className="flex flex-row mb-2">
              <div className="flex w-full border rounded-md border-gray-300 overflow-hidden">
                <input
                  placeholder="Enter Image AltText"
                  value={altTextEntry}
                  type="text"
                  name="imgAltText"
                  className="flex-1 min-w-0 h-11 focus:outline-none px-3"
                  onChange={handleAltTextEntry}
                  />
                <label
                  for="imgUploadID"
                  className={`flex items-center justify-center whitespace-nowrap h-11 px-4 border-2 border-blue-500  text-white rounded-r text-center font-semibold ${imgUploadBtnDisable ? "bg-blue-900 cursor-wait border-blue-900" : "bg-blue-500 cursor-pointer hover:bg-blue-600 hover:border-blue-600 "}`}
                  >
                  {uploading ? (
                      <div
                      className="flex justify-center items-center pl-3"
                      role="status"
                      >
                      <svg
                        aria-hidden="true"
                        class="w-6 h-6 text-neutral-tertiary animate-spin fill-brand"
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
                          fill="white"
                          />
                      </svg>
                      <span class="sr-only">Loading...</span>
                    </div>
                  ) : (
                      "Upload Image"
                    )}
                </label>
                <input
                  type="file"
                  name="image"
                  onChange={handleImgUpload}
                  className="w-full border p-2"
                  id="imgUploadID"
                  disabled={imgUploadBtnDisable}
                  hidden
                />
              </div>
            </div>
            {/* Display Uploaded Images */}
            <div className="flex flex-wrap gap-4 mt-6">
              {productInfo &&
                productInfo.images?.length > 0 &&
                productInfo.images.map((img, index) => (
                  <div
                    key={index}
                    className="flex relative flex-col items-center bg-gray-100 rounded p-1"
                  >
                    <button
                      type="button"
                      onClick={() => handleImgDelete(img.url, img.altText)}
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
