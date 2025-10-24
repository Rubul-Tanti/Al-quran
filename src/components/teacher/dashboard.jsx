import React, { useEffect,useState } from "react";
import { FiBriefcase, FiClock, FiMessageSquare, FiStar, FiX } from "react-icons/fi";
import { BsCheckCircle } from "react-icons/bs";
import { FaBookOpen, FaClock, FaAward, FaUserGraduate, FaChalkboardTeacher } from "react-icons/fa";
import { useSelector } from "react-redux";
import { FaBookQuran } from "react-icons/fa6";
import { SiConcourse } from "react-icons/si";
import { GiFinishLine } from "react-icons/gi";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import fetchUser from "../../services/fetchUser";
import Loader from "../loader";
import { aproveClass, fetchClasses } from "../../services/class";
import { toast } from "react-toastify";
import api from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import { isBefore, startOfDay, differenceInDays } from "date-fns";

const TeacherDashboard = () => {
  const navigate=useNavigate()
  const queryClient=useQueryClient()
  const user = useSelector((state) => state.auth.user);
  const {data:response,isLoading,isError}=useQuery({queryKey:["classes"],queryFn:()=>fetchClasses({id:user._id,role:user.role})})
  const [isHiring,setIsHiring]=useState([])
  const [isOngoing,setIsGoing]=useState([])
  const [isCompleted,setIsCompleted]=useState([])

useEffect(()=>{
  if(!isLoading){
    const data=response.data
    const hiring=data.filter(i=>i.status=="hiring")||[]
    const completed=data.filter(i=>i.status=="completed")||[]
    const ongoing=data.filter(i=>i.status=="ongoing")||[]
    const todayClass=[]
    setIsHiring(hiring)
    setIsCompleted(completed)
    setIsGoing(ongoing)
  }
},[response])
const handleAproveClass=async(classId)=>{
  try{
const response=await aproveClass({userId:user._id,classId:classId})
if(response.success){
  toast.success("aproved")
  queryClient.invalidateQueries({queryKey:['classess']})
}}
catch(e){
  console.log(e)
  toast.error("something went wrong")
}
}
const handleRequestChages=async(props)=>{
try{
  const {data}=await api.post('/v1/request-changes-class',props)
  if(data.success){
    navigate(`/messages/chat/${data.data}`)
  }
}catch(e){
  throw new ApiError(e)}
}
const handleMessage=(studentId
)=>{
  const chatRoom=user.chats.find(i=>i.id==studentId)
  navigate(`/messages/chat/${chatRoom.chatId}`)
}
if(isLoading)return<Loader/>
  return (
    <div className="p-4 md:p-6 bg-zinc-50 min-h-screen w-full">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-700 flex items-center gap-2">
          <FaBookOpen className="text-blue-400" />
          Teacher Dashboard
        </h1>
        <p className="text-sm text-zinc-500 mt-1">Manage your classes and track student progress</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white border border-zinc-200 p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <FaUserGraduate className="text-blue-400 text-2xl" />
            </div>
            <div>
              <p className="text-2xl font-bold text-zinc-700">{user?.currentStudents?.length || 0}</p>
              <p className="text-sm text-zinc-500">Active Students</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-zinc-200 p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <FaChalkboardTeacher className="text-blue-400 text-2xl" />
            </div>
            <div>
              <p className="text-2xl font-bold text-zinc-700">{user?.todayClass?.length || 0}</p>
              <p className="text-sm text-zinc-500">Today's Classes</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-zinc-200 p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <FaAward className="text-blue-400 text-2xl" />
            </div>
            <div>
              <p className="text-2xl font-bold text-zinc-700">{user?.ratting || "N/A"}</p>
              <p className="text-sm text-zinc-500">Average Rating</p>
            </div>
          </div>
        </div>
      </div>

      {/* Today's Classes */}
       {/* Today's Classes Section */}
       <div className="bg-white p-5 border border-zinc-200 rounded-xl shadow-sm mb-6">
         <div className="flex items-center gap-2 mb-4">
           <div className="p-2 bg-blue-50 rounded-lg">
             <FaBookQuran className="text-blue-400" size={18} />
           </div>
           <h2 className="text-lg font-semibold text-zinc-700">Today's Classes</h2>
         </div>
 
         {[]?.length > 0 ? (
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
             {[].map((cls, i) => (
               <div
                 key={i}
                 className="bg-zinc-50 border border-zinc-200 p-4 rounded-xl hover:shadow-md transition-shadow"
               >
                 <div className="flex items-center gap-3 mb-3">
                   <img
                     src={cls.img}
                      alt={cls.teacher}
                     className="w-12 h-12 rounded-full border-2 border-zinc-200 object-cover"
                   />
                   <div className="flex-1 min-w-0">
                     <p className="font-medium text-zinc-700 text-sm truncate">{cls.teacher}</p>
                     <p className="text-xs text-zinc-500">{cls.time}</p>
                   </div>
                 </div>
                 <p className="text-sm text-zinc-600 font-medium truncate">{cls.name}</p>
               </div>
             ))}
           </div>
         ) : (
           <div className="text-center py-8">
             <div className="inline-flex items-center justify-center w-12 h-12 bg-zinc-100 rounded-full mb-3">
               <FaClock className="text-zinc-400" size={20} />
             </div>
             <p className="text-sm text-zinc-500">No classes scheduled for today</p>
           </div>
         )}
       </div>
 
       {/* Ongoing Courses */}
       <div className="bg-white p-5 border border-zinc-200 rounded-xl shadow-sm mb-6">
         <div className="flex items-center gap-2 mb-4">
           <div className="p-2 bg-blue-50 rounded-lg">
             <SiConcourse className="text-blue-400" size={20} />
           </div>
           <h2 className="text-lg font-semibold text-zinc-700">Ongoing Courses</h2>
         </div>
 
         {isOngoing?.length > 0 ? (
           <div className="space-y-4">
             {isOngoing.map((course, i) =>
             {

const startDate = new Date(course.startingDate);
const now = new Date();
        const hasStarted =
  isBefore(startOfDay(startDate), startOfDay(now)) ||
  startOfDay(startDate).getTime() === startOfDay(now).getTime();

const daysLeft = differenceInDays(startOfDay(startDate), startOfDay(now));
              return<div
                key={i}
                className={`rounded-2xl p-5 transition-colors border border-zinc-50 ${
                  hasStarted ? "bg-white" : "bg-zinc-300"
                }`}
              >
                <div className="flex flex-col lg:flex-row justify-between gap-6">
                  {/* Left: Course Info */}
                  <div className="flex-1 space-y-2">
                   <div className="flex justify-between"> <h3 className="font-semibold text-lg text-black">
                      {course.subject}
                      </h3>
                        <div
                      className={`inline-flex items-center gap-2 text-sm mt-2 ${
                        hasStarted
                          ? "text-black bg-zinc-100"
                          : "text-zinc-700 bg-zinc-50"
                      } px-3 py-1 rounded-full`}
                    >
                      <FiClock size={14} />
                      {!hasStarted&&`Will start in ${daysLeft} day${
                            daysLeft !== 1 ? "s" : ""
                          }`}
                    </div>
</div>
                    <p className="text-sm text-zinc-600">
                      <span className="font-medium">Class Time:</span>{" "}
                      {course.classTime.start} – {course.classTime.end}
                    </p>

                    <p className="text-sm text-zinc-600">
                      <span className="font-medium">Days:</span>{" "}
                      {course.classDays.join(", ")}
                    </p>

                    <p className="text-sm text-zinc-600">
                      <span className="font-medium">Per Month Rate:</span> $
                      {course.perMonthRate}
                    </p>

                    <p className="text-sm text-zinc-600">
                      <span className="font-medium">Total Sessions:</span>{" "}
                      {course.sessions?.length || 0}
                    </p>

                  
                  </div>

                  {/* Right: Teacher Info */}
                  <div className="flex items-center gap-4">
                    <img
                      src={course.student.profilePic}
                      alt={course.student.name}
                      className="w-16 h-16 rounded-full border border-zinc-400 object-cover"
                    />
                    <div>
                      <p className="font-semibold text-black text-sm">
                        {course.student.name}
                      </p>
                      <button onClick={()=>{handleMessage(course.student.id)}} className="mt-2 px-3 py-1.5 bg-black text-white rounded-full flex items-center gap-1.5 text-xs hover:bg-zinc-800 transition-colors">
                        <FiMessageSquare size={14} />
                        Message
                      </button>
                    </div>
                  </div>
                </div>
              </div>
})}
           </div>
         ) : (
           <div className="text-center py-8">
             <div className="inline-flex items-center justify-center w-12 h-12 bg-zinc-100 rounded-full mb-3">
               <FaBookOpen className="text-zinc-400" size={20} />
             </div>
             <p className="text-sm text-zinc-500">No ongoing courses at the moment</p>
           </div>
         )}
       </div>
 
       {/* Completed Courses */}
       <div className="bg-white p-5 border border-zinc-200 rounded-xl shadow-sm">
         <div className="flex items-center gap-2 mb-4">
           <div className="p-2 bg-blue-50 rounded-lg">
             <GiFinishLine className="text-blue-400" size={20} />
           </div>
           <h2 className="text-lg font-semibold text-zinc-700">Completed Courses</h2>
         </div>
 
         {isCompleted.length > 0 ? (
           <div className="space-y-3">
             {isCompleted.map((course, i) => (
               <div
                 key={i}
                 className="border border-zinc-200 p-4 rounded-lg flex justify-between items-center hover:bg-zinc-50 transition-colors"
               >
                 <div>
                   <p className="font-medium text-zinc-700">{course.name}</p>
                   <p className="text-xs text-zinc-500 mt-1">
                     Completed on {new Date(course.completedOn).toLocaleDateString('en-US', { 
                       year: 'numeric', 
                       month: 'long', 
                       day: 'numeric' 
                     })}
                   </p>
                 </div>
                 <div className="flex items-center justify-center w-8 h-8 bg-green-50 rounded-full">
                   <BsCheckCircle className="text-green-500" size={18} />
                 </div>
               </div>
             ))}
           </div>
         ) : (
           <div className="text-center py-8">
             <div className="inline-flex items-center justify-center w-12 h-12 bg-zinc-100 rounded-full mb-3">
               <FaAward className="text-zinc-400" size={20} />
             </div>
             <p className="text-sm text-zinc-500">No courses completed yet</p>
           </div>
         )}
  
       </div>
  <div className="bg-white p-5 border mt-5 border-zinc-200 rounded-xl shadow-sm">
         <div className="flex items-center gap-2 mb-4">
           <div className="p-2 bg-blue-50 rounded-lg">
             <GiFinishLine className="text-blue-400" size={20} />
           </div>
           <h2 className="text-lg font-semibold text-zinc-700">In Hiring Process</h2>
         </div>
 
              {isHiring.length > 0 ? (
   <div className="space-y-3">
     {isHiring.map((hiring, i) => (
       <div
         key={i}
         className="border relative text-sm border-zinc-200 p-4  rounded-lg flex max-w-52 items-center hover:bg-zinc-50 transition-colors"
       >
   
         <div className="flex-1">
       <div className="mb-2">
         <p className="text-sm text-zinc-500">Student Name</p>
         <p className="font-medium text-zinc-700">{hiring.student.name}</p>
       </div>
 
       <div className="mb-2">
         <p className="text-sm text-zinc-500">Per Month Rate</p>
         <p className="text-xs text-zinc-700">{hiring.perMonthRate}</p>
       </div>
 
       <div className="mb-2">
         <p className="text-sm text-zinc-500">Subject</p>
         <p className="text-xs text-zinc-700">{hiring.subject}</p>
       </div>
 
       <div className="mb-2">
         <p className="text-sm text-zinc-500">Starting Date</p>
         <p className="text-xs text-zinc-700">{new Date(hiring.startingDate).toLocaleDateString()}</p>
       </div>
 
       <div className="mb-2">
         <p className="text-sm text-zinc-500">Class Time Start</p>
         <p className="text-xs text-zinc-700">{hiring.classTime.start}</p>
       </div>
 
       <div>
         <p className="text-sm text-zinc-500">Class Time End</p>
         <p className="text-xs text-zinc-700">{hiring.classTime.end}</p>
       </div>
       <div className="flex items-center gap-2"><button onClick={()=>{handleAproveClass(hiring._id)}} className="p-2 text-sm rounded-lg border border-zinc-200 bg-green-600 cursor-pointer text-white">Aprove</button>
       <button onClick={()=>{handleRequestChages({studentId:hiring.student.id,teacherId:hiring.teacher.id})}} className="p-2 text-sm text-zinc-500 rounded-lg border border-zinc-200 cursor-pointer  hover:bg-black hover:text-white transition-all ease-in duration-300
       
       ">Request Changes</button></div>
         </div>
       </div>
     ))}
   </div>
 ) : (
   <div className="text-center py-8">
     <div className="inline-flex items-center justify-center w-12 h-12 bg-zinc-100 rounded-full mb-3">
       <FiBriefcase className="text-zinc-400" size={20} />
     </div>
     <p className="text-sm text-zinc-500">No hiring processes yet</p>
   </div>
 )}</div>
    </div>
  );
};

export default TeacherDashboard;