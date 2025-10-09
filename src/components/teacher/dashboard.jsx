import React from "react";
import { FiMessageSquare, FiStar } from "react-icons/fi";
import { BsCheckCircle } from "react-icons/bs";
import { 
  FaUserGraduate, 
  FaChalkboardTeacher, 
  FaAward, 
  FaBookOpen, 
  FaClipboardList 
} from "react-icons/fa";
import { useSelector } from "react-redux";

const TeacherDashboard = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="p-4 md:p-6 bg-zinc-50 min-h-screen w-full">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-700 flex items-center gap-2">
          <FaBookOpen className="text-blue-400" />
          Teacher Dashboard
        </h1>
        <p className="text-sm text-zinc-500 mt-1">Manage your classes and track student progress</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white border border-zinc-200 p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <FaUserGraduate className="text-blue-400 text-2xl" />
            </div>
            <div>
              <p className="text-2xl font-bold text-zinc-700">{user?.currentStudents?.length || 0}</p>
              <p className="text-sm text-zinc-500">Active Students</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-zinc-200 p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <FaChalkboardTeacher className="text-blue-400 text-2xl" />
            </div>
            <div>
              <p className="text-2xl font-bold text-zinc-700">{user?.todayClass?.length || 0}</p>
              <p className="text-sm text-zinc-500">Today's Classes</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-zinc-200 p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <FaAward className="text-blue-400 text-2xl" />
            </div>
            <div>
              <p className="text-2xl font-bold text-zinc-700">{user?.ratting || "N/A"}</p>
              <p className="text-sm text-zinc-500">Average Rating</p>
            </div>
          </div>
        </div>
      </div>

      {/* Today's Classes */}
      <div className="bg-white p-5 border border-zinc-200 rounded-xl shadow-sm mb-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 bg-blue-50 rounded-lg">
            <FaClipboardList className="text-blue-400" size={18} />
          </div>
          <h2 className="text-lg font-semibold text-zinc-700">Today's Classes</h2>
        </div>

        {user?.todayClass?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {user.todayClass.map((cls) => (
              <div
                key={cls._id}
                className="bg-zinc-50 border border-zinc-200 p-4 rounded-xl hover:border-blue-200 hover:bg-blue-50/30 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={cls.studentProfilePic}
                      alt={cls.studentName}
                      className="w-12 h-12 rounded-full border-2 border-zinc-200 object-cover"
                    />
                    <div>
                      <p className="font-semibold text-zinc-700 text-sm">{cls.subject}</p>
                      <p className="text-xs text-zinc-500">{cls.studentName}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-medium text-blue-500 bg-blue-50 px-2 py-1 rounded">
                      {cls.className}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-zinc-100 rounded-full mb-3">
              <FaChalkboardTeacher className="text-zinc-400" size={20} />
            </div>
            <p className="text-sm text-zinc-500">No classes scheduled for today 🎉</p>
          </div>
        )}
      </div>

      {/* Current Students */}
      <div className="bg-white p-5 border border-zinc-200 rounded-xl shadow-sm mb-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 bg-blue-50 rounded-lg">
            <FaUserGraduate className="text-blue-400" size={18} />
          </div>
          <h2 className="text-lg font-semibold text-zinc-700">Current Students</h2>
        </div>

        {user?.currentStudents?.length > 0 ? (
          <div className="space-y-4">
            {user.currentStudents.map((course, i) => {
              const progress = ((course.courseDetail.doneNumberOfClass / course.courseDetail.numberOfClass) * 100).toFixed(0);
              const classesLeft = course.courseDetail.numberOfClass - course.courseDetail.doneNumberOfClass;

              return (
                <div
                  key={i}
                  className="border border-zinc-200 rounded-xl p-4 hover:border-blue-200 transition-colors"
                >
                  <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
                    {/* Course Info */}
                    <div className="flex-1 w-full">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-zinc-700">{course.courseDetail.courseName}</h3>
                        <span className="text-sm font-medium text-blue-500 bg-blue-50 px-3 py-1 rounded-full whitespace-nowrap ml-2">
                          {progress}%
                        </span>
                      </div>
                      
                      <p className="text-xs text-zinc-500 mb-3">
                        {classesLeft} {classesLeft === 1 ? 'class' : 'classes'} remaining
                      </p>

                      {/* Progress Bar */}
                      <div className="w-full bg-zinc-100 rounded-full h-2">
                        <div
                          className="bg-blue-400 h-2 rounded-full transition-all"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="lg:border-l lg:border-zinc-200 lg:pl-4">
                      <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex items-center gap-2 text-sm transition-colors whitespace-nowrap">
                        <FiMessageSquare size={16} />
                        Message Student
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-zinc-100 rounded-full mb-3">
              <FaUserGraduate className="text-zinc-400" size={20} />
            </div>
            <p className="text-sm text-zinc-500">No active students yet 👩‍🎓</p>
          </div>
        )}
      </div>

      {/* Completed Courses */}
      <div className="bg-white p-5 border border-zinc-200 rounded-xl shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 bg-blue-50 rounded-lg">
            <FaAward className="text-blue-400" size={18} />
          </div>
          <h2 className="text-lg font-semibold text-zinc-700">Completed Courses</h2>
        </div>

        {user?.profesnalDetails?.taught?.length > 0 ? (
          <div className="space-y-3">
            {user.profesnalDetails.taught.map((course, i) => (
              <div
                key={i}
                className="border border-zinc-200 p-4 rounded-lg flex justify-between items-center hover:bg-zinc-50 transition-colors"
              >
                <div>
                  <p className="font-medium text-zinc-700">{course.subject}</p>
                  <p className="text-xs text-zinc-500 mt-1">
                    Completed on {new Date(course.endDate).toLocaleDateString('en-US', { 
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
            <p className="text-sm text-zinc-500">No completed courses yet 🕊️</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherDashboard;