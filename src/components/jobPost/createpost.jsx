import React, { useState } from "react";
import { useSelector } from "react-redux";
import api from "../../utils/axios";
import Loader from "../loader";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const defaultData = {
  title: "",
  description: "",
  course: "",
  language: "",
  budget: "",
  id: "",
  name: "",
};

const CreatePost = () => {
    const navigate=useNavigate()
  const [formData, setFormData] = useState(defaultData);
    const [loading,setLoading]=useState(false)
  const user = useSelector((state) => state.auth.user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async(e) => {
    try{e.preventDefault();
setLoading(true)
    const finalData = {
      ...formData,
      name: user?.persnalDetails?.fullName || "",
      id: user?._id || "",
      profilePic: user?.persnalDetails.profileImage|| "",
      socketId: user?.socketId|| "",
    };

    console.log(finalData);
    const res= await api.post("/v1/createjob", finalData);
   if(res.data.success){
    toast.success("created post successfully")
    navigate("/jobpost")
   }
    setFormData(defaultData);
    }catch(e){
    toast.error("something went wrong")    
    }
    finally{
        setLoading(false)
    }  
};

  return (
    <div className="bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-blue-900 mb-6 text-center">
          Create Job Post
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-900 focus:outline-none"
          />

          {/* Description */}
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            rows="3"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-900 focus:outline-none"
          />

          {/* Language */}
          <input
            type="text"
            name="language"
            value={formData.language}
            onChange={handleChange}
            placeholder="Language"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-900 focus:outline-none"
          />

          {/* Budget */}
          <div className="flex flex-row items-center gap-2">
            <input
              type="number"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              placeholder="Budget"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-900 focus:outline-none"
            />
            <p className="text-zinc-500 text-xl">USD/Hour</p>
          </div>

          {/* Course */}
          <select
            name="course"
            value={formData.course}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-900 focus:outline-none"
          >
            <option value="">Select a course</option>
            <option value="Hifz Course">Hifz Course</option>
            <option value="Tajweed Course">Tajweed Course</option>
            <option value="Arabic Course">Arabic Course</option>
            <option value="Noorani Qaida">Noorani Qaida</option>
          </select>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-900 text-white py-3 rounded-md font-semibold hover:bg-blue-800 transition"
          >
            {loading?<Loader variant="button"/>:"Create Post"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
