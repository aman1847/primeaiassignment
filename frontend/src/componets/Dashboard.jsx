import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function Dashboard() {
  const [active, setActive] = useState("profile");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // 🔐 Protect Route
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      setUser(decoded);
    } catch (error) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  }, [navigate]);

  // 🔓 Logout Function
  const logout = () => {
    localStorage.removeItem("token");   // remove JWT
    navigate("/");                     // go to home page
  };

  // 🔁 Go To CRUD Page
  const goToCrud = () => {
    navigate("/crud");
  };

  if (!user) return null;

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <div className="w-64 bg-white shadow-lg hidden md:block">
        <div className="p-6 text-2xl font-bold text-blue-600 border-b">
          Dashboard
        </div>

        <ul className="p-4 space-y-4">

          {/* My Profile */}
          <li
            onClick={() => setActive("profile")}
            className={`cursor-pointer p-2 rounded ${
              active === "profile"
                ? "bg-blue-100 text-blue-600"
                : "hover:bg-gray-100"
            }`}
          >
            My Profile
          </li>

          {/* CRUD */}
          <li
            onClick={goToCrud}
            className="cursor-pointer p-2 rounded hover:bg-gray-100"
          >
            CRUD
          </li>

          {/* Logout */}
          <li
            onClick={logout}
            className="cursor-pointer p-2 rounded hover:bg-red-100 text-red-500"
          >
            Logout
          </li>

        </ul>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6 capitalize">
          My Profile
        </h1>

        {/* PROFILE SECTION */}
        <div className="bg-white p-6 rounded-xl shadow max-w-md">

          <div className="flex justify-center mb-6">
            <img
              src="https://i.pravatar.cc/150?img=12"
              alt="Profile"
              className="w-28 h-28 rounded-full border-4 border-blue-600"
            />
          </div>

          <p className="mb-2">
            <strong>Name:</strong> {user.name}
          </p>

          <p className="mb-2">
            <strong>Email:</strong> {user.email}
          </p>

          <p>
            <strong>Role:</strong> {user.role || "Student"}
          </p>

        </div>
      </div>
    </div>
  );
}
