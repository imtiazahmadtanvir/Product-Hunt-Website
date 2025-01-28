import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

const UpdateProduct = () => {
  const { id } = useParams();  // Get the product ID from the URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    productName: '',
    votes: '',
    status: ''
  });

  const history = useHistory();

  useEffect(() => {
    // Fetch product details from the backend using the product ID
    fetch(`http://localhost:5000/my-products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setFormData({
          productName: data.productName,
          votes: data.votes,
          status: data.status
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send the updated product data to the server
    fetch(`http://localhost:5000/my-products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === 'Product updated successfully') {
          history.push('/my-products');  // Redirect to the products list after update
        } else {
          alert('Failed to update product');
        }
      })
      .catch((error) => {
        console.error("Error updating product:", error);
        alert('Failed to update product');
      });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Update Product</h1>
      {product && (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="productName" className="block text-sm font-medium">Product Name</label>
            <input
              type="text"
              id="productName"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
          <div>
            <label htmlFor="votes" className="block text-sm font-medium">Votes</label>
            <input
              type="number"
              id="votes"
              name="votes"
              value={formData.votes}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
          <div>
            <label htmlFor="status" className="block text-sm font-medium">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="input"
            >
              <option value="Pending">Pending</option>
              <option value="Accepted">Accepted</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
          <button type="submit" className="btn">Update Product</button>
        </form>
      )}
    </div>
  );
};

export default UpdateProduct;
