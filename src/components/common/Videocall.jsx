import React, { useState, useRef, useEffect } from "react";
import { FiVideo, FiVideoOff, FiMic, FiMicOff, FiMonitor, FiSend, FiPhoneOff } from "react-icons/fi";
import { GrEmoji } from "react-icons/gr";
import { MdCallEnd } from "react-icons/md";
import { toast } from "react-toastify";
const Videocall = () => {
  const videoRef=useRef(null)
  useEffect(()=>{
navigator.mediaDevices.getUserMedia({video:true,audio:true}).then(stream=>{
const video=  document.querySelector("#videoContainer")
if(videoRef.current){
  videoRef.current.srcObject=stream
}
}).catch((e)=>{console.log(e.message)
  toast.error(e.message)
})
  },[])


  return (
  <div className="flex flex-row h-screen items-center ">
  <div className="bg-blue-50 p-5 h-screen  flex flex-row gap-5 w-[80%] ">
<div className="relative w-5/6"><div  className="absolute bg-zinc-950 p-5 flex flex-row gap-5 rounded-full bottom-10 left-1/2 -translate-x-1/2">
<FiMic size={25} className="text-white bg-zinc-800 h-10 rounded-full p-2 w-10 "/>
<FiVideo size={25} className="text-white bg-zinc-800 h-10 rounded-full p-2 w-10 "/>
<FiMonitor size={25} className="text-white bg-zinc-800 h-10 rounded-full p-2 w-10 "/>
<GrEmoji size={25} className="text-white bg-zinc-800 h-10 rounded-full p-2 w-10 "/>
<MdCallEnd size={25} className="text-white bg-red-800 h-10 rounded-full p-2 w-18 "/>
</div> <video ref={videoRef} className="w-full h-full rounded-xl  bg-black" /></div>
<div><div className="w-52 h-52  rounded-xl bg-blue-200 mb-5"></div><div className="w-52 h-52 rounded-xl bg-blue-200"></div></div>

  </div>
  <div className="w-[20%] h-[70vh] relative overflow-hidden bg-blue-100 m-2 rounded-2xl">
    <div className="h-12 text-center pt-2 text-white bg-blue-300 font-bold"> In Call Chat</div>
    <div className="absolute bottom-0 pb-5 pl-5 flex items-center "> <input className="outline-0 border border-blue-300 p-2 rounded-full" placeholder="message"/><button ><FiSend className="bg-blue-700 text-white h-10 w-10 p-2 rounded-lg"/></button></div>
     </div>
  </div >
  )
};

export default Videocall;
