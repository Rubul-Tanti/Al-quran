import { Link, useLocation } from "react-router-dom"
import webLogo from "../../../public/webLogo.png"
const nav = [{name:"Home",route:"/"},{ route: "/our-course", name: "Our Courses" }, { name: "Subcription Plans", route: "/subscription-plans" }]
const Header = () => {
  const { pathname } = useLocation()
  return (
    <nav className="flex items-center justify-between px-6 py-4 shadow-sm">
      <div className="flex items-center gap-8">
         <Link to={"/"}>
        <img src={webLogo}  alt="Logo" className="md:h-10 h-8" />
        </Link> 
      </div>
      <ul className="hidden md:flex gap-6 text-sm font-medium text-gray-700">
        {nav.map((route) => { return <Link to={route.route} key={route.name}> <li key={route.name} className={`hover:text-blue-500 cursor-pointer outline-0 ${pathname === route.route ? "text-blue-600 underline" : "text-black"}`}>  {route.name}</li> </Link> })}
      </ul>
      <div className="flex gap-4">
        <Link to="/login"><button className="border border-blue-500 text-blue-500 px-4 py-1.5 rounded-full hover:bg-blue-50">Log in</button></Link>
       <Link to ="/signup/role-selection"> <button className="bg-blue-900 text-white px-4 py-1.5 rounded-full hover:bg-blue-600">Sign Up</button></Link>
      </div>
    </nav>

  )
}

export default Header
