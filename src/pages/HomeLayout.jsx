import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import FeaturedProducts from "../components/FeaturedProduct";
import TrendingProducts from "../components/TrendingProduct";
import { useEffect, useState } from "react";
// import FeaturedArtifacts from "../components/FeaturedArtifacts";
// import WhyPreservingHistory from "../components/WhyPreservingHistory";
// import YourRoleInPreservingHistory from "../components/YourRoleInPreservingHistory";
import { FaSun, FaMoon } from "react-icons/fa";


const HomeLayout = () => {

  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
      document.body.classList.add("bg-gray-900", "text-white");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      document.body.classList.remove("bg-gray-900", "text-white");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header>
        <Navbar />
              {/* Dark Mode Toggle Button */}
      <div className="fixed top-5 right-1 md:right-12 lg:right-2 z-50">
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="lg:p-3 md:p-3 p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white transition-all"
        >
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>
        <Banner></Banner>
        <FeaturedProducts></FeaturedProducts>
        <TrendingProducts></TrendingProducts>
        
      </header>
      {/* <FeaturedArtifacts></FeaturedArtifacts> */}
       {/* <WhyPreservingHistory></WhyPreservingHistory> */}
       {/* <YourRoleInPreservingHistory></YourRoleInPreservingHistory> */}
      <main className="flex-grow bg-white">
        <Outlet />
      </main>

      <footer className="bg-white">
        <Footer />
      </footer>
    </div>
  );
};

export default HomeLayout;
