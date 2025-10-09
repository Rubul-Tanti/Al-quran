import React from "react";
import loginImage from "../../assets/images/loginimage.png";
import { FcGoogle } from "react-icons/fc";
import  { loginSuccess } from "../../Redux/slices/authSlice"
  import { ToastContainer, toast } from 'react-toastify';
import webLogo from "../../../public/webLogo.png";
import { Link } from "react-router-dom";
import { useState,useRef } from "react";
import login from "../../services/login";
import { useDispatch } from "react-redux";
import Loader from "../../components/loader";
const Login = () => {
  const [loading,setLoading]=useState(false)
  const dispatch=useDispatch()
const emailRef = useRef(null);
const passwordRef = useRef(null);

const handleonSubmit = async(e) => {
  e.preventDefault(); 
  try{
    setLoading(true)
  const email = emailRef.current.value;
  const password = passwordRef.current.value;
  if (!email || !password) {
    toast("Please fill in all fields");
    return;
  }
const data=await login(email, password);

if(data.success){
  toast("Login Successfull")
  dispatch(loginSuccess(data))
}
setLoading(false)
  }catch(e){
    setLoading(false)
    const data=e.response.data;
  if(!data.success){toast(data.message)
    toast(data.message)
  }else{
    setError("An error occurred during login. Please try again.");
    toast("An error occurred during login. Please try again.")
  }
  console.error("Login error:", e);
}}
  return (
    <div className="flex flex-col overflow-hidden h-screen md:flex-row-reverse w-full min-h-screen">
      {/* Logo */}
       <Link to={"/"}>
      <img
        alt="logo"
        src={webLogo}
        className="absolute top-4 left-4 md:top-4 md:left-6 md:h-10  h-8 drop-shadow-lg z-10"
        />
        </Link>

      {/* Left Side (Branding Section) */}
      <div className="flex flex-col justify-center items-center w-full md:w-2/3 bg-blue-900 text-white px-6 py-8 pb-0 md:py-0 min-h-[50vh] md:min-h-screen">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center leading-snug max-w-lg">
          Revolutionize Learning Quran with{" "}
          <span className="text-yellow-300">Qtuor</span>
        </h1>
        <p className="mt-3 text-sm sm:text-base text-gray-200 text-center max-w-md">
          Learn or Teach the Quran online for kids & adults from the comfort of
          your home.
        </p>
       
        <img
          src={loginImage}
          alt="Login Illustration"
          className="max-w-[180px] sm:max-w-[240px] md:max-w-[300px]  drop-shadow-2xl  w-full"
          />
      </div>

      <div className="flex justify-center items-center w-full md:w-1/3 bg-white p-6 sm:p-8 shadow-lg min-h-[50vh] md:min-h-screen mt-5 overflow-hidden">
        <div className="flex flex-col items-start gap-4 w-full max-w-sm">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Welcome Back
          </h1>
          <p className="text-sm text-gray-500">Please login to your account</p>

          <input
          ref={emailRef}
            type="email"
            placeholder="Email"
            className="w-full mt-4 bg-gray-50 rounded-lg h-11 pl-4 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm sm:text-base"
          />
          <input
          ref={passwordRef}
            type="password"
            placeholder="Password"
            className="w-full bg-gray-50 rounded-lg h-11 pl-4 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm sm:text-base"
          />

          <div className="flex justify-end w-full">
            <button className="text-xs sm:text-sm text-blue-600 hover:underline cursor-pointer">
              Forgot password?
            </button>
          </div>

          <button onClick={handleonSubmit} className="w-full py-3 rounded-lg bg-blue-900 hover:bg-blue-800 transition text-white font-semibold text-sm sm:text-base">
                {loading?<Loader variant="button" size="small" />:"Login"}
          </button>

          <p className="text-xs sm:text-sm mt-4 text-gray-500 text-center w-full">
            Don't have an account?
            <Link
              to="/signup/role-selection"
              className="pl-1 text-blue-600 hover:underline cursor-pointer">
            Get started              
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

