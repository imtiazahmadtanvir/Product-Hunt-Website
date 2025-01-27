import { useState, useEffect } from "react";
import { FaThumbsUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// Simulated featured products data
const featuredProducts = [
  {
    id: 1,
    productName: "AI Photo Enhancer",
    productImage: "https://source.unsplash.com/300x200/?technology,ai",
    tags: ["AI", "Photo Editing", "Technology"],
    upvotes: 150,
    owner: "user1@example.com",
    timestamp: new Date().getTime() - 5000,
  },
  {
    id: 2,
    productName: "Smart Task Manager",
    productImage: "https://source.unsplash.com/300x200/?productivity,task",
    tags: ["Productivity", "Task Management"],
    upvotes: 95,
    owner: "user2@example.com",
    timestamp: new Date().getTime() - 10000,
  },
  {
    id: 3,
    productName: "Fitness Tracker Pro",
    productImage: "https://source.unsplash.com/300x200/?fitness,health",
    tags: ["Fitness", "Health", "Wearable"],
    upvotes: 210,
    owner: "user3@example.com",
    timestamp: new Date().getTime() - 15000,
  },
  {
    id: 4,
    productName: "CodeFlow AI",
    productImage: "https://source.unsplash.com/300x200/?coding,ai",
    tags: ["Programming", "AI", "Code Review"],
    upvotes: 320,
    owner: "user4@example.com",
    timestamp: new Date().getTime() - 20000,
  },
];

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [userVotes, setUserVotes] = useState({});
  const navigate = useNavigate();
  const loggedInUser = localStorage.getItem("userEmail"); // Simulate user login check

  useEffect(() => {
    // Simulate fetching from API and sorting by latest first
    const sortedProducts = featuredProducts.sort(
      (a, b) => b.timestamp - a.timestamp
    );
    setProducts(sortedProducts);
  }, []);

  const handleUpvote = (productId) => {
    if (!loggedInUser) {
      navigate("/login");
    } else if (!userVotes[productId]) {
      setProducts(
        products.map((product) =>
          product.id === productId
            ? { ...product, upvotes: product.upvotes + 1 }
            : product
        )
      );
      setUserVotes({ ...userVotes, [productId]: true });
    }
  };

  const handleProductClick = (productId) => {
    navigate(`/product-details/${productId}`);
  };

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="card bg-white shadow-xl p-4 rounded-lg">
              <img
                src={product.productImage}
                alt={product.productName}
                className="rounded-lg h-48 w-full object-cover"
              />
              <h3
                className="mt-4 text-xl font-semibold text-blue-500 cursor-pointer"
                onClick={() => handleProductClick(product.id)}
              >
                {product.productName}
              </h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {product.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="badge badge-secondary text-xs py-1 px-2"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between">
                <button
                  className="btn btn-outline btn-primary flex items-center gap-2"
                  disabled={product.owner === loggedInUser || userVotes[product.id]}
                  onClick={() => handleUpvote(product.id)}
                >
                  <FaThumbsUp />
                  {product.upvotes}
                </button>
                {product.owner === loggedInUser && (
                  <span className="text-gray-400 text-sm">Your product</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
