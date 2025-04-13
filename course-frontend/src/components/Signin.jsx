import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signin } from "./feature/userSlice";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { URL } from "../assets/assets";
function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleSignin() {
    try {
      const res = await axios.post(`${URL}/user/v1/signin`, {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userInfo", JSON.stringify(res.data.user));
      dispatch(signin({ token: res.data.token, user: res.data.user }));
      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      toast.error("Invalid credentials");
    }
  }

  return (
    <div className="pt-24 px-4 bg-gray-900 text-white min-h-[calc(100vh-64px-64px)] flex items-center justify-center">
      <div className="bg-white text-gray-800 p-6 rounded-2xl shadow-lg w-80">
        <div className="flex items-center justify-center gap-2 mb-5 text-3xl font-bold text-cyan-600">
          <span className="uppercase tracking-wide">Sign In</span>
        </div>
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
        <button
          onClick={handleSignin}
          className="w-full bg-cyan-600 mb-3 text-white py-2 rounded-lg hover:bg-cyan-700 transition duration-300 font-semibold"
        >
          Sign In
        </button>
        <div className="text-sm text-gray-600 text-center">
          Don&apos;t have an account?{" "}
          <Link
            to="/signup"
            className="text-cyan-600 font-semibold hover:underline"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signin;
