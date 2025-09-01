import React from "react";
import { FiMessageSquare, FiStar } from "react-icons/fi";
import { BsCheckCircle } from "react-icons/bs";
import { FaUserGraduate, FaChalkboardTeacher, FaClock, FaAward } from "react-icons/fa";

const TeacherDashboard = () => {
  const upcomingClasses = [
    {
      id: 1,
      name: "Surah Al-Baqarah (1-20)",
      time: "9:00 AM",
      students: 12,
      img: "https://via.placeholder.com/60"
    },
    {
      id: 2,
      name: "Tajweed Session – Ikhfa Rules",
      time: "1:00 PM",
      students: 8,
      img: "https://via.placeholder.com/60"
    }
  ];

  const activeCourses = [
    {
      id: 1,
      name: "Surah Al-Mulk",
      progress: "65%",
      enrolled: 10,
      rating: "4.8",
      img: "https://via.placeholder.com/60"
    },
    {
      id: 2,
      name: "Surah Yaseen",
      progress: "40%",
      enrolled: 7,
      rating: "4.9",
      img: "https://via.placeholder.com/60"
    }
  ];

  const completedCourses = [
    { id: 1, name: "Surah Al-Fatiha", completedOn: "2025-06-10" },
    { id: 2, name: "Surah An-Nas", completedOn: "2025-07-01" }
  ];

  return (
    <div className="p-6 bg-zinc-50 min-h-screen text-blue-900 w-full space-y-8">
      <h1 className="text-2xl font-bold">📚 Teacher Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-2xl shadow flex items-center gap-4">
          <FaUserGraduate className="text-blue-900 text-3xl" />
          <div>
            <p className="text-lg font-semibold">35</p>
            <p className="text-sm text-gray-500">Active Students</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow flex items-center gap-4">
          <FaChalkboardTeacher className="text-blue-900 text-3xl" />
          <div>
            <p className="text-lg font-semibold">5</p>
            <p className="text-sm text-gray-500">Ongoing Courses</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow flex items-center gap-4">
          <FaAward className="text-blue-900 text-3xl" />
          <div>
            <p className="text-lg font-semibold">4.9</p>
            <p className="text-sm text-gray-500">Average Rating</p>
          </div>
        </div>
      </div>

      {/* Upcoming Classes */}
      <div className="bg-white p-4 rounded-2xl shadow">
        <h2 className="text-lg font-semibold mb-4">📅 Today’s Classes to Teach</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {upcomingClasses.map((cls) => (
            <div key={cls.id} className="bg-neutral-100 p-4 rounded-xl flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3">
                <img src={cls.img} alt={cls.name} className="w-16 h-16 rounded-full" />
                <div>
                  <p className="font-medium">{cls.name}</p>
                  <p className="text-sm text-gray-600">{cls.students} students</p>
                </div>
              </div>
              <p className="text-sm font-semibold text-blue-900">{cls.time}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Active Courses */}
      <div className="bg-white p-4 rounded-2xl shadow">
        <h2 className="text-lg font-semibold mb-4">Active Quran Courses</h2>
        <div className="space-y-4">
          {activeCourses.map((course) => (
            <div key={course.id} className="border border-zinc-200 rounded-xl p-4 flex flex-col sm:flex-row justify-between gap-4">
              <div className="flex-1">
                <div className="flex justify-between">
                  <span className="font-medium">{course.name}</span>
                  <span className="text-sm text-gray-500">{course.progress}</span>
                </div>
                <p className="text-xs text-blue-700 mt-1">
                  Enrolled: {course.enrolled} students
                </p>
                <div className="w-full bg-blue-100 rounded-full h-2 mt-2">
                  <div
                    className="bg-blue-900 h-2 rounded-full"
                    style={{ width: course.progress }}
                  ></div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <img src={course.img} alt="Course" className="w-16 h-16 rounded-full" />
                <div>
                  <div className="flex items-center gap-1 text-yellow-500 text-sm">
                    <FiStar /> {course.rating}/5
                  </div>
                  <button className="mt-1 px-3 py-1 bg-blue-900 text-white rounded flex items-center gap-1 text-xs">
                    <FiMessageSquare /> Message Students
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Completed Courses */}
      <div className="bg-white p-4 rounded-2xl shadow">
        <h2 className="text-lg font-semibold mb-4">Completed Quran Courses</h2>
        {completedCourses.map((course) => (
          <div key={course.id} className="border p-3 rounded-xl mb-3 flex justify-between items-center">
            <div>
              <p className="font-medium">{course.name}</p>
              <p className="text-xs text-gray-500">
                Completed on {course.completedOn}
              </p>
            </div>
            <BsCheckCircle className="text-green-500" size={20} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeacherDashboard;

