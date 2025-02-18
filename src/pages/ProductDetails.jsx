import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { FaArrowUp, FaExclamationTriangle } from "react-icons/fa";
import { AuthContext } from "../provider/AuthProvider";

const ProductDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [productDetail, setProductDetail] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewData, setReviewData] = useState({
    description: "",
    rating: "",
  });

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const productResponse = await axios.get(`https://product-hunt-client-server.vercel.app/my-products/${id}`);
        setProductDetail(productResponse.data);

        const reviewsResponse = await axios.get(`https://product-hunt-client-server.vercel.app/reviews/${id}`);
        setReviews(reviewsResponse.data);
      } catch (error) {
        console.error("Error fetching product details or reviews:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProductDetail();
  }, [id]);

  const handleUpvote = async () => {
    try {
      await axios.post(`https://product-hunt-client-server.vercel.app/products/upvote/${id}`);
      setProductDetail((prev) => ({ ...prev, votes: prev.votes + 1 }));
    } catch (error) {
      console.error("Error upvoting product:", error);
    }
  };

  const handleReport = async () => {
    try {
      await axios.post(`https://product-hunt-client-server.vercel.app/products/report/${id}`);
      alert("Product reported successfully.");
    } catch (error) {
      console.error("Error reporting product:", error);
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    const reviewPayload = {
      productId: id,
      reviewerName: user?.name,
      reviewerImage: user?.photo,
      description: reviewData.description,
      rating: reviewData.rating,
    };

    try {
      await axios.post("https://product-hunt-client-server.vercel.app/reviews", reviewPayload);
      setReviews((prev) => [...prev, reviewPayload]);
      setReviewData({ description: "", rating: "" });
    } catch (error) {
      console.error("Error posting review:", error);
    }
  };

  if (loading) return <div>Loading product details...</div>;
  if (!productDetail) return <div>Error: Product details not found.</div>;

  return (
    <div>
      <Navbar />
      <div className="container mx-auto mt-8 p-4">
        <h1 className="text-2xl font-bold mb-4">{productDetail.productName}</h1>
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 mb-4 md:mb-0">
            <img
              src={productDetail.productImage}
              alt={productDetail.productName}
              className="w-full rounded-lg"
            />
          </div>
          <div className="md:w-1/2 pl-4">
            <p className="text-gray-700 mb-4">{productDetail.description}</p>
            <p className="font-semibold">Total Votes: {productDetail.votes}</p>
            <div className="flex space-x-4 mt-4">
              <button
                onClick={handleUpvote}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded flex items-center space-x-2"
              >
                <FaArrowUp /> <span>Upvote</span>
              </button>
              <button
                onClick={handleReport}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded flex items-center space-x-2"
              >
                <FaExclamationTriangle /> <span>Report</span>
              </button>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Reviews</h2>
          {reviews.length > 0 ? (
            <div className="grid gap-4">
              {reviews.map((review, index) => (
                <div key={index} className="border rounded-lg p-4 shadow">
                  <div className="flex items-center mb-2">
                    <img
                      src={review.reviewerImage}
                      alt={review.reviewerName}
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <span className="font-semibold">{review.reviewerName}</span>
                  </div>
                  <p>{review.description}</p>
                  <p className="text-sm text-gray-600">Rating: {review.rating}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No reviews yet.</p>
          )}
        </div>

        {/* Post Review Section */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Post a Review</h2>
          <form onSubmit={handleSubmitReview} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Reviewer Name</label>
              <input
                type="text"
                value={user?.displayName || "Anonymous"}
                readOnly
                className="w-full p-2 border rounded bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Reviewer Image</label>
              <input
                type="text"
                value={user?.photoURL || "N/A"}
                readOnly
                className="w-full p-2 border rounded bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Review Description</label>
              <textarea
                value={reviewData.description}
                onChange={(e) => setReviewData({ ...reviewData, description: e.target.value })}
                className="w-full p-2 border rounded"
                required
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium">Rating</label>
              <input
                type="number"
                min="1"
                max="5"
                value={reviewData.rating}
                onChange={(e) => setReviewData({ ...reviewData, rating: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Submit Review
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetails;