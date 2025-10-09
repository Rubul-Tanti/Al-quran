import React from "react";
import { FiMessageSquare, FiStar } from "react-icons/fi";
import { BsCheckCircle } from "react-icons/bs";
import { FaBookOpen, FaClock, FaAward } from "react-icons/fa";
import { useSelector } from "react-redux";
import { FaBookQuran } from "react-icons/fa6";
import { SiConcourse } from "react-icons/si";
import { GiFinishLine } from "react-icons/gi";
import { useQuery } from "@tanstack/react-query";
import fetchUser from "../../services/fetchUser";
import Loader from "../loader";

const StudentDashboard = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="p-4 md:p-6 bg-zinc-50 min-h-screen w-full">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-700">Quran Learning Dashboard</h1>
        <p className="text-sm text-zinc-500 mt-1">Track your progress and manage your courses</p>
      </div>

      {/* Today's Classes Section */}
      <div className="bg-white p-5 border border-zinc-200 rounded-xl shadow-sm mb-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 bg-blue-50 rounded-lg">
            <FaBookQuran className="text-blue-400" size={18} />
          </div>
          <h2 className="text-lg font-semibold text-zinc-700">Today's Classes</h2>
        </div>

        {user?.ongoingCourses?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {user.ongoingCourses.map((cls, i) => (
              <div
                key={i}
                className="bg-zinc-50 border border-zinc-200 p-4 rounded-xl hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={cls.img}
                    alt={cls.teacher}
                    className="w-12 h-12 rounded-full border-2 border-zinc-200 object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-zinc-700 text-sm truncate">{cls.teacher}</p>
                    <p className="text-xs text-zinc-500">{cls.time}</p>
                  </div>
                </div>
                <p className="text-sm text-zinc-600 font-medium truncate">{cls.name}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-zinc-100 rounded-full mb-3">
              <FaClock className="text-zinc-400" size={20} />
            </div>
            <p className="text-sm text-zinc-500">No classes scheduled for today</p>
          </div>
        )}
      </div>

      {/* Ongoing Courses */}
      <div className="bg-white p-5 border border-zinc-200 rounded-xl shadow-sm mb-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 bg-blue-50 rounded-lg">
            <SiConcourse className="text-blue-400" size={20} />
          </div>
          <h2 className="text-lg font-semibold text-zinc-700">Ongoing Courses</h2>
        </div>

        {user?.ongoingCourses?.length > 0 ? (
          <div className="space-y-4">
            {user.ongoingCourses.map((course, i) => (
              <div
                key={i}
                className="border border-zinc-200 rounded-xl p-4 hover:border-blue-200 transition-colors"
              >
                <div className="flex flex-col lg:flex-row gap-4">
                  {/* Course Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-zinc-700">{course.name}</h3>
                      <span className="text-sm font-medium text-blue-500 bg-blue-50 px-3 py-1 rounded-full">
                        {course.progress}
                      </span>
                    </div>
                    
                    <p className="text-xs text-blue-600 mb-3 inline-block bg-blue-50 px-2 py-1 rounded">
                      Focus: {course.tajweed}
                    </p>

                    {/* Progress Bar */}
                    <div className="w-full bg-zinc-100 rounded-full h-2">
                      <div
                        className="bg-blue-400 h-2 rounded-full transition-all"
                        style={{ width: course.progress }}
                      ></div>
                    </div>
                  </div>

                  {/* Teacher Info */}
                  <div className="flex items-center gap-3 lg:border-l lg:border-zinc-200 lg:pl-4">
                    <img
                      src={course.img}
                      alt={course.teacher}
                      className="w-14 h-14 rounded-full border-2 border-zinc-200 object-cover"
                    />
                    <div>
                      <p className="font-medium text-zinc-700 text-sm">{course.teacher}</p>
                      <div className="flex items-center gap-1 text-yellow-500 text-xs mb-2">
                        <FiStar size={14} />
                        <span className="text-zinc-600">{course.rating}/5</span>
                      </div>
                      <button className="px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex items-center gap-1.5 text-xs transition-colors">
                        <FiMessageSquare size={14} />
                        Message
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-zinc-100 rounded-full mb-3">
              <FaBookOpen className="text-zinc-400" size={20} />
            </div>
            <p className="text-sm text-zinc-500">No ongoing courses at the moment</p>
          </div>
        )}
      </div>

      {/* Completed Courses */}
      <div className="bg-white p-5 border border-zinc-200 rounded-xl shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 bg-blue-50 rounded-lg">
            <GiFinishLine className="text-blue-400" size={20} />
          </div>
          <h2 className="text-lg font-semibold text-zinc-700">Completed Courses</h2>
        </div>

        {user?.completedCourse?.length > 0 ? (
          <div className="space-y-3">
            {user.completedCourse.map((course, i) => (
              <div
                key={i}
                className="border border-zinc-200 p-4 rounded-lg flex justify-between items-center hover:bg-zinc-50 transition-colors"
              >
                <div>
                  <p className="font-medium text-zinc-700">{course.name}</p>
                  <p className="text-xs text-zinc-500 mt-1">
                    Completed on {new Date(course.completedOn).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
                <div className="flex items-center justify-center w-8 h-8 bg-green-50 rounded-full">
                  <BsCheckCircle className="text-green-500" size={18} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-zinc-100 rounded-full mb-3">
              <FaAward className="text-zinc-400" size={20} />
            </div>
            <p className="text-sm text-zinc-500">No courses completed yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;