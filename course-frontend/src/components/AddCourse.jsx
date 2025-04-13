import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { URL } from "../assets/assets";
export default function AddCourse() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    imgUrl: "",
  });
  
const user=useSelector((state)=>state.user);
console.log(user)
const navigate=useNavigate();
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token")

    try {
      const response = await axios.post(
        `${URL}/admin/v1/course`,
        formData,
        {
          headers: {
            token: token,
          },
        }
      );
    toast.success("course added successfully")
      setFormData({
        title: "",
        description: "",
        price: "",
        imgUrl: "",
      });
      navigate("/")

    } catch (error) {
     toast.error("something went wrong")
    }
  };

  return (
   <div className="mt-25"> 
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
   <h2 className="text-2xl font-bold mb-6 text-center">Add New Course</h2>
   <form onSubmit={handleSubmit} className="space-y-4">
     <input
       type="text"
       name="title"
       value={formData.title}
       onChange={handleChange}
       placeholder="Course Title"
       className="w-full border rounded-xl px-4 py-2"
       required
     />
     <textarea
       name="description"
       value={formData.description}
       onChange={handleChange}
       placeholder="Course Description"
       className="w-full border rounded-xl px-4 py-2"
       required
     />
     <input
       type="number"
       name="price"
       value={formData.price}
       onChange={handleChange}
       placeholder="Price"
       className="w-full border rounded-xl px-4 py-2"
       required
     />
     <input
       type="text"
       name="imgUrl"
       value={formData.imgUrl}
       onChange={handleChange}
       placeholder="Image URL"
       className="w-full border rounded-xl px-4 py-2"
     />
     <button
       type="submit"
       className="w-full bg-cyan-600 text-white py-2 rounded-xl hover:bg-cyan-500"
     >
       Add Course
     </button>
   </form>
 </div></div>
  );
}