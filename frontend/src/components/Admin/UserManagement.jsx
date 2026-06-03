import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addUser,
  deleteUser,
  fetchUsers,
  updateUser,
} from "../../redux/slices/adminSlice";
import { useNavigate } from "react-router-dom";

// User Management Component
export const UserManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, loading, error } = useSelector((state) => state.admin);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user && user.role !== "admin") {
      navigate("/");
    }
  }, [navigate, user]);

  useEffect(() => {
    if (user && user.role === "admin") {
      dispatch(fetchUsers());
    }
  }, [dispatch, user]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer", // Default role
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const hanleFormSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    dispatch(addUser(formData));

    // Reset the form after sumission.
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "customer", // Default role
    });
  };

  const handleRoleChange = (user, newRole) => {
    console.log({
      name: user.name,
      email: user.email,
      role: newRole,
      id: user._id,
    });

    dispatch(
      updateUser({
        name: user.name,
        email: user.email,
        role: newRole,
        id: user._id,
      }),
    );
  };

  const handleDeleteUser = (userId) => {
    console.log(`requested to delete user##${userId}`);
    if (window.confirm(`Are you sure you want to delete user#${userId}`)) {
      dispatch(deleteUser({ id: userId }));
      console.log(`user#${userId} will be romved.`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto  p-6">
      <h2 className="text-2xl font-bold mb-6">User Managemen</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {/* Add New User Form */}
      <div className="p-6 rounded-lg mb-6">
        <h3 className="text-lg font-bold mb-4">Add New User</h3>
        <form onSubmit={hanleFormSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Role</label>
            <select
              type="password"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            >
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button
            type="submit"
            className="rounded bg-green-500  text-white py-2 px-4 hover:bg-green-600"
          >
            Add User
          </button>
        </form>
      </div>

      {/* Users List Management */}
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full text-left text-gray-500">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.length > 0 &&
              users.map((user) => (
                <tr key={user._id} className="border-b border-gray-200">
                  <td className="py-3 px-4">{user.name}</td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4">
                    {/* {user.role} */}
                    <select
                      name="role"
                      value={user.role}
                      onChange={(e) => handleRoleChange(user, e.target.value)}
                      className="p-2 border border-gray-300 rounded"
                    >
                      <option value="customer">Customer</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="bg-red-500 py-2 px-4 rounded text-xs text-white hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
