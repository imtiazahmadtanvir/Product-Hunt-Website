import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts(page, searchTerm);
  }, [page, searchTerm]);

  const fetchProducts = async (page, searchTerm) => {
    try {
      setLoading(true);
      const response = await axios.get(`https://product-hunt-client-server.vercel.app/products`, {
        params: {
          page,
          searchTerm,
        },
      });
      setProducts(response.data.products);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching products:", error);
      Swal.fire("Error", "There was an issue fetching the products.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1); // Reset to first page on search
    fetchProducts(1, searchTerm);
  };

  const handlePagination = (direction) => {
    if (direction === "next" && page < totalPages) {
      setPage(page + 1);
    } else if (direction === "prev" && page > 1) {
      setPage(page - 1);
    }
  };

  if (loading) {
    return <div>Loading products...</div>;
  }

  return (
    <div className="container mx-auto mt-8 p-4">
      <div className="mb-4">
        <form onSubmit={handleSearch} className="flex">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 w-full border rounded-l-md"
            placeholder="Search by tags..."
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-r-md"
          >
            Search
          </button>
        </form>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          products.map((product) => (
            <div key={product._id} className="border rounded-lg p-4 shadow-lg">
              <img
                src={product.image}
                alt={product.productName}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="mt-4">
                <h3 className="text-lg font-semibold">{product.productName}</h3>
                <div className="flex flex-wrap space-x-2 mt-2">
                  {product.tags.map((tag, index) => (
                    <span key={index} className="bg-gray-200 px-3 py-1 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <p className="font-semibold">Upvotes: {product.upvotes}</p>
                  <Link
                    to={`/product/${product._id}`}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination Controls */}
      <div className="mt-8 flex justify-between items-center">
        <button
          onClick={() => handlePagination("prev")}
          disabled={page === 1}
          className="bg-gray-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
        >
          Previous
        </button>
        <p>
          Page {page} of {totalPages}
        </p>
        <button
          onClick={() => handlePagination("next")}
          disabled={page === totalPages}
          className="bg-gray-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductsPage;
