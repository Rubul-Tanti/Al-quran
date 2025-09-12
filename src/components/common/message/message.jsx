import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import Loader from "../../loader";
import defaultProfileImage from "../../../assets/images/defaultprofile.png"

const Chat = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
   const {user,loading}=useSelector(state=>state.auth)
   const [Chat,setChat]=useState()
   if(loading)return<Loader/>
useEffect(()=>{
  setChat(user?.chats)
},[Chat])
  return (
    <div className="flex h-full  rounded-lg overflow-hidden shadow-lg">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "block" : "hidden"
        } md:block w-full md:w-1/3  border-r border-blue-50`}
      >
        <div className="flex-1 overflow-y-auto">
          {Chat?.map((contact) => (
            <Link to={contact.chatId}
              key={contact.chatId}
              className={` cursor-pointer  transition `}>
              <div className="flex justify-start font-sans text-sm text-zinc-600 border-b border-gray-200 p-4 items-center">
               <img src={contact.profilePic||defaultProfileImage} className="h-12 w-12 rounded-full"/> <p className="font-medium pl-5">{contact.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      {user&&<Outlet/>}
    </div>
  );
};

export default Chat;
