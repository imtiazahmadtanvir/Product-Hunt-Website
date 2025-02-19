import { Link, Outlet } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from "../provider/AuthProvider";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaUser, FaPlus, FaBox, FaClipboardList, FaExclamationCircle, FaChartBar, FaUsers, FaTicketAlt } from 'react-icons/fa';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetch(`https://product-hunt-client-server.vercel.app/users/${user.email}`, {
        credentials: 'include',
      })
        .then(res => res.json())
        .then(data => {
          setRole(data.role);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching user role:', error);
          setLoading(false);
        });
    }
  }, [user?.email]);

  if (loading) {
    return <div>Loading...</div>; // Show loading state while fetching user role
  }

  return (
    <div className="flex flex-col min-h-screen">
      <nav>
        <Navbar />
      </nav>

      <div className="flex flex-1 flex-col lg:flex-row">
        {/* Sidebar */}
        <div className="w-full lg:w-1/4 bg-gray-800 text-white p-4 min-h-full lg:h-screen lg:sticky top-0">
          <h2 className="text-xl font-bold mb-4">Dashboard</h2>
          <ul className="space-y-2">
            {role === 'User' && (
              <>
                <li>
                  <Link to="/dashboard/my-profile" className="flex items-center space-x-2">
                    <FaUser />
                    <span>My Profile</span>
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/add-product" className="flex items-center space-x-2">
                    <FaPlus />
                    <span>Add Product</span>
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/my-product" className="flex items-center space-x-2">
                    <FaBox />
                    <span>My Products</span>
                  </Link>
                </li>
              </>
            )}
            {role === 'Moderator' && (
              <>
                <li>
                  <Link to="/dashboard/my-profile" className="flex items-center space-x-2">
                    <FaTicketAlt />
                    <span>Profile</span>
                 </Link>
                </li>
                <li>
                  <Link to="/dashboard/product-review-queue" className="flex items-center space-x-2">
                    <FaClipboardList />
                    <span>Product Review Queue</span>
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/reported-contents" className="flex items-center space-x-2">
                    <FaExclamationCircle />
                    <span>Reported Contents</span>
                  </Link>
                </li>
              </>
            )}
            {role === 'Admin' && (
              <>
                <li>
                  <Link to="/dashboard/my-profile" className="flex items-center space-x-2">
                    <FaTicketAlt />
                    <span>Profile</span>
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/statistics" className="flex items-center space-x-2">
                    <FaChartBar />
                    <span>Statistics</span>
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/manage-users" className="flex items-center space-x-2">
                    <FaUsers />
                    <span>Manage Users</span>
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/manage-coupons" className="flex items-center space-x-2">
                    <FaTicketAlt />
                    <span>Manage Coupons</span>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 bg-gray-100">
          <Outlet /> {/* This is where nested routes will render */}
        </div>
      </div>

      {/* Footer */}
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Dashboard;
