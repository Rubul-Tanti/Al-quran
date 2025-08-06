import { Link, useLocation } from "react-router-dom"
const nav = [{ route: "/our-course", name: "Our Courses" }, { name: "Subcription Plans", route: "/subscription-plans" }, { name: "Blog", route: "/blog" }]
const Header = () => {
  const { pathname } = useLocation()
  return (
    <nav className="flex items-center justify-between px-6 py-4 shadow-sm">
      <div className="flex items-center gap-8">
        <img src="/logo.svg" alt="Logo" className="h-8" />
      </div>
      <ul className="hidden md:flex gap-6 text-sm font-medium text-gray-700">
        {nav.map((route) => { return <Link to={route.route}> <li key={route.name} className={`hover:text-blue-500 cursor-pointer ${pathname === route.route ? "text-blue-600 underline" : "text-black"}`}>  {route.name}</li> </Link> })}
      </ul>
      <div className="flex gap-4">
        <button className="border border-blue-500 text-blue-500 px-4 py-1.5 rounded-full hover:bg-blue-50">Log in</button>
        <button className="bg-blue-900 text-white px-4 py-1.5 rounded-full hover:bg-blue-600">Sign Up</button>
      </div>
    </nav>

  )
}

export default Header
