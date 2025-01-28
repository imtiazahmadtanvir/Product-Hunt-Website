import React, { useState, useEffect } from "react";
import axios from "axios";

const ManageCouponPage = () => {
  const [coupons, setCoupons] = useState([]);
  const [newCoupon, setNewCoupon] = useState({
    code: "",
    expiryDate: "",
    description: "",
    discountAmount: "",
  });

  useEffect(() => {
    // Fetch coupons when the page loads
    axios.get("http://localhost:5000/api/coupons")
      .then((response) => setCoupons(response.data))
      .catch((error) => console.error("Error fetching coupons:", error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCoupon({ ...newCoupon, [name]: value });
  };

  const handleAddCoupon = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/coupons", newCoupon);
      setCoupons([...coupons, response.data]);
      setNewCoupon({ code: "", expiryDate: "", description: "", discountAmount: "" }); // Clear form
    } catch (error) {
      console.error("Error adding coupon:", error);
    }
  };

  const handleDeleteCoupon = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/coupons/${id}`);
      setCoupons(coupons.filter((coupon) => coupon._id !== id));
    } catch (error) {
      console.error("Error deleting coupon:", error);
    }
  };

  const handleEditCoupon = async (id) => {
    // You can create a separate form for editing, or just edit the values directly
    // Here, it's just an example of how you would handle editing a coupon
    const updatedCoupon = { ...newCoupon };
    try {
      const response = await axios.put(`http://localhost:5000/api/coupons/${id}`, updatedCoupon);
      setCoupons(coupons.map((coupon) => (coupon._id === id ? response.data : coupon)));
    } catch (error) {
      console.error("Error updating coupon:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-xl font-bold mb-6">Manage Coupons</h2>

      {/* Add Coupon Form */}
      <form onSubmit={handleAddCoupon} className="mb-6">
        <input
          type="text"
          name="code"
          value={newCoupon.code}
          onChange={handleInputChange}
          placeholder="Coupon Code"
          required
          className="input mb-2"
        />
        <input
          type="date"
          name="expiryDate"
          value={newCoupon.expiryDate}
          onChange={handleInputChange}
          required
          className="input mb-2"
        />
        <textarea
          name="description"
          value={newCoupon.description}
          onChange={handleInputChange}
          placeholder="Coupon Description"
          required
          className="textarea mb-2"
        />
        <input
          type="number"
          name="discountAmount"
          value={newCoupon.discountAmount}
          onChange={handleInputChange}
          placeholder="Discount Amount"
          required
          className="input mb-2"
        />
        <button type="submit" className="btn btn-primary">Add Coupon</button>
      </form>

      {/* Coupon List */}
      <div>
        <h3 className="text-lg font-semibold mb-4">All Coupons</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coupons.map((coupon) => (
            <div key={coupon._id} className="card p-4 shadow-md">
              <h4 className="text-xl font-bold">{coupon.code}</h4>
              <p>Expiry Date: {new Date(coupon.expiryDate).toLocaleDateString()}</p>
              <p>Description: {coupon.description}</p>
              <p>Discount Amount: ${coupon.discountAmount}</p>
              <div className="flex space-x-2 mt-4">
                <button onClick={() => handleEditCoupon(coupon._id)} className="btn btn-warning">Edit</button>
                <button onClick={() => handleDeleteCoupon(coupon._id)} className="btn btn-danger">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageCouponPage;
