import React from 'react'

const Header = () => {
  return (
    <nav className="flex items-center justify-between px-6 py-4 shadow-sm">
  <div className="flex items-center gap-8">
    <img src="/logo.svg" alt="Logo" className="h-8" />
    <ul className="hidden md:flex gap-6 text-sm font-medium text-gray-700">
      <li className="hover:text-teal-500 cursor-pointer">Our Courses</li>
      <li className="hover:text-teal-500 cursor-pointer">Find Teachers</li>
      <li className="hover:text-teal-500 cursor-pointer">Find Students</li>
      <li className="hover:text-teal-500 cursor-pointer">Pricing</li>
      <li className="hover:text-teal-500 cursor-pointer">Blog</li>
    </ul>
  </div>
  <div className="flex gap-4">
    <button className="border border-teal-500 text-teal-500 px-4 py-1.5 rounded-full hover:bg-teal-50">Log in</button>
    <button className="bg-teal-500 text-white px-4 py-1.5 rounded-full hover:bg-teal-600">Sign Up</button>
  </div>
</nav>

  )
}

export default Header
