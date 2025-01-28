import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch all users from the backend
    fetch("https://product-hunt-client-server-lowdsrgf0-imtiazs-projects-e3424ac1.vercel.app/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  // const handleRoleChange = (userId, newRole) => {
  //   // Confirm role change
  //   Swal.fire({
  //     title: `Are you sure you want to make this user ${newRole}?`,
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: `Yes, make ${newRole}`,
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       // Make API call to update the user role
  //       fetch(`https://product-hunt-client-server-lowdsrgf0-imtiazs-projects-e3424ac1.vercel.app/users/${userId}/role`, {
  //         method: "PATCH",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ role: newRole }),
  //       })
  //         .then(() => {
  //           setUsers(users.map((user) => (user._id === userId ? { ...user, role: newRole } : user)));
  //           Swal.fire("Updated!", `User role has been changed to ${newRole}.`, "success");
  //         })
  //         .catch((error) => Swal.fire("Error!", "There was an issue updating the role.", "error"));
  //     }
  //   });
  // };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Manage Users</h2>
      <table className="min-w-full table-auto bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="px-4 py-2 border">User Name</th>
            <th className="px-4 py-2 border">User Email</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user._id}>
                <td className="px-4 py-2 border">{user.name}</td>
                <td className="px-4 py-2 border">{user.email}</td>
                <td className="px-4 py-2 border">
                  <button
                    onClick={() => handleRoleChange(user._id, "Moderator")}
                    className="px-4 py-2 text-blue-500 border rounded mr-2"
                  >
                    Make Moderator
                  </button>
                  <button
                    onClick={() => handleRoleChange(user._id, "Admin")}
                    className="px-4 py-2 text-green-500 border rounded"
                  >
                    Make Admin
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="px-4 py-2 text-center">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;



// const ManageUsers = () => {


//   return (
//     <div>
      
//     </div>
//   );
// };

// export default ManageUsers;