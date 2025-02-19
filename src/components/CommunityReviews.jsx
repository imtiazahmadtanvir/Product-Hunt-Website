import { useEffect, useState } from "react";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

const CommunityReviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Fetch reviews from an API (replace with actual API call)
    setReviews([
      {
        id: 1,
        name: "John Doe",
        rating: 5,
        comment: "Absolutely love this platform! Found amazing products here.",
        date: "Feb 12, 2025",
        avatar: "https://i.pravatar.cc/100?img=1",
      },
      {
        id: 2,
        name: "Sarah Smith",
        rating: 4,
        comment: "Great user experience and an awesome collection of products.",
        date: "Feb 10, 2025",
        avatar: "https://i.pravatar.cc/100?img=2",
      },
      {
        id: 3,
        name: "David Johnson",
        rating: 4.5,
        comment: "Good but could use some improvements in product filtering.",
        date: "Feb 8, 2025",
        avatar: "https://i.pravatar.cc/100?img=3",
      },
    ]);
  }, []);

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;

    return (
      <>
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={i} className="text-yellow-400" />
        ))}
        {halfStar && <FaStarHalfAlt className="text-yellow-400" />}
        {[...Array(5 - fullStars - (halfStar ? 1 : 0))].map((_, i) => (
          <FaRegStar key={i} className="text-yellow-400" />
        ))}
      </>
    );
  };

  return (
    <section className="w-11/12 lg:w-8/12 mx-auto my-16">
      <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
        Community Reviews
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center space-x-4 mb-3">
              <img
                src={review.avatar}
                alt={review.name}
                className="w-12 h-12 rounded-full border border-gray-300"
              />
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {review.name}
                </h4>
                <p className="text-sm text-gray-500">{review.date}</p>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-3">{review.comment}</p>
            <div className="flex">{renderStars(review.rating)}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CommunityReviews;
