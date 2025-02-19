import { Link } from "react-router-dom";

const BlogInsights = () => {
  const blogPosts = [
    {
      id: 1,
      title: "The Future of AI in Product Development",
      excerpt: "Discover how artificial intelligence is shaping the next generation of innovative products.",
      image: "https://source.unsplash.com/500x300/?technology,ai",
      link: "/blog/ai-product-development",
    },
    {
      id: 2,
      title: "Top 10 Gadgets You Need in 2025",
      excerpt: "A list of must-have tech gadgets that will redefine how we live and work.",
      image: "https://source.unsplash.com/500x300/?gadgets,technology",
      link: "/blog/top-gadgets-2025",
    },
    {
      id: 3,
      title: "How Startups Can Leverage Product Hunt",
      excerpt: "Tips and tricks for startups to gain visibility and traction through Product Hunt.",
      image: "https://source.unsplash.com/500x300/?startup,business",
      link: "/blog/startup-product-hunt",
    },
  ];

  return (
    <section className="w-11/12 lg:w-8/12 mx-auto py-16">
      <h2 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-10">
        📖 Blog & Insights
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-5">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {post.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mt-2">{post.excerpt}</p>
              <Link
                to={post.link}
                className="mt-4 inline-block text-yellow-500 hover:text-yellow-600 font-semibold"
              >
                Read More →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BlogInsights;
