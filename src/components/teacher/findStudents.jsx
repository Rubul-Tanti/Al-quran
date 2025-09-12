import { useQuery } from "@tanstack/react-query";
import { FiBookOpen, FiBookmark, FiClock } from "react-icons/fi";
import api from "../../utils/axios";
import Loader from "../loader";
import { Link, useParams } from "react-router-dom";


const CourseCard = ({ course }) => {

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition">
      {/* Header */}
      <div className="flex justify-between items-start">
        <Link to={`page/${course._id}`}><h2 className="text-lg font-semibold text-gray-800 hover:underline hover:text-blue-700 cursor-pointer">{course.title}</h2></Link>
        <button className="text-gray-500 hover:text-blue-600">
          <FiBookmark size={20} />
        </button>
      </div>



      {/* Description */}
      <p className="text-gray-600 text-sm mt-3 line-clamp-3">
        {course.description}
      </p>
      <p className="text-sm text-gray-500 font-semibold ">Budget : $ {course.budget}/hr</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-3">
      
          <span
            className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full"
          >
            {course.course}
          </span>
      </div>

      {/* CTA */}
      <div className="mt-4 flex justify-between items-center">
        <span className="text-gray-500 text-sm">Posted {new Date(course.postedAt).toLocaleDateString("en-US", {
  day: "2-digit",
  month: "short",
  year: "numeric"
})}</span>
        <p className="text-gray-600  text-sm mt-3 line-clamp-3">
        {course.postedBy.name}
      </p>
      </div>
    </div>
  );
};
const fetchPosts=async(page)=>{
 const limit=20
 const p=page?page:1
 const skip=(p-1)*limit
    try{
        const alljobs=await api.get(`/v1/fetchjobs/${skip}/${limit}`)
        return alljobs.data.data 
    }
    catch(e){
        console.log(e)
    }
}
const CourseList = () => {
    const {page}=useParams()
    console.log(page)
    const {data,loading,error}=useQuery({queryKey:["jobPost"],queryFn:()=>fetchPosts(page)})
    if(loading)return <Loader/>
    if(error)return<p>something went wrong</p>
    console.log(data)

if (data?.allposts?.length === 0) 
  return (
    <div className="bg-white h-1/3  text-blue-900 p-4 rounded-md shadow-md text-center">
      <div className="bg-gray-100 h-full w-full flex justify-center items-center font-semibold ">No jobs available</div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Search bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search Quran courses"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Tabs */}
      <div className="flex gap-6  mb-6 text-sm">
        <button className="border-b-2 border-blue-600 pb-2 font-medium text-blue-600">
          Best Matches
        </button>
        <button className="text-gray-500 hover:text-gray-700">Most Recent</button>
        <button className="text-gray-500 hover:text-gray-700">Saved</button>
      </div>

      {/* Course cards */}
      <div className="space-y-4">
        {data?.allposts?.map((course, idx) => (
          <CourseCard key={idx} course={course} />
        ))}
      </div>
    </div>
  );
};

export default CourseList;
