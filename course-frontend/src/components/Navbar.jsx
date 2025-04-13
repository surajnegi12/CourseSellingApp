import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "./feature/userSlice";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  function logOutHandler() {
    localStorage.removeItem("token");
    dispatch(signout());
    navigate("/");
    toast.success("Logout successful");
    setMenuOpen(false);
  }

  const navLinkStyle =
    "text-white hover:underline underline-offset-8 transition";

  return (
    <nav className="bg-gray-900 text-white shadow-md border-b border-white/10 fixed w-full z-50">
      <div className="w-full py-3 px-2 flex items-center">
        <Link
          to="/"
          className="text-xl font-bold tracking-wide hover:text-cyan-400 transition"
        >
          Course Platform
        </Link>

        {/* Desktop Menu */}
        <div className="hidden sm:flex gap-8 items-center ml-auto mr-6">
          <Link to="/">
            <span className={navLinkStyle}>Home</span>
          </Link>

          {user.isAuthenticated ? (
            <>
              <span className="text-sm bg-gray-800 px-3 py-1 rounded-full">
                Hello, {user.userinfo?.firstName}
              </span>
              {user.userinfo.role === "admin" ? (
                <Link to="/addcourse">
                  <span className={navLinkStyle}>Add Course</span>
                </Link>
              ) : (
                <Link to="/mycourses">
                  <span className={navLinkStyle}>My Courses</span>
                </Link>
              )}
              <button
                className="text-red-400 hover:text-red-300 hover:underline underline-offset-8 transition"
                onClick={logOutHandler}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/signup">
                <span className={navLinkStyle}>Sign Up</span>
              </Link>
              <Link to="/signin">
                <span className={navLinkStyle}>Sign In</span>
              </Link>
              <Link to="/about">
                <span className={navLinkStyle}>About Us</span>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="sm:hidden ml-auto">
          <button
            className="focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <div className="w-6 h-0.5 bg-white mb-1"></div>
            <div className="w-6 h-0.5 bg-white mb-1"></div>
            <div className="w-6 h-0.5 bg-white"></div>
          </button>
        </div>
      </div>

      {/* Mobile Menu  */}
      {menuOpen && (
        <div className="sm:hidden px-4 pb-3 flex flex-col gap-3 bg-gray-800 items-center text-center">
          <Link to="/" onClick={() => setMenuOpen(false)}>
            <span className={navLinkStyle}>Home</span>
          </Link>

          {user.isAuthenticated ? (
            <>
              <span className="text-sm bg-gray-700 text-center px-3 py-1 rounded-full">
                Hello, {user.userinfo?.firstName}
              </span>
              {user.userinfo.role === "admin" ? (
                <Link to="/addcourse" onClick={() => setMenuOpen(false)}>
                  <span className={navLinkStyle}>Add Course</span>
                </Link>
              ) : (
                <Link to="/mycourses" onClick={() => setMenuOpen(false)}>
                  <span className={navLinkStyle}>My Courses</span>
                </Link>
              )}
              <button
                className="text-red-400 hover:text-red-300 hover:underline underline-offset-8 transition text-left"
                onClick={logOutHandler}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/signup" onClick={() => setMenuOpen(false)}>
                <span className={navLinkStyle}>Sign Up</span>
              </Link>
              <Link to="/signin" onClick={() => setMenuOpen(false)}>
                <span className={navLinkStyle}>Sign In</span>
              </Link>
              <Link to="/about" onClick={() => setMenuOpen(false)}>
                <span className={navLinkStyle}>About Us</span>
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
