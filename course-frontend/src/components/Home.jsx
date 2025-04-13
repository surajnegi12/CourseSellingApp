import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { URL } from "../assets/assets";
const Home = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user);
  
  const images = [
    "https://images.pexels.com/photos/289738/pexels-photo-289738.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/4145197/pexels-photo-4145197.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=600",
  ];
  const [currentImage, setCurrentImage] = useState(0);
  useEffect(() => {
    async function fetchCourses() {
      try {
        const res = await axios.get(`${URL}/course/v1/preview`);
        setCourses(res.data.course);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCourses();
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 2000); 
  
    return () => clearInterval(interval); 
  }, []);

  async function handleBuyCourse(courseId) {
    if (!user.isAuthenticated) {
      toast.error("Please sign in to buy courses!");
      return;
    }

    try {
      await axios.post(
        `${URL}/course/v1/purchase`,
        { courseId },
        { headers: { token: user.token.token } }
      );
      toast.success("Course purchased successfully!");
    } catch (error) {
      console.error("Error purchasing course:", error);
      toast.error("Failed to purchase course!");
    }
  }
 async function handleDelete(courseId){
  try {
    await axios.delete(`${URL}/admin/v1/course/${courseId}`
    ,{headers:{token:user.token.token}}
    )
    toast.success("course deleted successfully")
setCourses((prevCourse)=>prevCourse.filter((c)=>c._id!=courseId));

  } catch (error) {
    toast.error("Failed to delete the course!");
  }

 }
  return (
    <div className="pt-24 px-4 bg-gray-900 min-h-screen text-white">
     <div className="relative w-full h-[400px] mb-10 rounded-2xl overflow-hidden ">
  <img
    src={images[currentImage]}
    alt="Learning"
    className="w-full h-full object-cover scale-105 transition-all duration-1000 opacity-70"
  />
  <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-cyan-900/30 flex flex-col justify-center items-center text-center px-6">
    <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.3)]">
      Unlock Your Potential
    </h1>
    <p className="mt-4 text-lg md:text-xl text-cyan-400 font-medium max-w-2xl drop-shadow-sm italic">
      "Invest in yourself — knowledge is the best return."
    </p>

  </div>
</div>
      <h2
        className="text-2xl  font-bold mt-7 mb-6 text-white flex justify-center"
        style={{ textShadow: "0 0 2px white, 0 0 4px white" }}
      >
        Available Courses
      </h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div
              key={course._id}
              className="bg-gray-800 mb-7 p-4 rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]"
            >
              <img
                src={course.imgUrl}
                alt={course.title}
                className="w-full h-65 object-cover rounded-md mb-2"
              />
              <h3 className="text-lg font-semibold text-white mb-1">
                {course.title}
              </h3>
              <p className="text-gray-300 mb-2">{course.description}</p>
              <p className="font-semibold text-white">₹{course.price}</p>
              {user.userinfo.role==="admin"?(<div> <button onClick={()=>handleDelete(course._id)} className="mt-3 bg-cyan-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-cyan-500 transition duration-300 shadow-md hover:shadow-cyan-500/30">
                  Delete
                </button></div>):(<div><button
                onClick={() => handleBuyCourse(course._id)}
                className="mt-3 mr-4 bg-cyan-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-cyan-500 transition duration-300 shadow-md hover:shadow-cyan-500/30"
              >
                Buy Course
              </button>
              <Link to={`/coursedetails/${course._id}`}>
                <button className="mt-3 bg-cyan-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-cyan-500 transition duration-300 shadow-md hover:shadow-cyan-500/30">
                  Details
                </button>
              </Link></div>)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
