import React from 'react';
import { CiSearch } from "react-icons/ci";
import { GoBell } from "react-icons/go";
import webLogo from "../../../public/webLogo.png";
import defaultProfile from "../../assets/images/defaultprofile.png";
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="w-full sticky top-0  z-50 bg-white border-b border-zinc-100 px-4 py-3">
      <div className="max-w-7xl mx-auto">
        {/* TOP ROW: logo | (desktop search hidden on mobile) | icons */}
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <img src={webLogo} alt="Website Logo" className="h-8 md:h-10" />
            
          </div>

          {/* Desktop Search - visible on sm and above */}
        
          {/* Icons (Notifications + Profile) - stays top on mobile */}
          <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center border overflow-hidden border-zinc-200 h-10 rounded-lg px-3 ">
            <select
              aria-label="Filter courses"
              className=" outline-none md:w-16 text-sm font-medium text-gray-700 "
            >
              <option>All</option>
              <option>Hifz</option>
              <option>Tajweed Course</option>
              <option>Arabic Course</option>
              <option>Noorani Qaida</option>
            </select>

            <input
              type="text"
              aria-label="Search teachers"
              placeholder="Search Teacher..."
              className="flex-1 bg-gray-5 0 h-full  outline-none px-2 text-sm"
            />

            <CiSearch size={20} className="text-gray-500" />
          </div>
            <button
              type="button"
              className="flex items-center flex-col  px-2 py-1 rounded hover:bg-gray-50 transition"
              aria-label="Notifications"
            >
              <GoBell size={20} className="text-gray-700" />
              <span className="text-[9px] text-gray-700">Notifications</span>
            </button>

            <div className="flex flex-col items-center  px-2 py-1 rounded hover:bg-gray-50 transition cursor-pointer">
              <img
                src={defaultProfile}
                alt="Profile"
                className="h-9 w-9 rounded-full border border-gray-200 object-cover"
              />
              <span className="text-[9px] text-gray-700 hidden md:inline">Profile</span>
            </div>
          </div>
        </div>

        {/* MOBILE SEARCH: visible only on small screens, placed under top row */}
        <div className="mt-3 sm:hidden">
          <div className="flex items-center border border-zinc-200 h-10 rounded-lg px-3 w-full">
            <select
              aria-label="Filter courses (mobile)"
              className="bg-transparent w-16 outline-none text-sm font-medium text-gray-700 pr-2"
            >
              <option>All</option>
              <option>Hifz</option>
              <option>Tajweed Course</option>
              <option>Arabic Course</option>
              <option>Noorani Qaida</option>
            </select>

            <input
              type="text"
              aria-label="Search teachers (mobile)"
              placeholder="Search Teacher..."
              className="flex-1 bg-transparent w-full h-full outline-none px-2 text-sm"
            />

            <CiSearch size={20} className="text-gray-500" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
