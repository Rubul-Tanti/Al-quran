import React from 'react'

const Header = () => {
  return (
    <nav class="flex items-center justify-between px-6 py-4 shadow-sm">
  <div class="flex items-center gap-8">
    <img src="/logo.svg" alt="Logo" class="h-8" />
    <ul class="hidden md:flex gap-6 text-sm font-medium text-gray-700">
      <li class="hover:text-teal-500 cursor-pointer">Our Courses</li>
      <li class="hover:text-teal-500 cursor-pointer">Find Teachers</li>
      <li class="hover:text-teal-500 cursor-pointer">Find Students</li>
      <li class="hover:text-teal-500 cursor-pointer">Pricing</li>
      <li class="hover:text-teal-500 cursor-pointer">Blog</li>
    </ul>
  </div>
  <div class="flex gap-4">
    <button class="border border-teal-500 text-teal-500 px-4 py-1.5 rounded-full hover:bg-teal-50">Log in</button>
    <button class="bg-teal-500 text-white px-4 py-1.5 rounded-full hover:bg-teal-600">Sign Up</button>
  </div>
</nav>

  )
}

export default Header
