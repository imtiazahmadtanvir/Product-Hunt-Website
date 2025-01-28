import { useState, useContext, useEffect } from "react";
import { TagsInput } from "react-tag-input-component";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { AuthContext } from "../provider/AuthProvider";

const AddProduct = () => {
  const { user } = useContext(AuthContext);
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    productName: "",
    productImage: "",
    description: "",
    tags: [],
    externalLink: "",
    ownerName: user?.displayName || "Unknown User",
    ownerEmail: user?.email || "Unknown Email",
    timestamp: "",
    status: "Pending",
    votes: 0, 
  });

  useEffect(() => {
    if (user) {
      setIsUserLoaded(true);
      setFormData((prevData) => ({
        ...prevData,
        ownerName: user.displayName || "Unknown User",
        ownerEmail: user.email || "Unknown Email",
      }));
    }
  }, [user]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
  
    const newFormData = {
      ...formData,
      tags: formData.tags.length ? formData.tags.join(", ") : "No Tags", 
      timestamp: new Date().toISOString(),
      status: "Pending", // Default status when submitting
      votes: 0, 
    };
    
    console.log(newFormData);
  
    fetch("https://product-hunt-client-server.vercel.app/add-product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newFormData),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        if (data.insertedId) {
          Swal.fire({
            title: "Success!",
            text: `Product "${formData.productName}" added successfully with status: Pending`,
            icon: "success",
            confirmButtonText: "OK",
          });
  
          // Reset the form
          setFormData({
            productName: "",
            productImage: "",
            description: "",
            tags: [],
            externalLink: "",
            ownerName: user?.displayName || "Unknown User",
            ownerEmail: user?.email || "Unknown Email",
            timestamp: "",
            status: "Pending",
            votes: 0, 
          });
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Error:", error);
        toast.error("Failed to add product. Please try again.");
      });
  };

  if (!isUserLoaded) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl font-semibold text-gray-700">Loading user data...</p>
      </div>
    );
  }

  return (
    <div>
      <main className="w-11/12 lg:w-8/12 mx-auto my-8">
        <h1 className="text-3xl font-bold text-center mb-6">Add Product</h1>
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
          <div>
            <label htmlFor="productName" className="block text-sm font-medium text-gray-700">
              Product Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="productName"
              className="mt-1 input input-bordered w-full"
              value={formData.productName}
              onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
              required
            />
          </div>

          <div>
            <label htmlFor="productImage" className="block text-sm font-medium text-gray-700">
              Product Image <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              id="productImage"
              className="mt-1 file-input file-input-bordered w-full"
              value={formData.productImage}
              onChange={(e) => setFormData({ ...formData, productImage: e.target.value })}
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              className="mt-1 textarea textarea-bordered w-full"
              rows="4"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            ></textarea>
          </div>

          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
              Tags
            </label>
            <TagsInput
              value={formData.tags}
              onChange={(tags) => setFormData((prev) => ({ ...prev, tags }))}
              name="tags"
              placeHolder="Enter tags"
            />
          </div>

          <div>
            <label htmlFor="externalLink" className="block text-sm font-medium text-gray-700">
              External Link
            </label>
            <input
              type="url"
              id="externalLink"
              className="mt-1 input input-bordered w-full"
              value={formData.externalLink}
              onChange={(e) => setFormData({ ...formData, externalLink: e.target.value })}
            />
          </div>

          <button type="submit" className="w-full btn btn-warning" disabled={isLoading}>
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </main>
    </div>
  );
};

export default AddProduct;
