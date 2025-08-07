import { useState } from "react";

const StudentRegistration = () => {
  const [gender, setGender] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 px-4">
      <div className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl w-full max-w-md transition-all duration-300">
        <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center tracking-tight">
          Create Student Account
        </h2>

        <form className="flex flex-col gap-5">
          {/* Full Name */}
          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-700">
              Full Name
            </label>
            <input
              type="text"
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
              placeholder="example@mail.com"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="********"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="********"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
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
                    checked={gender === g}
                    onChange={() => setGender(g)}
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
            className="mt-4 w-full bg-blue-900 hover:bg-blue-800 text-white py-2.5 rounded-xl font-semibold text-sm transition-all duration-300"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentRegistration;
