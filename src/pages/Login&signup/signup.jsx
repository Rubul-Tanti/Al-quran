import React from 'react'
import { Outlet } from 'react-router-dom'
import webLogo from"../../../public/webLogo.png"
const Signup = () => {
  return (
    <div className="relative">
     <img alt="logo" src={webLogo}  className="absolute left-14 md:h-10 h-8 top-14" />
    <Outlet/>
    </div>
  )
}

export default Signup
