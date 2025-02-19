import { useState, useEffect } from "react";
import { FaThumbsUp, FaExternalLinkAlt } from "react-icons/fa";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://product-hunt-client-server.vercel.app/my-products"
        );
        const data = await response.json();
        // Filter products where featured is true and sort by timestamp
        const featuredProducts = data
          .filter(product => product.featured)
          .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        setProducts(featuredProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="py-12">
      <div className="container mx-auto">
        <h2 className="text-3xl  font-bold text-center mb-8">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product._id} className="card bg-white shadow-xl p-4 rounded-lg">
              <img
                src={product.productImage}
                alt={product.productName}
                className="rounded-lg h-48 w-full object-cover"
              />
              <h3 className="mt-4 text-xl font-semibold text-blue-500">
                {product.productName}
              </h3>
              <p className="text-gray-600 mt-2">{product.description}</p>

              {/* Tags Section */}
              <div className="flex flex-wrap gap-2 mt-2">
                {(Array.isArray(product.tags) ? product.tags : product.tags.split(","))
                  .map((tag, index) => (
                    <span key={index} className="badge badge-secondary text-xs py-1 px-2">
                      {tag.trim()}
                    </span>
                  ))}
              </div>

              {/* External Link */}
              <a
                href={product.externalLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex items-center text-blue-600 hover:underline"
              >
                Visit Product <FaExternalLinkAlt className="ml-2" />
              </a>

              <div className="mt-4 flex items-center justify-between">
                {/* Upvote Button */}
                <button className="btn btn-outline btn-primary flex items-center gap-2">
                  <FaThumbsUp />
                  {product.votes || 0}
                </button>

                {/* Product Owner */}
                <span className="text-gray-500 text-sm">By {product.ownerName}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;