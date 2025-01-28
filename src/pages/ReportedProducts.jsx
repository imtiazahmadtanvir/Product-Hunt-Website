import  { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ReportedProducts = () => {
    const [reportedProducts, setReportedProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchReportedProducts = async () => {
            try {
                const response = await axios.get('/reported-products', { withCredentials: true });
                setReportedProducts(response.data);
            } catch (error) {
                console.error("Error fetching reported products:", error);
            }
        };

        fetchReportedProducts();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/reported-products/${id}`, { withCredentials: true });
            setReportedProducts((prev) => prev.filter(product => product._id !== id));
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    const handleViewDetails = (id) => {
        navigate(`/product-details/${id}`);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-semibold mb-4">Reported Products</h1>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="px-4 py-2 border-b">Product Name</th>
                        <th className="px-4 py-2 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {reportedProducts.length > 0 ? (
                        reportedProducts.map((product) => (
                            <tr key={product._id}>
                                <td className="px-4 py-2 border-b">{product.productName}</td>
                                <td className="px-4 py-2 border-b">
                                    <button
                                        className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
                                        onClick={() => handleViewDetails(product._id)}
                                    >
                                        View Details
                                    </button>
                                    <button
                                        className="px-4 py-2 bg-red-500 text-white rounded"
                                        onClick={() => handleDelete(product._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="2" className="px-4 py-2 border-b text-center">No reported products</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ReportedProducts;
