import React from "react";
import { FcGoogle } from "react-icons/fc"; // Google icon

const Login = () => {
  const handleGoogleLogin = () => {
    // Call your OAuth logic here (e.g., Firebase, NextAuth, etc.)
    console.log("Login with Google clicked");
  };

  return (
    <div className="flex relative flex-row-reverse w-full h-screen">
      {/* Left Side Image */}
       <img alt="logo" className="absolute left-14 top-14" />
      <div className="w-[65%] flex justify-center bg-blue-900 items-center">
        <img src="/login-illustration.png" alt="Login Illustration" /> {/* Replace with actual image path */}
      </div>

      {/* Right Side Login Form */}
      <div className="flex justify-center items-center w-[35%]">
        <div className="flex flex-col items-start gap-2 h-full justify-center w-full px-8">
          <h1 className="text-4xl font-bold">Welcome Back</h1>
          <p className="text-sm text-gray-500 font-sans w-full">
            Please login to your account
          </p>

          <input
            type="email"
            placeholder="Email"
            className="w-full mt-8 bg-gray-50 rounded-lg h-10 pl-5 outline-0 border border-zinc-200"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full mt-3 bg-gray-50 rounded-lg h-10 pl-5 outline-0 border border-zinc-200"
          />

          <div className="flex flex-row justify-end w-full">
            <a className="text-[12px] text-gray-600 cursor-pointer">Forgot password?</a>
          </div>

          <div className="w-full flex justify-center">
            <button className="rounded-xl w-full border py-3 cursor-pointer bg-blue-900 text-white font-semibold">
              Login
            </button>
          </div>

          {/* Google Login */}
          <div className="w-full mt-4 flex justify-center">
            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 border border-gray-300 py-3 rounded-xl hover:bg-gray-50 transition"
            >
              <FcGoogle size={20} />
              <span className="text-sm font-medium text-gray-700">Login with Google</span>
            </button>
          </div>

          <p className="text-[12px] mt-4">
            Don't have an account?
            <a className="pl-1 text-blue-700 cursor-pointer">Get started</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
