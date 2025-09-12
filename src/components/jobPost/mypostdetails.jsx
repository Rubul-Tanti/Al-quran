import React, { useState } from "react";
import { useParams, Navigate, href, useNavigate, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "../../utils/axios";
import Loader from "../loader";
import { toast } from "react-toastify";
import { FiEdit } from "react-icons/fi";
const MyPostDetails = () => {
  const navigate=useNavigate()
  const { id } = useParams();
  const [loading,setloading]=useState(false)
   const handleClosePost = (id) => {
    toast.info(
      <div className="text-blue-900">
        <p className="font-semibold">Close Post</p>
        <p className="text-sm">Are you sure you want to close this post?</p>
        <div className="flex gap-3 mt-3">
          <button
            onClick={() => toast.dismiss()} // cancel action
            className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={async() => {
            const {data}= await api.post(`/v1/deletejob/${id}`)
            if(data.success){
              toast("post deleted successfully")
              navigate("/jobpost")
            }else{toast.error("internal server Error")}
              toast.dismiss();
            }}
            className="px-3 py-1 bg-blue-900 text-white rounded-lg hover:bg-blue-800"
          >
            Close Post
          </button>
        </div>
      </div>,
      {
        position: "bottom-center",
        className: "bg-blue-50 rounded-lg shadow-lg",
        autoClose: false, // stay until action
        closeOnClick: false,
        draggable: false,
        hideProgressBar: true,
      }
    );
  };

  const fetchMyJob = async () => {
    const res = await api.post(`/v1/fetchJobDetails/${id}`);
    return res.data.data;
  };

  const {
    data: job,
    isLoading,
    error,
  } = useQuery({ queryKey: ["myJob", id], queryFn: fetchMyJob });

  if (isLoading) return <Loader />;
  console.log(job)
  if (error) {
    toast.error("Job not found");
    return <Navigate to={"/jobpost"} />;
  }

  const formattedDate = new Date(job.postedAt).toLocaleDateString();

const notHire=async(proposalId )=>{
try{const jobId=job._id
  setloading(true)
const {data}=await api.post("/v1/job/proposal-delete",{proposalId,jobId})
if(data.success){
  toast("proposal deleted successfully")
  window.location.reload();
}
}catch(e){
console.log(e)
toast("something went wrong try again latter")
}
finally{setloading(false)}
}
const interview=async({teacherId,teacherName,teacherProfilePic})=>{
  try{const student={studentId:job.postedBy.id,studentName:job.postedBy.name,studentProfilePic:job.postedBy.profilePic}
const teacher={teacherId,teacherName,teacherProfilePic}
const {data}=await api.post("/v1/job/initialize-chat",{teacher,student})
if(data.success){
  navigate(`/messages/${data.data._id}`)
}  
}catch(e){
    console.log(e)
  }
}
  return (
    <div className="min-h-screen bg-gray-50 text-blue-900 p-8">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Job Header */}
        <header className="space-y-3">
         <div className="flex justify-between max-w-[500px]"> <h1 className="text-4xl font-bold">{job.title}</h1> <Link to={`/jobpost/edit/${job._id}`}><FiEdit size={20}/></Link></div>
          <p className="text-sm text-gray-600">Posted on {formattedDate}</p>
          <div className="flex flex-wrap gap-3 text-sm">
            <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800">
              ${job.budget} Budget
            </span>
            <span className="px-3 py-1 rounded-full bg-green-100 text-green-800">
              {job.course}
            </span>
            <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-800">
              {job.language}
            </span>
          </div>
        </header>

        {/* Description */}
        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">Job Description</h2>
          <p className="leading-relaxed text-gray-700">{job.description}</p>
        </section>

        {/* Proposals */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">
            Proposals ({job.applicants?.length || 0})
          </h2>

          {job.applicants?.length > 0 ? (
            <ul className="space-y-6">
              {job.applicants.map((proposal, idx) => (
                <li key={idx} className="p-4 rounded-xl bg-gray-100">
                  <div >
                    <div >
                      <div className="flex h-12 items-center  gap-5">
                      <img className="text-sm h-8 w-8 rounded-full object-cover shadow-sm shadow-gray-200 mb-2"
                        src={proposal.profilePic}/>
                       <Link to={`/find-teachers/${proposal.id}`}><p className="font-semibold hover:underline cursor-pointer text-lg">
                        {proposal.name}
                      </p></Link>
                        </div>
                      <p className="text-sm mt-2 ml-5 leading-relaxed text-gray-700">
                        {proposal.proposal}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex mt-8  gap-2 ml-6">
                      <button onClick={()=>{interview({teacherId:proposal.id,teacherName:proposal.name,teacherProfilePic:proposal.profilePic})}}className="px-4 py-1 rounded-full underline cursor-pointer text-yellow-800 hover:bg-yellow-200 text-sm">
                        Interview
                      </button>
                      <button className="px-4 py-1 rounded-full underline text-green-800 hover:bg-green-200 text-sm">
                        Hire
                      </button>
                      <button onClick={()=>{notHire(proposal._id)}} className="px-4 py-1 rounded-full underline text-red-800 hover:bg-red-200 text-sm">
                        Not Hire
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-600">No proposals yet.</p>
          )}
        </section>

        {/* Job Link */}
        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">Job link</h2>
          <div className="flex items-center gap-3">
            
            <input
              className="flex-1 rounded-lg px-3 py-2 text-sm bg-gray-100 text-gray-700"
              value={`https://yourwebsite.com/jobs/${job._id}`}
              readOnly
            />
            <button
              onClick={() => {
                navigator.clipboard.writeText(
                  `https://yourwebsite.com/jobs/${job._id}`
                );
                toast.success("Job link copied!");
              }}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 text-sm"
            >
              Copy
            </button>
          </div>
        </section>
      </div>
      <button onClick={()=>{handleClosePost(job._id)}} className="bg-red-700 text-white font-semibold text-lg py-2 px-3 rounded-lg mt-5 cursor-pointer">Delete</button>
    </div>
  );
};

export default MyPostDetails;
