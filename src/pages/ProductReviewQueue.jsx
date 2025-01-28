import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2"; // Import SweetAlert2
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const ProductReviewQueue = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    fetchProducts();
  }, []);

  // Fetch products from the backend
  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://product-hunt-client-server-lowdsrgf0-imtiazs-projects-e3424ac1.vercel.app/my-products");
      console.log("Fetched products:", response.data); // Log to verify data

      if (response.data && Array.isArray(response.data)) {
        const sortedProducts = response.data.sort((a, b) =>
          a.status === "Pending" ? -1 : 1
        );
        setProducts(sortedProducts);
      } else {
        console.error("No valid product data found");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle "Make Featured" action
  const handleMakeFeatured = async (id) => {
    const confirmation = await Swal.fire({
      title: `Are you sure you want to make this product Featured?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Make Featured",
      cancelButtonText: "No, cancel",
    });

    if (confirmation.isConfirmed) {
      try {
        const response = await axios.put(`https://product-hunt-client-server-lowdsrgf0-imtiazs-projects-e3424ac1.vercel.app/feature/${id}`);

        // Refresh the product list after marking it as featured
        fetchProducts(); // Re-fetch the products to reflect the updates

        Swal.fire("Success!", "Product has been marked as Featured.", "success");
      } catch (error) {
        console.error("Error moving product to Featured:", error);
        Swal.fire("Error", "There was an issue moving the product to Featured.", "error");
      }
    }
  };

  // Handle regular status updates (Accept/Reject)
  const handleUpdateStatus = async (id, newStatus) => {
    const confirmation = await Swal.fire({
      title: `Are you sure you want to ${newStatus} this product?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: `Yes, ${newStatus}`,
      cancelButtonText: "No, cancel",
    });

    if (confirmation.isConfirmed) {
      try {
        // Update product status in the database
        const response = await axios.put(`https://product-hunt-client-server-lowdsrgf0-imtiazs-projects-e3424ac1.vercel.app/update/${id}`, { status: newStatus });

        // Update product status locally
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === id ? { ...product, status: newStatus } : product
          )
        );

        Swal.fire("Success!", `Product has been marked as ${newStatus}.`, "success");
      } catch (error) {
        console.error("Error updating product status:", error);
        Swal.fire("Error", "There was an issue updating the product status.", "error");
      }
    }
  };

  if (loading) {
    return <div>Loading products...</div>;
  }

  if (products.length === 0) {
    return <div>No products available.</div>;
  }

  return (
    <div className="container mx-auto mt-8 p-4">
      <h1 className="text-2xl font-bold mb-4">Product Review Queue</h1>
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Product Name</th>
            <th className="border px-4 py-2">View Details</th>
            <th className="border px-4 py-2">Featured</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id} className="border-b">
              <td className="border px-4 py-2">{product.productName}</td>
              <td className="border px-4 py-2">
                <Link
                  className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded"
                  onClick={() => navigate(`/details/${product._id}`)}
                  >
                  View Details
                </Link>
              </td>

             
                {product.featured === true ? (
                     <td className="border px-4 py-2 space-x-2">
                  <button className="bg-yellow-500 text-white px-2 py-1 rounded">Featured</button>
                  </td>
                ) : (
                    <td className="border px-4 py-2 space-x-2">

                  <button
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded"
                    onClick={() => handleMakeFeatured(product._id)}
                    disabled={product.status === "Featured"}
                  >
                    Make Featured
                  </button>
                  </td>

                )}

              <td className="border px-4 py-2 space-x-2">
                {product.status === "Pending" ? (
                  <>
                    <button
                      className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded"
                      onClick={() => handleUpdateStatus(product._id, "Accepted")}
                      disabled={product.status === "Accepted" || product.status === "Rejected"}
                    >
                      Accept
                    </button>
                    <button
                      className="bg-red-500 hover:bg-black-900 text-white px-2 py-1 rounded"
                      onClick={() => handleUpdateStatus(product._id, "Rejected")}
                      disabled={product.status === "Rejected" || product.status === "Accepted"}
                    >
                      Reject
                    </button>
                  </>
                ) : (
                  <span>{product.status}</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductReviewQueue;
