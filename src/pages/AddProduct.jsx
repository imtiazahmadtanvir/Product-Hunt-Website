import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TagsInput } from "react-tag-input-component";
import toast from "react-hot-toast";
import { AuthContext } from "../provider/AuthProvider";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AddProduct = () => {
    const { user } = useContext(AuthContext); // Get user from AuthContext
    const navigate = useNavigate();

  const [productName, setProductName] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [externalLink, setExternalLink] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!productName || !productImage || !description) {
      toast.error("Please fill all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("productImage", productImage);
    formData.append("description", description);
    formData.append("tags", JSON.stringify(tags));
    formData.append("externalLink", externalLink);
    formData.append("ownerName", user.displayName);
    formData.append("ownerImage", user.image);
    formData.append("ownerEmail", user.email);
    formData.append("timestamp", new Date().toISOString());

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        toast.success("Product added successfully!");
        navigate("/my-products");
      } else {
        toast.error("Failed to add product. Please try again.");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
<div>
    <nav>
        <Navbar></Navbar>
    </nav>
    <main>
    <div className="w-11/12 lg:w-8/12 mx-auto my-8">
      <h1 className="text-2xl font-bold text-center mb-6">Add Product</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="productName" className="block text-sm font-medium text-gray-700">
            Product Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="productName"
            className="mt-1 pl-4 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="productImage" className="block text-sm font-medium text-gray-700">
            Product Image <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            id="productImage"
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-yellow-500 file:text-gray-100 hover:file:bg-yellow-600"
            onChange={(e) => setProductImage(e.target.files[0])}
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            className="mt-1 block pl-3 w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>

        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
            Tags
          </label>
          <TagsInput
            value={tags}
            onChange={setTags}
            name="tags"
            placeHolder="Enter tags"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
          />
        </div>

        <div>
          <label htmlFor="externalLink" className="block text-sm font-medium text-gray-700">
            External Link
          </label>
          <input
            type="url"
            id="externalLink"
            className="mt-1 pl-4 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
            value={externalLink}
            onChange={(e) => setExternalLink(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Owner Name</label>
            <input
              type="text"
              value={user.displayName}
              disabled
              className="mt-1 pl-4 block w-full rounded-md border-gray-300 bg-gray-100 shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Owner Email</label>
            <input
              type="email"
              value={user.email}
              disabled
              className="mt-1 pl-4 block w-full rounded-md border-gray-300 bg-gray-100 shadow-sm"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-yellow-500 text-white font-bold rounded-md hover:bg-yellow-600"
        >
          Submit
        </button>
      </form>
    </div>
    </main>
    <footer>
        <Footer></Footer>
    </footer>
</div>
  );
};

export default AddProduct;
