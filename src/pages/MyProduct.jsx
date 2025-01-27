import { useState } from 'react';

const MyProduct = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'AI Chatbot',
      votes: 120,
      status: 'Pending',
    },
    {
      id: 2,
      name: 'Fitness Tracker App',
      votes: 85,
      status: 'Accepted',
    },
    {
      id: 3,
      name: 'E-learning Platform',
      votes: 200,
      status: 'Rejected',
    },
  ]);

  const handleDelete = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Products</h1>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Product Name</th>
            <th className="py-2 px-4 border-b">Number of Votes</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td className="py-2 px-4 border-b">{product.name}</td>
              <td className="py-2 px-4 border-b">{product.votes}</td>
              <td className="py-2 px-4 border-b">{product.status}</td>
              <td className="py-2 px-4 border-b">
                <button 
                  className="bg-blue-500 text-white px-4 py-1 rounded mr-2"
                  onClick={() => alert('Redirecting to update page...')}
                >
                  Update
                </button>
                <button 
                  className="bg-red-500 text-white px-4 py-1 rounded"
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyProduct;
