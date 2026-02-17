import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

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
      console.log("Invalid token");
      navigate("/login");
    }
  }, [navigate]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md text-center">
        
        {/* Static Profile Image */}
        <div className="flex justify-center mb-6">
          <img
            src="https://i.pravatar.cc/150?img=12"
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover border-4 border-blue-600"
          />
        </div>

        {/* Name */}
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {user.name}
        </h2>

        {/* Email */}
        <p className="text-gray-600 mb-6">
          {user.email}
        </p>

        <button
          onClick={() => navigate("/dashboard")}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}
