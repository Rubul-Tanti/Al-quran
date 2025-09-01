import { useEffect, useState } from "react";
  import { GiBoltEye } from "react-icons/gi";
  import { LuEyeClosed } from "react-icons/lu";

  import {  toast } from 'react-toastify';
  import OtpVerfiy from "./otpVerify";

import Login from "../../services/login"
import Loader from "../../components/loader";
import sendOtp from "../../services/sendOtp";
const StudentRegistration = () => {

  const [passNotMatch, setPassNotMatch] = useState(false);
  const [otpsent,setotpsent]=useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    resend:false,
    otploading:false,
    time:120
  });

  // 👇 states for password visibility
  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false); // 2 minutes = 120 sec
const [error,toast]=useState("")


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async(e) => {
   try{ e.preventDefault();
    setLoading(true)
    if (formData.password !== formData.confirmPassword) {
      setPassNotMatch(true);
      setLoading(false)
      return;
    }
    setPassNotMatch(false);
    const data=await sendOtp(formData.email)
      if(data?.success){
        setotpsent(true)  
      }}
      catch(e){
        setLoading(false)
      const data=e?.response?.data;
      if(data?.success===false){

        toast(data?.message)}else{toast("Something went wrong, please try again later") }
       
      }
  };

if(otpsent){return <OtpVerfiy onSubmit={handleSubmit} formData={formData}/>}else{

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 px-4">
      <div className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl w-full max-w-md transition-all duration-300">
        <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center tracking-tight">
          Create Student Account
        </h2>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@mail.com"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>

          {/* Password */}
          {<p className="text-sm text-red-700">{error}</p>}
          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
               maxLength={20}
              minLength={8}
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="********"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {!showPassword ? <LuEyeClosed size={18} /> : <GiBoltEye size={18} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            {passNotMatch && (
              <p className="text-red-800 text-sm font-sans mb-1">
                Passwords do not match!
              </p>
            )}
            <label className="block mb-1 text-sm font-semibold text-gray-700">
              Confirm Password
            </label>
            <div className="relative">
              <input
              maxLength={20}
              minLength={8}
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="********"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition pr-10"
              />
              
            </div>
          </div>

          {/* Gender */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Gender
            </label>
            <div className="flex gap-4 text-sm">
              {["Male", "Female", "Other"].map((g) => (
                <label key={g} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value={g}
                    checked={formData.gender === g}
                    onChange={handleChange}
                    className="accent-blue-600"
                  />
                  {g}
                </label>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full bg-blue-900 hover:bg-blue-800 max-h-10 overflow-hidden text-white py-2.5 rounded-xl font-semibold text-sm transition-all duration-300"
          >{loading?<Loader  variant="button" size="small"/>:"Register"}       
          </button>
        </form>
      </div>
    </div>
  );
}
};

export default StudentRegistration;

