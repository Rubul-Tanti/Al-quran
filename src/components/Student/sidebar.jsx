import React from 'react';
import { CiLogout } from "react-icons/ci";
import { NavLink, useNavigate } from 'react-router-dom';
import { FiHome, FiSearch, FiMessageSquare, FiStar, FiCalendar, FiSettings } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import api from '../../utils/axios';

export default function Sidebar({ open }) {
  const navigate=useNavigate()
  const user=useSelector((state)=>state.auth.user)

    const studentMenu = [
    { name: "Dashboard", path: "/dashboard", icon: <FiHome /> },
    { name: "Find Teachers", path: "/find-teachers", icon: <FiSearch /> },
    { name: "Messages", path: "/messages", icon: <FiMessageSquare /> },
    { name: "Settings", path: "/settings", icon: <FiSettings /> },
    { name: "Job Post", path: "/jobpost", icon: <FiSettings /> },
  ];

  const teacherMenu = [
    { name: "Dashboard", path: "/dashboard", icon: <FiHome /> },
    { name: "Find Students", path: "/find-students", icon: <FiSearch /> },
    { name: "Messages", path: "/messages", icon: <FiMessageSquare /> },
    { name: "Settings", path: "/settings", icon: <FiSettings /> },
  ];

  const menuItems =user?.role==="student"?studentMenu:user?.role==="teacher"?teacherMenu:[]

  const logout=async()=>{
    try {
   const logoutobj=await api.post("v1/logout")
    console.log(logoutobj)
    localStorage.removeItem("accessToken");
      localStorage.clear();
  sessionStorage.clear();

    // Show success toast
    toast.success("Logged out successfully!", {
      position: "top-center",
    });

  } catch (error) {
    console.error("Logout error:", error);
    toast.error("Something went wrong during logout!");
  }finally{
    window.location.reload(true);
    navigate("/login");
  }
  }

  return (
    <aside
      className={`border-r border-gray-200 p-4 w-64 space-y-6 absolute sm:relative sm:translate-x-0 z-20 h-max bg-white ${
        open ? 'translate-x-0' : '-translate-x-full'
      } sm:translate-x-0 transition-transform `}
    >
      <nav className="flex relative flex-col gap-2">
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md hover:bg-blue-50 ${
                isActive ? 'bg-blue-50 text-blue-900' : 'text-gray-700'
              }`
            }
          >
            {item.icon} <span>{item.name}</span>
          </NavLink>
        ))}
        <button onClick={()=>{logout()}} className='text-blue-500 mt-5 items-center font-semibold cursor-pointer text-sm flex gap-2 '><CiLogout size={15}/>Log out</button>
      </nav>
    </aside>
  );
}
