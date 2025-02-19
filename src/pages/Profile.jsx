import { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Link } from "react-router-dom";
// import Footer from "../components/Footer";
import defaultPic from "../assets/defulteimage.png";
// import Navbar from "../components/Navbar";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const subscriptionAmount = "$9.99/month";

  // Ensure user data is available before rendering the profile
  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl font-semibold text-gray-700">Loading...</p>
      </div>
    );
  }

  const handleSubscription = () => {
    // Redirect to payment page or open modal (for now, simulate subscription)
    setIsSubscribed(true);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      {/* <Navbar /> */}

      {/* Main Content */}
      <div className="flex-grow pb-16">
        <div className="bg-[#1e0e5c] pb-48">
          <h2 className="text-3xl font-bold text-white pt-8 text-center">
            Welcome {user ? user.displayName : "Loading"}
          </h2>
        </div>

        {/* Details Section */}
        <div className="w-11/12 mx-auto flex flex-col justify-center items-center bg-white rounded-3xl shadow-lg -mt-32 p-8">
          <div className="avatar">
            <div className="w-40 -mt-20 rounded-full">
              <img src={user?.photoURL || defaultPic} alt={user?.name || "User"} className="w-40 h-40 rounded-full" />
            </div>
          </div>
          <h3 className="text-2xl text-gray-600 font-bold pt-4 text-center">{user ? user.displayName : "Anonymous name"}</h3>
          <p className="text-sm text-gray-600 pb-4">{user ? user.email : "Anonymous email"}</p>

          {!isSubscribed ? (
            <button
              onClick={handleSubscription}
              className="btn bg-yellow-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-yellow-600 transition"
            >
              Subscribe for {subscriptionAmount}
            </button>
          ) : (
            <p className="text-green-600 font-semibold mt-4">Status: Verified</p>
          )}

          <Link to="/">
            <button className="btn bg-[#1e0e5c] text-white mt-4">Back to Home</button>
          </Link>
        </div>
      </div>

      {/* Footer Fixed at Bottom */}
      {/* <Footer className="bottom-0 left-0 w-full z-50 bg-base-200" /> */}
    </div>
  );
};

export default Profile;
