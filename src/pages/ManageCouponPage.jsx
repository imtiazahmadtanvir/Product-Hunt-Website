import { useState, useEffect } from 'react';
import Swal from 'sweetalert2'; // Import SweetAlert2

const CouponCodeAddForm = () => {
  const [couponData, setCouponData] = useState({
    code: '',
    expiryDate: '',
    description: '',
    discountAmount: '',
  });

  const [coupons, setCoupons] = useState([]); // State to store the list of coupons
  const [isEditing, setIsEditing] = useState(false); // State to track whether we are editing

  useEffect(() => {
    // Fetch the list of coupons when the component mounts
    const fetchCoupons = async () => {
      try {
        const response = await fetch('https://product-hunt-client-server.vercel.app/coupons');
        const result = await response.json();
        if (response.ok) {
          setCoupons(result); // Set the coupons in state
        } else {
          console.error('Failed to fetch coupons');
        }
      } catch (error) {
        console.error('Error fetching coupons:', error);
      }
    };

    fetchCoupons(); // Call the function to fetch coupons
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCouponData({
      ...couponData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = isEditing
        ? `https://product-hunt-client-server.vercel.app/update/coupons/${couponData.id}`
        : 'https://product-hunt-client-server.vercel.app/add/coupons';

      const method = isEditing ? 'PUT' : 'POST';

      // Send the coupon data to the backend API
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(couponData),
      });

      const result = await response.json(); // Parse the response as JSON

      if (!response.ok) {
        throw new Error(result.error || 'Failed to add or update coupon');
      }

      // Show success alert using SweetAlert2
      Swal.fire({
        title: 'Success!',
        text: isEditing ? 'Coupon code updated successfully.' : 'Coupon code added successfully.',
        icon: 'success',
        confirmButtonText: 'OK',
      });

      // Reset the form after successful submission
      setCouponData({
        code: '',
        expiryDate: '',
        description: '',
        discountAmount: '',
      });
      setIsEditing(false); // Reset editing state

      // Fetch updated coupon list after adding or updating a coupon
      const updatedCouponsResponse = await fetch('https://product-hunt-client-server.vercel.app/coupons');
      const updatedCoupons = await updatedCouponsResponse.json();
      setCoupons(updatedCoupons); // Update the coupons list

    } catch (error) {
      // Show error alert using SweetAlert2
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  const handleEdit = (id) => {
    // Pre-fill the form with the coupon data and enable editing
    setCouponData(id);
    setIsEditing(true);
  };

  const handleDelete = async (couponId) => {  // Make sure you pass the MongoDB _id here
    try {
      const response = await fetch(`https://product-hunt-client-server.vercel.app/coupons/${couponId}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to delete coupon');
      }

      // Show success alert using SweetAlert2
      Swal.fire({
        title: 'Success!',
        text: 'Coupon code deleted successfully.',
        icon: 'success',
        confirmButtonText: 'OK',
      });

      // Remove the deleted coupon from the list in state for faster UI update
      setCoupons(coupons.filter(coupon => coupon._id !== couponId)); // Filter out the deleted coupon

    } catch (error) {
      // Show error alert using SweetAlert2
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl text-center font-bold mb-4">{isEditing ? 'Edit Coupon' : 'Add Coupon'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Coupon Code */}
        <div>
          <label htmlFor="code" className="block text-sm font-medium text-gray-700">Coupon Code</label>
          <input
            type="text"
            id="code"
            name="code"
            value={couponData.code}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            placeholder="Enter coupon code"
            required
          />
        </div>

        {/* Expiry Date */}
        <div>
          <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">Expiry Date</label>
          <input
            type="date"
            id="expiryDate"
            name="expiryDate"
            value={couponData.expiryDate}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Coupon Code Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Coupon Code Description</label>
          <textarea
            id="description"
            name="description"
            value={couponData.description}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            placeholder="Enter description"
            rows="3"
            required
          />
        </div>

        {/* Discount Amount */}
        <div>
          <label htmlFor="discountAmount" className="block text-sm font-medium text-gray-700">Discount Amount</label>
          <input
            type="number"
            id="discountAmount"
            name="discountAmount"
            value={couponData.discountAmount}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            placeholder="Enter discount amount"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
          >
            {isEditing ? 'Update Coupon Code' : 'Add Coupon Code'}
          </button>
        </div>
      </form>

      {/* Display Coupons List */}
      <div className="mt-8">
        <h3 className="text-xl text-gray-500 font-bold">All Coupons</h3>
        <ul className="space-y-4 mt-4">
          {coupons.length > 0 ? (
            coupons.map((coupon, index) => (
              <li key={index} className="p-4 border rounded-lg shadow-sm">
                <h4 className="text-lg font-semibold"><strong>Coupon Code: </strong>{coupon.code}</h4>
                <p><strong>Expiry Date:</strong> {coupon.expiryDate}</p>
                <p><strong>Description:</strong> {coupon.description}</p>
                <p><strong>Discount Amount:</strong> ${coupon.discountAmount}</p>
                <div className="flex justify-center space-x-6">
                  <button
                    onClick={() => handleEdit(coupon._id)}
                    className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(coupon._id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))
          ) : (
            <p>No coupons available.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default CouponCodeAddForm;
