
const ProductReviewQueue = () => {
    return (
        <div>
            <h1>ProductReviewQueue</h1>
        </div>
    );
};

export default ProductReviewQueue;


// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// // import Swal from "sweetalert2";
// import toast from "react-hot-toast";

// const ProductReviewQueue = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch products from the database (replace with your actual API call)
//   useEffect(() => {
//     // Example fetch request to get products from the server
//     fetch("http://localhost:5000/products?status=pending", {
//       method: "GET",
//       credentials: "include",
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         setProducts(data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching products:", error);
//         setLoading(false);
//       });
//   }, []);

//   // Handle accepting a product
//   const handleAccept = (productId) => {
//     fetch(`http://localhost:5000/products/${productId}/accept`, {
//       method: "PATCH",
//       credentials: "include",
//     })
//       .then((res) => res.json())
//       .then(() => {
//         toast.success("Product accepted!");
//         setProducts(products.map((product) =>
//           product._id === productId ? { ...product, status: "Accepted" } : product
//         ));
//       })
//       .catch((error) => {
//         console.error("Error accepting product:", error);
//         toast.error("Failed to accept product");
//       });
//   };

//   // Handle rejecting a product
//   const handleReject = (productId) => {
//     fetch(`http://localhost:5000/products/${productId}/reject`, {
//       method: "PATCH",
//       credentials: "include",
//     })
//       .then((res) => res.json())
//       .then(() => {
//         toast.success("Product rejected!");
//         setProducts(products.map((product) =>
//           product._id === productId ? { ...product, status: "Rejected" } : product
//         ));
//       })
//       .catch((error) => {
//         console.error("Error rejecting product:", error);
//         toast.error("Failed to reject product");
//       });
//   };

//   // Handle making a product featured
//   const handleMakeFeatured = (productId) => {
//     fetch(`http://localhost:5000/products/${productId}/feature`, {
//       method: "PATCH",
//       credentials: "include",
//     })
//       .then((res) => res.json())
//       .then(() => {
//         toast.success("Product marked as featured!");
//         setProducts(products.map((product) =>
//           product._id === productId ? { ...product, featured: true } : product
//         ));
//       })
//       .catch((error) => {
//         console.error("Error making product featured:", error);
//         toast.error("Failed to mark product as featured");
//       });
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="container mx-auto p-6">
//       <h2 className="text-2xl font-bold mb-6">Product Review Queue</h2>
//       <table className="min-w-full table-auto border-collapse border border-gray-300">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="px-4 py-2 border border-gray-300">Product Name</th>
//             <th className="px-4 py-2 border border-gray-300">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {products
//             .sort((a, b) => (a.status === "pending" ? -1 : 1)) // Sort by status: Pending first
//             .map((product) => (
//               <tr key={product._id} className="hover:bg-gray-50">
//                 <td className="px-4 py-2 border border-gray-300">{product.name}</td>
//                 <td className="px-4 py-2 border border-gray-300">
//                   <div className="flex space-x-4">
//                     {/* View Details Button */}
//                     <Link
//                       to={`/product/${product._id}`}
//                       className="text-blue-500 hover:underline"
//                     >
//                       View Details
//                     </Link>

//                     {/* Make Featured Button */}
//                     {!product.featured && (
//                       <button
//                         onClick={() => handleMakeFeatured(product._id)}
//                         className="text-green-500 hover:underline"
//                       >
//                         Make Featured
//                       </button>
//                     )}

//                     {/* Accept Button */}
//                     {product.status === "pending" && (
//                       <button
//                         onClick={() => handleAccept(product._id)}
//                         className="text-blue-500 hover:underline"
//                       >
//                         Accept
//                       </button>
//                     )}

//                     {/* Reject Button */}
//                     {product.status === "pending" && (
//                       <button
//                         onClick={() => handleReject(product._id)}
//                         className="text-red-500 hover:underline"
//                       >
//                         Reject
//                       </button>
//                     )}
//                   </div>
//                 </td>
//               </tr>
//             ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ProductReviewQueue;
