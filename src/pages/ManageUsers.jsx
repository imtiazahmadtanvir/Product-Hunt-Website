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
          .then(async (res) => {
            const data = await res.json();
  
            if (res.ok) {
              setUsers((prevUsers) =>
                prevUsers.map((user) =>
                  user._id === userId ? { ...user, role: newRole } : user
                )
              );
              Swal.fire("Updated!", data.message, "success");
            } else {
              Swal.fire("Error!", data.message || "Failed to update user role.", "error");
            }
          })
          .catch((error) => {
            Swal.fire("Error!", error.message || "There was an issue updating the role.", "error");
          });
      }
    });
  };

  const handleDeleteUser = (userId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action will permanently delete the user.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://product-hunt-client-server.vercel.app/users/${userId}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.message) {
              setUsers(users.filter((user) => user._id !== userId));
              Swal.fire("Deleted!", "The user has been deleted.", "success");
            } else {
              Swal.fire("Error!", "Failed to delete user.", "error");
            }
          })
          .catch(() => Swal.fire("Error!", "There was an issue deleting the user.", "error"));
      }
    });
  };

  return (
    <div className="container ">
      <h2 className="text-xl mx-auto text-center font-bold text-gray-900 mb-4">Manage Users</h2>
      <div className="">
        <table className="w-10/12 mx-auto table-auto bg-white text-gray-900 border border-gray-300">
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
                    <div className="space-x-2">
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
                            className="px-4 py-2 text-red-500 border rounded mr-2"
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
                            className="px-4 py-2 text-red-500 border rounded mr-2"
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
                            className="px-4 py-2 text-green-500 border rounded mr-2"
                          >
                            Make Admin
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => handleDeleteUser(user._id)}
                        className="px-4 py-2 text-red-600 border rounded ml-2"
                      >
                        Delete User
                      </button>
                    </div>
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
    </div>
  );
};

export default ManageUsers;
