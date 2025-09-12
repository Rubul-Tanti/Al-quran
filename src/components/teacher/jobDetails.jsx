import { useQuery } from "@tanstack/react-query";
import React from "react";
import Loader from "../loader";
import api from "../../utils/axios";
import { Navigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useRef } from "react";
import { useSelector } from "react-redux";
export default function JobDetails() {
  const { id } = useParams();
  const proposal=useRef(null)
  const fetchJobDetails = async () => {
    const res = await api.post(`/v1/fetchJobDetails/${id}`);
    return res.data.data;
  };
  const user=useSelector(state=>state.auth.user)
 const sendProposal=async(e,{proposal})=>{
  e.preventDefault()
  const userId=user._id
  const username=user.persnalDetails.name
  const userImage=user.persnalDetails.profilePic

  try{const res=await api.post("/v1/job/sendproposal",{postId:id,userId,username,userImage,proposal})
if(res?.data.success){
  toast("sent proposal successfully")
  console.log(res.data.data)
} 
}
 catch(e){console.log(e)}
} 
const {
    data: job,
    isLoading,
    error,
  } = useQuery({ queryKey: ["jobDetails", id], queryFn: fetchJobDetails });

  if (isLoading) return <Loader />;
  if (error) {
    toast.error("Page not found");
    return <Navigate to={"/jobs"} />;
  }
console.log(job.postedBy.profilePic)
  const formattedDate = new Date(job.postedAt).toLocaleDateString();

  const handleProposalSubmit = (e) => {
    e.preventDefault();
    const proposalText = e.target.proposal.value.trim();

    if (!proposalText) {
      toast.error("Proposal cannot be empty");
      return;
    }

    // Send proposal API call
    toast.success("Proposal sent successfully!");
    e.target.reset();
  };

  return (
    <div className="min-h-screen bg-white text-blue-900 p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Job Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Job Title */}
          <h1 className="text-3xl font-bold">{job.title}</h1>
          <p className="text-sm text-blue-700">Posted on {formattedDate}</p>

          {/* Summary / Description */}
          <section>
            <h2 className="text-xl font-semibold mb-2">Summary</h2>
            <p className="leading-relaxed">{job.description}</p>
          </section>

          {/* Details */}
          <section>
            <h2 className="text-xl font-semibold mb-2">Details</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Course: {job.course}</li>
              <li>Language: {job.language}</li>
              <li>Budget: ${job.budget}</li>
            </ul>
          </section>

          {/* Activity */}
          <section>
            <h2 className="text-xl font-semibold mb-2">Activity on this job</h2>
            <p className="text-sm">Applicants: {job.applicants.length}</p>
            <p className="text-sm">Interviewing: {0}</p>
            <p className="text-sm">Invites sent: {0}</p>
          </section>

          {/* Proposal Section */}
          <section className="border-t border-blue-200 pt-6">
            <h2 className="text-xl font-semibold mb-4">Apply with a Proposal</h2>
            <form onSubmit={(e)=>{sendProposal(e,{proposal:proposal.current.value})}} className="space-y-4">
              <textarea
              ref={proposal}
                name="proposal"
                className="w-full border border-blue-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-900"
                rows="6"
                placeholder="Write your proposal here..."
                required
              ></textarea>
              <button
                type="submit"
                className="bg-blue-900 text-white cursor-pointer px-6 py-2 rounded-lg hover:bg-blue-800 transition"
              >
                Submit Proposal
              </button>
            </form>
          </section>
        </div>

        {/* Right Column - Sidebar */}
        <aside className="space-y-6">
          {/* About the client */}
          <div className="border border-blue-200 rounded-xl p-4">
            <h2 className="text-lg font-semibold mb-2">About the client</h2>
           <div> <p className="text-sm font-medium">{job.postedBy.name}</p> </div>
          </div>

          {/* Job link */}
          {/* Job link */}
<div className="border border-blue-200 rounded-xl p-4">
  <h2 className="text-lg font-semibold mb-2">Job link</h2>
  <div className="flex items-center gap-2">
    <input
      className="flex-1 border rounded px-2 py-1 text-sm"
      value={`https://yourwebsite.com/jobs/${job._id}`}
      readOnly
    />
    <button
      onClick={() => {
        navigator.clipboard.writeText(`https://yourwebsite.com/jobs/${job._id}`);
        toast.success("Job link copied!");
      }}
      className="bg-blue-900 cursor-pointer text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-800 transition"
    >
      Copy
    </button>
  </div>
</div>

        </aside>
      </div>
    </div>
  );
}
