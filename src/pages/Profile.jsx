import { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Link } from "react-router-dom";
import defaultPic from "../assets/defulteimage.png";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const subscriptionAmount = "$9.99/month";

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl font-semibold text-gray-700">Loading...</p>
      </div>
    );
  }

  const handleSubscription = () => {
    setIsSubscribed(true);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="bg-[#1e0e5c] pb-32">
        <h2 className="text-3xl font-bold text-white pt-8 text-center">
          Welcome, {user.displayName || "User"}
        </h2>
      </div>

      {/* Profile Card */}
      <div className="w-11/12 md:w-3/4 lg:w-1/2 mx-auto bg-white rounded-xl shadow-lg -mt-24 p-8 text-center">
        <div className="flex flex-col items-center">
          <img
            src={user?.photoURL || defaultPic}
            alt={user?.name || "User"}
            className="w-32 h-32 rounded-full border-4 border-indigo-500"
          />
          <h3 className="text-2xl font-semibold text-gray-700 mt-4">
            {user.displayName || "Anonymous Name"}
          </h3>
          <p className="text-gray-600">{user.email || "No Email Available"}</p>
          
          {/* Additional User Info */}
          <p className="text-gray-600 mt-2">📞 Phone: {user.phoneNumber || "Not Provided"}</p>
          <p className="text-gray-600">📍 Address: {user.address || "Not Provided"}</p>

          {!isSubscribed ? (
            <button
              onClick={handleSubscription}
              className="mt-4 bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition"
            >
              Subscribe for {subscriptionAmount}
            </button>
          ) : (
            <p className="text-green-600 font-semibold mt-4">Status: Verified</p>
          )}

          {/* Buttons */}
          <div className="flex gap-4 mt-6">
            <Link to="/">
              <button className="bg-[#1e0e5c] text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition">
                Back to Home
              </button>
            </Link>
            <Link to="/edit-profile">
              <button className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition">
                Edit Profile
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
