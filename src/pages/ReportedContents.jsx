// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import Swal from "sweetalert2";

// const ReportedContents = () => {
//   const [reportedProducts, setReportedProducts] = useState([]);
  
//   useEffect(() => {
//     // Fetch the reported products from the backend
//     fetch("http://localhost:5000/reported-products")
//       .then(res => res.json())
//       .then(data => setReportedProducts(data))
//       .catch(error => console.error("Error fetching reported products:", error));
//   }, []);

//   const handleDelete = (productId) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete it!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         // Call backend to delete the reported product
//         fetch(`http://localhost:5000/reported-products/${productId}`, {
//           method: "DELETE",
//         })
//           .then(() => {
//             setReportedProducts(reportedProducts.filter(product => product._id !== productId));
//             Swal.fire("Deleted!", "The product has been deleted.", "success");
//           })
//           .catch(error => Swal.fire("Error!", "There was an issue deleting the product.", "error"));
//       }
//     });
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h2 className="text-xl font-bold mb-4">Reported Contents</h2>
//       <table className="min-w-full table-auto bg-white border border-gray-300">
//         <thead>
//           <tr>
//             <th className="px-4 py-2 border">Product Name</th>
//             <th className="px-4 py-2 border">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {reportedProducts.length > 0 ? (
//             reportedProducts.map((product) => (
//               <tr key={product._id}>
//                 <td className="px-4 py-2 border">{product.name}</td>
//                 <td className="px-4 py-2 border">
//                   <Link
//                     to={`/product-details/${product._id}`}
//                     className="px-4 py-2 text-blue-500 border rounded mr-2"
//                   >
//                     View Details
//                   </Link>
//                   <button
//                     onClick={() => handleDelete(product._id)}
//                     className="px-4 py-2 text-red-500 border rounded"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="2" className="px-4 py-2 text-center">
//                 No reported products found.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ReportedContents;




const ReportedContents = () => {
    return (
        <div>
            <h1>Reported Content</h1>
        </div>
    );
};

export default ReportedContents;