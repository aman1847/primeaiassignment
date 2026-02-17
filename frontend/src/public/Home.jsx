import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [token, setToken] = useState(null);

  const navigate = useNavigate();

  // Check token on component load
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    setToken(savedToken);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* NAVBAR */}
      <nav className="bg-white shadow-md px-6 py-4">
        <div className="flex justify-between items-center">

          {/* LEFT SIDE */}
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-bold text-blue-600">MyApp</h1>

            <ul className="hidden md:flex space-x-6 font-medium text-gray-700">
              <li className="hover:text-blue-600 cursor-pointer">Home</li>
              <li className="hover:text-blue-600 cursor-pointer">About</li>
              <li className="hover:text-blue-600 cursor-pointer">Courses</li>
              <li className="hover:text-blue-600 cursor-pointer">Contact</li>
            </ul>
          </div>

          {/* RIGHT SIDE DESKTOP */}
          <div className="hidden md:flex space-x-4 items-center">

            {!token ? (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition"
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Signup
                </Link>
              </>
            ) : (
              <div className="relative">
                
                {/* Profile Icon */}
                <div
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center cursor-pointer font-bold"
                >
                  U
                </div>

                {/* Dropdown */}
                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg py-2 z-50">
                    
                    <div
                      onClick={() => {
                        navigate("/dashboard");
                        setProfileOpen(false);
                      }}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      Dashboard
                    </div>

                    <div
                      onClick={() => {
                        navigate("/profile");
                        setProfileOpen(false);
                      }}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      Profile
                    </div>

                    <div
                      onClick={logout}
                      className="px-4 py-2 hover:bg-red-100 text-red-600 cursor-pointer"
                    >
                      Logout
                    </div>

                  </div>
                )}
              </div>
            )}

          </div>

          {/* MOBILE MENU BUTTON */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700"
            >
              ☰
            </button>
          </div>
        </div>

        {/* MOBILE DROPDOWN */}
        {isOpen && (
          <div className="md:hidden mt-4 space-y-4">
            <ul className="space-y-2 font-medium text-gray-700">
              <li>Home</li>
              <li>About</li>
              <li>Courses</li>
              <li>Contact</li>
            </ul>

            {!token ? (
              <div className="flex flex-col space-y-3 pt-3">
                <Link
                  to="/login"
                  className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg text-center"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-center"
                >
                  Signup
                </Link>
              </div>
            ) : (
              <div className="flex flex-col space-y-3 pt-3">
                <button
                  onClick={() => navigate("/dashboard")}
                  className="px-4 py-2 bg-gray-100 rounded-lg"
                >
                  Dashboard
                </button>

                <button
                  onClick={() => navigate("/profile")}
                  className="px-4 py-2 bg-gray-100 rounded-lg"
                >
                  Profile
                </button>

                <button
                  onClick={logout}
                  className="px-4 py-2 bg-red-100 text-red-600 rounded-lg"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">

          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight mb-6">
              Learn New Skills <br />
              <span className="text-blue-600">Build Your Future</span>
            </h2>

            <p className="text-gray-600 text-lg mb-8">
              Join thousands of students learning modern skills like React,
              Node.js, Web Development, and more.
            </p>

            <div className="flex gap-4">
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg">
                Explore Courses
              </button>
              <button className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg">
                Watch Demo
              </button>
            </div>
          </div>

          <div className="flex justify-center">
            <img
              src="https://illustrations.popsy.co/gray/web-design.svg"
              alt="Learning Illustration"
              className="w-full max-w-md"
            />
          </div>
        </div>
      </section>

    </div>
  );
}
