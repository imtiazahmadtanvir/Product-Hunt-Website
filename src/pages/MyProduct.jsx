import { useEffect, useState } from 'react';
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const MyProduct = () => {
  const [Products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    fetch("http://localhost:5000/my-products") // Replace with your actual API endpoint
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/my-products/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.message === "Product deleted successfully") {
              setProducts(Products.filter((product) => product._id !== id));
              Swal.fire("Deleted!", "Your product has been deleted.", "success");
            } else {
              Swal.fire("Error!", "Product not found or deletion failed.", "error");
            }
          })
          .catch((error) => {
            console.error("Error deleting product:", error);
            Swal.fire("Error!", "Something went wrong.", "error");
          });
      }
    });
  };



  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Products</h1>
      {loading ? (
        <p>Loading products...</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Product Name</th>
              <th className="py-2 px-4 border-b">Number of Votes</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Products.map((Product) => (
              <tr key={Product._id}>
                <td className="py-2 px-4 border-b">{Product.productName}</td>
                <td className="py-2 px-4 border-b">{Product.votes}</td>
                <td className="py-2 px-4 border-b">{Product.status}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    className="bg-blue-500 text-white px-4 py-1 rounded mr-2"
                    onClick={() => navigate(`/update/${Product._id}`)}
                    >
                    Update
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-1 rounded"
                    onClick={() => handleDelete(Product._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyProduct;
