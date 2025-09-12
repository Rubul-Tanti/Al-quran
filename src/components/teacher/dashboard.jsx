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
    <div className="p-6 bg-zinc-50 min-h-screen text-blue-900 w-full space-y-8">
      <h1 className="text-2xl font-bold">📚 Teacher Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-2xl shadow flex items-center gap-4">
          <FaUserGraduate className="text-blue-900 text-3xl" />
          <div>
            <p className="text-lg font-semibold">{user?.currentStudents?.length || 0}</p>
            <p className="text-sm text-gray-500">Active Students</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow flex items-center gap-4">
          <FaChalkboardTeacher className="text-blue-900 text-3xl" />
          <div>
            <p className="text-lg font-semibold">{user?.todayClass?.length || 0}</p>
            <p className="text-sm text-gray-500">Today’s Classes</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow flex items-center gap-4">
          <FaAward className="text-blue-900 text-3xl" />
          <div>
            <p className="text-lg font-semibold">{user?.ratting || "N/A"}</p>
            <p className="text-sm text-gray-500">Average Rating</p>
          </div>
        </div>
      </div>

      {/* Upcoming Classes */}
      <div className="bg-white p-4 rounded-2xl shadow">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <FaClipboardList /> Today’s Classes
        </h2>
        {user?.todayClass?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {user?.todayClass?.map((cls) => (
              <div
                key={cls._id}
                className="bg-neutral-100 p-4 rounded-xl flex items-center justify-between shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={cls.studentProfilePic}
                    alt={cls._id}
                    className="w-16 h-16 rounded-full"
                  />
                  <div>
                    <p className="font-medium">{cls.subject}</p>
                    <p className="text-sm text-gray-600">{cls.studentName} student</p>
                  </div>
                </div>
                <p className="text-sm font-semibold text-blue-900">{cls.className}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm italic">No classes today 🎉</p>
        )}
      </div>

      {/* Active Courses */}
      <div className="bg-white p-4 rounded-2xl shadow">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <FaBookOpen /> Current Students
        </h2>
        {user?.currentStudents?.length > 0 ? (
          <div className="space-y-4">
            {user?.currentStudents.map((course) => (
              <div
                key={course.studentDetail.studentName}
                className="border border-zinc-200 rounded-xl p-4 flex flex-col sm:flex-row justify-between gap-4"
              >
                <div className="flex-1">
                  <div className="flex justify-between">
                    <span className="font-medium">{course.courseDetail.courseName}</span>
                    <span className="text-sm text-gray-500">
                      {course.courseDetail.numberOfClass -
                        course.courseDetail.doneNumberOfClass}{" "}
                      classes left
                    </span>
                  </div>
                  <div className="w-full bg-blue-100 rounded-full h-2 mt-2">
                    <div
                      className="bg-blue-900 h-2 rounded-full"
                      style={{
                        width: `${
                          ((course.courseDetail.doneNumberOfClass) /
                            course.courseDetail.numberOfClass) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div>
                    <button className="mt-1 px-3 py-1 bg-blue-900 text-white rounded flex items-center gap-1 text-xs">
                      <FiMessageSquare /> Message Student
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm italic">No active students yet 👩‍🎓</p>
        )}
      </div>

      {/* Completed Courses */}
      <div className="bg-white p-4 rounded-2xl shadow">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <FaAward /> Completed Quran Courses
        </h2>
        {user?.profesnalDetails?.taught?.length > 0 ? (
          user?.profesnalDetails?.taught.map((course) => (
            <div
              key={course.studentId}
              className="border p-3 rounded-xl mb-3 flex justify-between items-center"
            >
              <div>
                <p className="font-medium">{course.subject}</p>
                <p className="text-xs text-gray-500">
                  Completed on {course.endDate}
                </p>
              </div>
              <BsCheckCircle className="text-green-500" size={20} />
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm italic">
            No completed courses yet 🕊️
          </p>
        )}
      </div>
    </div>
  );
};

export default TeacherDashboard;
