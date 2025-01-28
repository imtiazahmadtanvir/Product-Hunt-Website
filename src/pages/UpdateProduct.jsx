import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const UpdateProduct = () => {
  const { id } = useParams(); // Get product ID from URL
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    productName: '',
    productImage: '',
    tags: '',
    votes: 0,
    status: '',
  });

  useEffect(() => {
    // Fetch product data by ID
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://product-hunt-client-server.vercel.app/my-products/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }
        const data = await response.json();
        console.log('Fetched product data:', data); // Log the data to check if it's correct
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
  
    fetchProduct();
  }, [id]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { _id, ...updatedProduct } = product;
      const response = await fetch(`https://product-hunt-client-server.vercel.app/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProduct),
      });

      if (!response.ok) {
        throw new Error('Failed to update product');
      }

      Swal.fire('Success!', 'Product updated successfully', 'success');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error updating product:', error);
      Swal.fire('Error!', 'Something went wrong. Please try again.', 'error');
    }
  };

  return (
    <div className="bg-white">
      <nav>
        <Navbar />
        <h2 className="text-3xl py-4 text-gray-700 text-center font-bold">Update Product</h2>
      </nav>

      <main className="flex w-10/12 shadow-lg bg-gray-900 rounded-lg mb-6 lg:w-6/12 flex-grow container mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="space-y-4 form-content w-full">
          <label htmlFor="productName" className="block text-sm font-medium text-gray-400">
            Product Name
          </label>
          <input
            name="productName"
            value={product.productName}
            onChange={handleChange}
            placeholder="Product Name"
            className="input w-full"
          />

          <label htmlFor="productImage" className="block text-sm font-medium text-gray-400">
            Product Image URL
          </label>
          <input
            name="productImage"
            value={product.productImage}
            onChange={handleChange}
            placeholder="Product Image URL"
            className="input w-full"
          />

          {/* Tags are not editable, so you can leave it as a read-only input */}
          {/* <label htmlFor="tags" className="block text-sm font-medium text-gray-400">
            Tags
          </label> */}
          {/* <input
            name="tags"
            value={product.tags}
            readOnly
            className="input w-full bg-gray-300"
          /> */}

          {/* Votes are read-only */}
          <label htmlFor="votes" className="block text-sm font-medium text-gray-400">
            Votes
          </label>
          <input
            name="votes"
            type="number"
            value={product.votes}
            disabled
            className="input w-full bg-gray-300"
          />

          {/* Status is also read-only */}
          <label htmlFor="status"  className="block text-sm font-medium text-gray-400">
            Status
          </label>
          <select
            name="status"
            value={product.status}
            disabled
            className="input w-full bg-gray-300"
          >
            <option value="Pending">Pending</option>
            <option value="Accepted">Accepted</option>
            <option value="Rejected">Rejected</option>
          </select>

          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded"
          >
            Update Product
          </button>
        </form>
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default UpdateProduct;
