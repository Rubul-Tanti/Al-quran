import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "../../utils/axios";
import Loader from "../loader";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
const fetchJobDetails=async(id)=>{
    const res = await api.post(`/v1/fetchJobDetails/${id}`);
      return res.data.data
}

const EditPost = () => {
    const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // works like router.back()
  };
  const {id}=useParams()
  const {data,isLoading,error}=useQuery({queryKey:["editjobDetails"],queryFn:()=>fetchJobDetails(id)})   
     const [loading,setLoading]=useState(false)
const [formData, setFormData] = useState({
  id: "",
  title: "",
  description: "",
  course: "",
  language: "",
  budget: "",
});

useEffect(() => {
  if (data) {
    setFormData({
      id: data._id,
      title: data.title,
      description: data.description,
      course: data.course,
      language: data.language,
      budget: data.budget,
    });
  }
}, [data]);
if(isLoading){return <Loader/>}
 

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
    const res= await api.post("/v1/updatejob",formData);
    const data=res.data
        if(data.success){
            toast("edited Post")
            navigate(-1)
        }
    }catch(e){
    console.log(e)    
    }
    finally{
        setLoading(false)
    }  
};

  return (
    <div className="bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-md mt-5">
        <button onClick={()=>{goBack()}}><FaArrowLeft size={25}/></button>
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
            {loading?<Loader variant="button"/>:"Edit Post"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPost;
