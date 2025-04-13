import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { URL } from "../assets/assets";

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const navigate = useNavigate();

  async function handleSignup() {
    try {
      await axios.post(`${URL}/user/v1/signup`, {
        email,
        password,
        firstName,
        lastName,
        role
      });
      navigate("/signin");
    } catch (error) {
      toast.error("Signup unsuccessful");
    }
  }

  return (
    <div className="pt-24 px-4 bg-gray-900 text-white min-h-[calc(100vh-64px-64px)] flex items-center justify-center">
      <div className="bg-white text-gray-800 p-6 rounded-2xl shadow-lg w-80">
        <div className="flex items-center justify-center gap-2 mb-5 text-3xl font-bold text-cyan-600">
          <span className="uppercase tracking-wide">Sign Up</span>
        </div>

        <input
          type="text"
          placeholder="First Name"
          className="w-full px-4 py-2 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          className="w-full px-4 py-2 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setPassword(e.target.value)}
        />
        <select
  value={role}
  onChange={(e) => setRole(e.target.value)}
  className="w-full px-4 py-2 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
>
  <option value="user">User</option>
  <option value="admin">Admin</option>
</select>
        <button
          onClick={handleSignup}
          className="w-full bg-cyan-600 mb-3 text-white py-2 rounded-lg hover:bg-cyan-700 transition duration-300 font-semibold"
        >
          Sign Up
        </button>

        <div className="text-sm text-gray-600 text-center">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="text-cyan-600 font-semibold hover:underline"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
