import React, { useEffect } from "react";
import Signup from "./components/Signup";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signin from "./components/Signin";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "./components/feature/userSlice";
import MyCourses from "./components/Mycourse";
import Footer from "./components/Footer";
import AboutUs from "./components/AboutUs";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CourseDetails from "./components/CourseDetails";
import AddCourse from "./components/AddCourse";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userInfo = localStorage.getItem("userInfo");

    if (token && userInfo) {
      dispatch(signin({ token, user: JSON.parse(userInfo) }));
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-gray-900 ">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/mycourses" element={<MyCourses />} />
            <Route path="/addcourse" element={<AddCourse/>}/>
            <Route
              path="/coursedetails/:courseId"
              element={<CourseDetails />}
            />
          </Routes>
        </main>
        <Footer />
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="dark"
      />
    </BrowserRouter>
  );
}

export default App;
