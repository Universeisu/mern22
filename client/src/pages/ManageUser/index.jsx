import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrashAlt } from "react-icons/fa"; // ใช้ไอคอนถังขยะ

const ManageUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // ฟังก์ชันดึงข้อมูลผู้ใช้จาก API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/user");
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users", error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // ฟังก์ชันสำหรับการสลับบทบาท admin / user
  const toggleRole = async (email, newRole) => {
    try {
      const token = localStorage.getItem("token"); // หรือตรวจสอบ cookie ตามที่คุณใช้
      await axios.patch(
        `http://localhost:5000/api/v1/user/${email}`,
        { role: newRole },
        {
          headers: {
            Authorization: `Bearer ${token}`, // ส่ง token ด้วย
          },
        }
      );
      // อัปเดตข้อมูลใน state
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.email === email ? { ...user, role: newRole } : user
        )
      );
    } catch (error) {
      console.error("Error updating user role", error);
    }
  };

  // ฟังก์ชันสำหรับการลบผู้ใช้
  const deleteUser = async (email) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/v1/user/${email}`, {
        headers: {
          Authorization: `Bearer ${token}`, // ส่ง token ด้วย
        },
      });
      // อัปเดตข้อมูลหลังจากลบผู้ใช้
      setUsers((prevUsers) => prevUsers.filter((user) => user.email !== email));
    } catch (error) {
      console.error("Error deleting user", error);
    }
  };

  // UI สำหรับหน้า ManageUser
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Users</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.email}>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">
                  {/* Toggle for Role */}
                  <div className="flex items-center space-x-2">
                    <label
                      htmlFor={`toggle-${user.email}`}
                      className="relative inline-block w-24 h-8"
                    >
                      <input
                        type="checkbox"
                        id={`toggle-${user.email}`}
                        className="toggle"
                        defaultChecked={user.role === "admin"}
                        onChange={() =>
                          toggleRole(
                            user.email,
                            user.role === "admin" ? "user" : "admin"
                          )
                        }
                      />
                    </label>
                    <span>{user.role === "admin" ? "Admin" : "User"}</span>
                  </div>
                </td>
                <td className="border px-4 py-2">
                  {/* Icon for Deleting User */}
                  <button
                    onClick={() => deleteUser(user.email)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageUser;
