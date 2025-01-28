import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://product-hunt-client-server.vercel.app/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handleRoleChange = (userId, newRole) => {
    Swal.fire({
      title: `Are you sure you want to make this user ${newRole}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, make ${newRole}`,
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://product-hunt-client-server.vercel.app/users/${userId}/role`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ role: newRole }),
        })
          .then((res) => {
            if (res.ok) {
              setUsers(users.map((user) => (user._id === userId ? { ...user, role: newRole } : user)));
              Swal.fire("Updated!", `User role has been changed to ${newRole}.`, "success");
            } else {
              Swal.fire("Error!", "Failed to update user role.", "error");
            }
          })
          .catch(() => Swal.fire("Error!", "There was an issue updating the role.", "error"));
      }
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Manage Users</h2>
      <table className="min-w-full table-auto bg-white text-gray-900 border border-gray-300">
        <thead>
          <tr>
            <th className="px-4 py-2 border">User Name</th>
            <th className="px-4 py-2 border">User Email</th>
            <th className="px-4 py-2 border">Actions</th>
            <th className="px-4 py-2 border">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user._id}>
                <td className="px-4 py-2 border">{user.name}</td>
                <td className="px-4 py-2 border">{user.email}</td>
                <td className="px-4 py-2 border">
                  {user.role === "Admin" && (
                    <>
                      <button
                        onClick={() => handleRoleChange(user._id, "Moderator")}
                        className="px-4 py-2 text-blue-500 border rounded mr-2"
                      >
                        Make Moderator
                      </button>
                      <button
                        onClick={() => handleRoleChange(user._id, "User")}
                        className="px-4 py-2 text-red-500 border rounded"
                      >
                        Make User
                      </button>
                    </>
                  )}
                  {user.role === "Moderator" && (
                    <>
                      <button
                        onClick={() => handleRoleChange(user._id, "Admin")}
                        className="px-4 py-2 text-green-500 border rounded mr-2"
                      >
                        Make Admin
                      </button>
                      <button
                        onClick={() => handleRoleChange(user._id, "User")}
                        className="px-4 py-2 text-red-500 border rounded"
                      >
                        Make User
                      </button>
                    </>
                  )}
                  {user.role === "User" && (
                    <>
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
                    </>
                  )}
                </td>
                <td className="px-4 py-2 border">{user.role}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="px-4 py-2 text-center">
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
