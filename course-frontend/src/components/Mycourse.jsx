import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { URL } from "../assets/assets";

const MyCourses = () => {
  const user = useSelector((state) => state.user);
  
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchPurchasedCourses() {
      if (!user.isAuthenticated || !user.token?.token) {
        setLoading(false);
        return;
      }


      try {
        const res = await axios.get(`${URL}/user/v1/purchases`, {
          headers: { token: user.token.token },
        });

        setPurchasedCourses(res.data.course); 
      } catch (error) {
        console.error("Error fetching purchased courses:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPurchasedCourses();
  }, [user.isAuthenticated]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Purchased Courses</h2>
      {loading ? (
        <p>Loading...</p>
      ) : purchasedCourses.length === 0 ? (
        <p className=" text-white mt-8 text-xl">You haven't purchased any courses yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 ">
          {purchasedCourses.map((course) => (
            <div key={course._id} className="bg-gray-800 text-white mb-7 p-4 rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]">
              <img
                src={course.imgUrl}
                alt={course.title}
                className="w-full h-65  object-cover rounded-md mb-2"
              />
              <h3 className="text-lg font-bold">{course.title}</h3>
              <p>{course.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCourses;
