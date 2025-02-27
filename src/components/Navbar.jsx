import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import logo from "../assets/logo.webp";
import defaultPic from "../assets/defulteimage.png";
import { AuthContext } from "../provider/AuthProvider";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);

  return (
    <>
      {/* Sticky Navbar */}
      <div className="fixed top-0 left-0 w-full bg-gray-300 text-gray-900 shadow-lg px-5 py-4 z-50">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center">
            <img src={logo} alt="Product Hunt Logo" className="w-10 h-10 rounded-lg mr-3" />
            <Link to="/" className="text-xl font-bold text-gray-800 dark:text-gray-100">
              Product Hunt
            </Link>
          </div>

          {/* Navigation Links (Large Devices) */}
          <div className="hidden lg:flex gap-5">
            <Link to="/" className="btn btn-ghost hover:bg-gray-300 dark:hover:bg-gray-700">
              Home
            </Link>
            <Link to="/product" className="btn btn-ghost hover:bg-gray-300 dark:hover:bg-gray-700">
              Products
            </Link>
          </div>

          {/* User Profile or Login/Register (Large Devices) */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-2">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="btn btn-ghost hover:bg-gray-300 dark:hover:bg-gray-700">
                  <img src={user?.photoURL || defaultPic} alt={user?.name || "User"} className="w-8 h-8 rounded-full border-2 border-gray-300" />
                </button>
                <button
                  onClick={logOut}
                  className="bg-yellow-400 dark:bg-yellow-500 px-4 py-2 rounded-lg text-gray-800 dark:text-gray-900 hover:bg-yellow-500 dark:hover:bg-yellow-600 transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link to="/auth/login" className="btn btn-primary px-4 py-2">
                  Login
                </Link>
                <Link to="/auth/register" className="btn btn-primary px-4 py-2">
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center">
            {user ? (
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="btn btn-ghost hover:bg-gray-300 dark:hover:bg-gray-700">
                <img src={user?.photoURL || defaultPic} alt={user?.name || "User"} className="w-8 h-8 rounded-full border-2 border-gray-300" />
              </button>
            ) : (
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="btn btn-ghost" aria-label="Toggle Menu">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 7.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                </svg>
              </button>
            )}
          </div>

          {/* Mobile Menu Dropdown */}
          {isMenuOpen && (
            <div className="absolute top-[5rem] right-0 bg-gray-800 rounded-lg dark:bg-gray-800 shadow-lg z-50 w-48">
              <div className="flex flex-col items-start gap-2 p-4">
                <p className="text-gray-300">{user ? user.displayName : ""}</p>

                <Link to="/" className="btn btn-ghost w-full text-left bg-white hover:bg-gray-300">
                  Home
                </Link>
                <Link to="/product" className="btn btn-ghost w-full text-left bg-white hover:bg-gray-300 dark:hover:bg-gray-700">
                  Product
                </Link>

                {user ? (
                  <>
                    <Link to="/dashboard/my-profile" className="btn btn-ghost bg-white w-full text-left hover:bg-gray-300 dark:hover:bg-gray-700">
                      Dashboard
                    </Link>
                    <button onClick={logOut} className="btn btn-primary w-full bg-yellow-400 hover:bg-yellow-500">
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/auth/login" className="btn btn-primary w-full text-center bg-yellow-400 hover:bg-yellow-500">
                      Login
                    </Link>
                    <Link to="/auth/register" className="btn btn-primary w-full text-center bg-yellow-400 hover:bg-yellow-500">
                      Register
                    </Link>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add padding to avoid content overlap */}
      <div className="pt-16"></div>
    </>
  );
};

export default Navbar;
