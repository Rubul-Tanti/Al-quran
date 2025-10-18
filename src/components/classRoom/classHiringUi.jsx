import React, { useState } from 'react';
import { BsCalendar2Date } from "react-icons/bs";
import { MdAttachMoney } from "react-icons/md";
import { 
  FiCalendar as Calendar, 
  FiClock as Clock, 
  FiMessageSquare as MessageSquare, 
  FiCheckCircle as CheckCircle, 
  FiCircle as Circle, 
  FiArrowRight as ArrowRight 
} from 'react-icons/fi';
import { PiStudentThin } from "react-icons/pi";
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import api from '../../utils/axios';
const ClassHiringUI = () => {

  const [page,setPage]=useState("details")

  const [Proposal, setProposal] = useState({
    classDays: [],
    classTime: '',
    studentName:"",
    subject: 'Mathematics',
    perHourRate: '',
    startingDate: '',
  });
  const now= new Date();
  const [finalProposal, setFinalProposal] = useState({
    classDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday' ],
    classTime: '5:00',
    studentName:"",
    subject: 'Mathematics',
    perHourRate: '',
    startingDate:now.toLocaleDateString(),
  });

  const handleChange=(e)=>{
    e.preventDefault()
    const label=e.target.id
    setProposal(item=>({...item,[label]:e.target.value}))
  }

  const setDays=(e)=>{
    e.preventDefault()
    const day=e.target.textContent
    if(Proposal.classDays.includes(day)){
      setProposal(item=>({...item,classDays:item.classDays.filter(d=>d!==day)}))
    }else{
      setProposal(item=>({...item,classDays:[...(item.classDays||[]),day]}))
    }
  }

  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const {jobId,proposalId}=useParams()
console.log(jobId,proposalId)
const {data,isLoading,isError}=useQuery({queryKey:"proposal",queryFn:async()=>{const res= await api.post("/get-proposal-detail",{proposalId,jobId})
return res.data
}})


  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">Class Hiring Process</h1>
          <p className="text-gray-600">Follow the steps to complete your class booking</p>
        </div>

            {page==="editDetails"?<div className="space-y-6">
      

              <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-black">Teacher:</h3>
                  <span className="px-3 py-1 bg-blue-400 text-white text-xs font-semibold rounded-full">
                
                  </span>
                </div>
                           <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <PiStudentThin className="w-5 h-5 text-blue-400" />
                      <p className="font-semibold text-black">Student Name</p>
                    </div>
                    <div className="ml-7 space-y-1">
                              <p className='text-zinc-700'>Rubul</p>
                    </div>
                  </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-5 h-5 text-blue-400" />
                      <p className="font-semibold text-black">Class Days</p>
                    </div>
                    <div className="ml-7 space-y-1 flex flex-row gap-2 flex-wrap">
                {weekDays.map((days,i)=><button onClick={setDays} className={`border-zinc-300 text-sm h-[30px] border rounded-lg flex items-center px-2 ${Proposal.classDays.includes(days)?"bg-black text-white":"bg-white text-zinc-400"} `}>{days}</button>)}
                    </div>
                  </div>  
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-5 h-5 text-blue-400" />
                      <p className="font-semibold text-black">Class Time (UTC)</p>
                    </div>
                    <input id='classTime' className='border border-zinc-500 rounded-lg p-2 outline-0 text-zinc-400' onChange={handleChange} value={Proposal.classTime} type='time'/>
                  </div>
                </div>
              <div className='flex flex-row justify-between gap-5'>
                <div className="bg-white flex-1 border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <BsCalendar2Date className="w-5 h-5 text-blue-400" />
                    <p className="font-semibold text-black">Starting Date</p>
                  </div>
               <input id='startingDate' className='border-zinc-400 border text-zinc-500 outline-0 rounded-lg p-2' onChange={handleChange} value={Proposal.startingDate} type="date"/>
                </div>

                <div className="bg-white border flex-1 border-gray-200 rounded-lg p-4">
            
                  <p className="font-semibold text-black flex items-center mb-2"><MdAttachMoney className='text-green-600' size={30}/>Per Hour Rate</p>
                  <p className="text-2xl font-bold text-green-400">
                    <input id='perHourRate'  onChange={handleChange} value={Proposal.perHourRate} className={`max-w-[calc(55px)] border border-green-200 outline-0 rounded-lg  `} type='number' /> <span className="text-sm font-normal text-gray-500">per hour</span>
                  </p>
                </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() =>{setPage('details')}}
                  className="flex-1 bg-white border-2 border-gray-200 hover:border-gray-300 text-black font-semibold py-4 rounded-lg transition-colors"
                >
                  cancel
                </button>
                <button
                  onClick={() => alert('Class approved and created successfully!')}
                  className="flex-1 bg-blue-400 hover:bg-blue-500 text-white font-semibold py-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  Save
                </button>
              </div>

              <p className="text-center text-sm text-gray-500 mt-4">
                By approving, you agree to the terms and will be charged according to the rate above.
              </p>
            </div>:
           <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-black">Teacher:</h3>
                  <span className="px-3 py-1 bg-blue-400 text-white text-xs font-semibold rounded-full">
                subject
                  </span>
                </div>
                  <div className='flex flex-row gap-2'><p>Student Name:</p> <p className='text-sm text-zinc-600'>{finalProposal.studentName}</p></div>
                  <div className='flex flex-row gap-2'><p>Class Days:</p>   <p className='text-sm text-zinc-600 flex gap-2 flex-wrap'>{finalProposal.classDays.map((day,i)=><p key={i}>{day}</p>)}</p></div>
                  <div className='flex flex-row gap-2'><p>Class Time :</p>  <p className='text-sm text-zinc-600'>{finalProposal.classTime}</p></div>
                  <div className='flex flex-row gap-2'><p>Starting Date:</p><p className='text-sm text-zinc-600'>{finalProposal.startingDate}</p></div>
                  <div className='flex flex-row gap-2'><p>Per Hour Rate:</p><p className='text-sm text-zinc-600'>{finalProposal.perHourRate}</p></div>
                  
              <div className="flex gap-4">
                <button
                  onClick={() =>setPage('editDetails')}
                  className="flex-1 bg-white border-2 border-gray-200 hover:border-gray-300 text-black font-semibold py-4 rounded-lg transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => alert('Class approved and created successfully!')}
                  className="flex-1 bg-blue-400 hover:bg-blue-500 text-white font-semibold py-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-5 h-5" />
                   Create Class
                </button>
              </div>

              </div>}
        

      </div>
    </div>
  );
};

export default ClassHiringUI;