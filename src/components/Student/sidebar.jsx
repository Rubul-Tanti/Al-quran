import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiHome, FiSearch, FiMessageSquare, FiStar, FiCalendar, FiSettings } from 'react-icons/fi';

export default function Sidebar({ open }) {
  const menuItems = [
    { name: 'Dashboard', path: '/student/dashboard', icon: <FiHome /> },
    { name: 'Find Teachers', path: '/student/find-teachers', icon: <FiSearch /> },
    { name: 'Messages', path: '/student/messages', icon: <FiMessageSquare /> },
    { name: 'My Bookings', path: '/student/mybooking', icon: <FiCalendar /> },
    { name: 'Saved Teachers', path: '/student/savedteachers', icon: <FiStar /> },
    { name: 'Settings', path: '/student/settings', icon: <FiSettings /> },
  ];

  return (
    <aside
      className={`border-r border-gray-200 p-4 w-64 space-y-6 absolute sm:relative sm:translate-x-0 z-20 h-max bg-white ${
        open ? 'translate-x-0' : '-translate-x-full'
      } sm:translate-x-0 transition-transform`}
    >
      <nav className="flex flex-col gap-2">
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
      </nav>
    </aside>
  );
}
