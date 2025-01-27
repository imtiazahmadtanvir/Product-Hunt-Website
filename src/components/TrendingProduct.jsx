import { useState, useEffect } from "react";
import { FaThumbsUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// Fake trending product data
const trendingProductsData = [
  {
    id: 1,
    productName: "Smart Home Assistant",
    productImage: "https://via.placeholder.com/300",
    tags: ["Smart Home", "AI", "Automation"],
    upvotes: 320,
    owner: "user1@example.com",
  },
  {
    id: 2,
    productName: "Noise Cancelling Headphones",
    productImage: "https://via.placeholder.com/300",
    tags: ["Audio", "Gadgets", "Lifestyle"],
    upvotes: 280,
    owner: "user2@example.com",
  },
  {
    id: 3,
    productName: "Electric Scooter X1",
    productImage: "https://via.placeholder.com/300",
    tags: ["Transport", "Eco-Friendly", "Mobility"],
    upvotes: 250,
    owner: "user3@example.com",
  },
  {
    id: 4,
    productName: "Wireless Charging Pad",
    productImage: "https://via.placeholder.com/300",
    tags: ["Technology", "Wireless", "Accessories"],
    upvotes: 220,
    owner: "user4@example.com",
  },
  {
    id: 5,
    productName: "Smartwatch Pro",
    productImage: "https://via.placeholder.com/300",
    tags: ["Fitness", "Health", "Wearables"],
    upvotes: 180,
    owner: "user5@example.com",
  },
  {
    id: 6,
    productName: "Gaming Laptop Xtreme",
    productImage: "https://via.placeholder.com/300",
    tags: ["Gaming", "Performance", "Technology"],
    upvotes: 150,
    owner: "user6@example.com",
  },
];

const TrendingProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const loggedInUser = "user1@example.com"; // Simulated logged-in user email
  const [votedProducts, setVotedProducts] = useState([]);

  useEffect(() => {
    // Sort products by vote count (Trending Products)
    const sortedProducts = [...trendingProductsData].sort((a, b) => b.upvotes - a.upvotes);
    setProducts(sortedProducts);
  }, []);

  const handleUpvote = (productId) => {
    if (!loggedInUser) {
      navigate("/login");
    } else if (!votedProducts.includes(productId)) {
      setProducts(
        products.map((product) =>
          product.id === productId
            ? { ...product, upvotes: product.upvotes + 1 }
            : product
        )
      );
      setVotedProducts([...votedProducts, productId]); // Store voted product
    }
  };

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Trending Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="card bg-white shadow-xl p-4 rounded-lg">
              <img
                src={product.productImage}
                alt={product.productName}
                className="rounded-lg h-48 w-full object-cover"
              />
              <h3
                className="mt-4 text-xl font-semibold cursor-pointer hover:text-blue-500"
                onClick={() => navigate(`/products/${product.id}`)}
              >
                {product.productName}
              </h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {product.tags.map((tag, index) => (
                  <span key={index} className="badge badge-secondary text-xs py-1 px-2">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between">
                <button
                  className="btn btn-outline btn-primary flex items-center gap-2"
                  disabled={product.owner === loggedInUser || votedProducts.includes(product.id)}
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
        <div className="text-center mt-8">
          <button
            className="btn btn-primary px-6 py-2"
            onClick={() => navigate("/products")}
          >
            Show All Products
          </button>
        </div>
      </div>
    </section>
  );
};

export default TrendingProducts;
