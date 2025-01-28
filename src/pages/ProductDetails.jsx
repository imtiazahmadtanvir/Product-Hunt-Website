import { useState, useEffect, useContext } from "react";
import { useParams} from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../provider/AuthProvider";

const ProductDetails = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
//   const navigate = useNavigate();
  
  const [product, setProduct] = useState({
    productName: '',
    productImage: '',
    tags: [],
    votes: 0,
    status: '',
    description: '',
    externalLinks: [],
  });
  const [reviews, setReviews] = useState([]);
  const [reviewDescription, setReviewDescription] = useState("");
  const [rating, setRating] = useState(5); // Default rating to 5
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://product-hunt-client-server-lowdsrgf0-imtiazs-projects-e3424ac1.vercel.app/product/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`https://product-hunt-client-server-lowdsrgf0-imtiazs-projects-e3424ac1.vercel.app/reviews/${id}`);
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchProduct();
    fetchReviews();
  }, [id]);

  // Handle upvote
  const handleUpvote = async () => {
    try {
      await axios.put(`https://product-hunt-client-server-lowdsrgf0-imtiazs-projects-e3424ac1.vercel.app/upvote/${id}`);
      fetchProduct(); // Refresh the product data after upvoting
      Swal.fire("Success!", "You upvoted the product.", "success");
    } catch (error) {
      console.error("Error upvoting product:", error);
      Swal.fire("Error", "There was an issue upvoting the product.", "error");
    }
  };

  // Handle report
  const handleReport = async () => {
    try {
      await axios.post(`https://product-hunt-client-server-lowdsrgf0-imtiazs-projects-e3424ac1.vercel.app/report/${id}`);
      Swal.fire("Reported!", "Product has been reported.", "success");
    } catch (error) {
      console.error("Error reporting product:", error);
      Swal.fire("Error", "There was an issue reporting the product.", "error");
    }
  };

  // Submit review
  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!reviewDescription) {
      Swal.fire("Error", "Review description is required.", "error");
      return;
    }

    const newReview = {
      reviewerName: user.name,
      reviewerImage: user.photo,
      description: reviewDescription,
      rating,
      productId: id,
    };

    try {
      await axios.post("https://product-hunt-client-server-lowdsrgf0-imtiazs-projects-e3424ac1.vercel.app/reviews", newReview);
      Swal.fire("Success", "Your review has been submitted.", "success");
      fetchReviews(); // Refresh reviews after submitting
    } catch (error) {
      console.error("Error submitting review:", error);
      Swal.fire("Error", "There was an issue submitting your review.", "error");
    }
  };

  if (loading) {
    return <div>Loading product details...</div>;
  }

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <div className="container mx-auto mt-8 p-4">
      <h1 className="text-2xl font-bold mb-4">{product.productName}</h1>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 mb-4 md:mb-0">
          <img src={product.productImage} alt={product.productName} className="w-full rounded-lg" />
        </div>
        <div className="md:w-1/2 pl-4">
          <p className="text-gray-700">{product.description}</p>
          <div className="mt-4">
            <p className="font-semibold">Tags:</p>
            <ul className="flex flex-wrap space-x-2">
              {product.tags.map((tag, index) => (
                <li key={index} className="bg-gray-200 px-3 py-1 rounded-full text-sm">
                  {tag}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4">
            <p className="font-semibold">External Links:</p>
            <ul className="list-disc pl-5">
              {product.externalLinks.map((link, index) => (
                <li key={index}>
                  <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4">
            <p className="font-semibold">Upvotes: {product.votes}</p>
            <button
              onClick={handleUpvote}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-2"
            >
              Upvote
            </button>
          </div>
          <div className="mt-4">
            <button
              onClick={handleReport}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
              Report Product
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Reviews</h2>
        {reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review._id} className="border p-4 rounded-lg shadow-lg">
                <div className="flex items-center space-x-4">
                  <img
                    src={review.reviewerImage}
                    alt={review.reviewerName}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-semibold">{review.reviewerName}</p>
                    <p className="text-sm text-gray-600">Rating: {review.rating} stars</p>
                  </div>
                </div>
                <p className="mt-2">{review.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {user && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Post a Review</h2>
          <form onSubmit={handleSubmitReview} className="space-y-4">
            <div className="flex space-x-4">
              <input
                type="text"
                value={user.name}
                readOnly
                className="w-full p-2 border rounded-md"
                placeholder="Reviewer Name"
              />
              <input
                type="text"
                value={user.photo}
                readOnly
                className="w-full p-2 border rounded-md"
                placeholder="Reviewer Image"
              />
            </div>
            <div>
              <textarea
                value={reviewDescription}
                onChange={(e) => setReviewDescription(e.target.value)}
                className="w-full p-2 border rounded-md"
                placeholder="Write your review..."
              />
            </div>
            <div>
              <label className="font-semibold">Rating:</label>
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="w-full p-2 border rounded-md"
              >
                {[1, 2, 3, 4, 5].map((star) => (
                  <option key={star} value={star}>
                    {star} Star{star > 1 ? "s" : ""}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mt-4"
            >
              Submit Review
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
