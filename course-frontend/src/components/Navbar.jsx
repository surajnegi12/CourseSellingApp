import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "./feature/userSlice";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  function logOutHandler() {
    localStorage.removeItem("token");
    dispatch(signout());
    navigate("/");
    toast.success("logout successfull")
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-lg border-b border-white/20">
      <Link
        to="/"
        className="text-xl font-bold tracking-wide text-white hover:text-cyan-400 transition duration-300"
      >
        Course Platform
      </Link>

      {user.isAuthenticated ? (
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-gray-200 bg-gray-800 px-3 py-1 rounded-full shadow-sm">
            Welcome, {user.userinfo?.firstName}
          </span>
          {user.userinfo.role==="admin"?(<div><Link to="/addcourse">
            <button className="bg-cyan-600 text-white font-semibold py-1 px-4 rounded-xl hover:bg-cyan-500 transition">
              Add Course
            </button>
          </Link></div>):(<Link to="/mycourses">
            <button className="bg-cyan-600 text-white font-semibold py-1 px-4 rounded-xl hover:bg-cyan-500 transition">
              My Courses
            </button>
          </Link>)}
          <button
            onClick={logOutHandler}
            className="bg-red-600 hover:bg-red-500 font-semibold text-white py-1 px-4 rounded-xl transition"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex gap-4">
          <Link to="/signup">
            <button className="bg-cyan-600 text-white font-semibold py-1 px-4 rounded-xl hover:bg-cyan-500 transition">
              Sign Up
            </button>
          </Link>
          <Link to="/signin">
            <button className="bg-cyan-600 text-white font-semibold py-1 px-4 rounded-xl hover:bg-cyan-500 transition">
              Sign In
            </button>
          </Link>
          <Link to="/about">
            <button className="bg-cyan-600 text-white font-semibold py-1 px-4 rounded-xl hover:bg-cyan-500 transition">
              About Us
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
