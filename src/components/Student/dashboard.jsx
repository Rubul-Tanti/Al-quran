import React from "react";
import { FiMessageSquare, FiStar } from "react-icons/fi";
import { BsCheckCircle } from "react-icons/bs";
import { FaBookOpen, FaClock, FaAward } from "react-icons/fa";

const StudentDashboard = () => {
  const ongoingCourses = [
    {
      id: 1,
      name: "Surah Al-Baqarah (1-50)",
      progress: "45%",
      tajweed: "Ikhfa",
      teacher: "Ustadh Ahmad",
      rating: "4.9",
      img: "https://via.placeholder.com/60"
    },
    {
      id: 2,
      name: "Surah Al-Mulk",
      progress: "70%",
      tajweed: "Idgham",
      teacher: "Ustadh Kareem",
      rating: "4.8",
      img: "https://via.placeholder.com/60"
    }
  ];

  const completedCourses = [
    { id: 1, name: "Surah Al-Fatiha", completedOn: "2025-07-12" },
    { id: 2, name: "Surah Al-Ikhlas", completedOn: "2025-07-18" }
  ];

  const todaysClasses = [
    {
      id: 1,
      name: "Surah Al-Kahf Recitation",
      time: "10:00 AM",
      teacher: "Ustadh Zaid",
      img: "https://via.placeholder.com/60"
    },
    {
      id: 2,
      name: "Tajweed Practice",
      time: "2:30 PM",
      teacher: "Ustadhah Maryam",
      img: "https://via.placeholder.com/60"
    }
  ];

  return (
    <div className="p-6 bg-zinc-50 min-h-screen text-blue-900 w-full space-y-8">
      <h1 className="text-2xl font-bold">📖 Quran Learning Dashboard</h1>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-2xl shadow flex items-center gap-4">
          <FaBookOpen className="text-blue-900 text-3xl" />
          <div>
            <p className="text-lg font-semibold">120</p>
            <p className="text-sm text-gray-500">Verses Memorized</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow flex items-center gap-4">
          <FaClock className="text-blue-900 text-3xl" />
          <div>
            <p className="text-lg font-semibold">7 Days</p>
            <p className="text-sm text-gray-500">Current Streak</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow flex items-center gap-4">
          <FaAward className="text-blue-900 text-3xl" />
          <div>
            <p className="text-lg font-semibold">3</p>
            <p className="text-sm text-gray-500">Achievements</p>
          </div>
        </div>
      </div>

      {/* Today's Classes Section */}
      <div className="bg-white p-4 rounded-2xl shadow">
        <h2 className="text-lg font-semibold mb-4">📅 Today’s Classes</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {todaysClasses.map((cls) => (
            <div
              key={cls.id}
              className="bg-neutral-100 relative p-4 rounded-xl flex flex-row items-center justify-center text-center shadow-sm"
            ><div>
              <img
                src={cls.img}
                alt={cls.teacher}
                className="w-16 h-16 rounded-full mb-3"
              />
              <p className="font-medium text-[10px]">{cls.teacher}</p>
              </div>
              <p className="text-sm  text-gray-600">{cls.name}</p>
              <p className="mt-2 text-sm font-semibold absolute right-2 top-0 text-blue-900">{cls.time}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Ongoing Courses */}
      <div className="bg-white p-4 rounded-2xl shadow">
        <h2 className="text-lg font-semibold mb-4">Ongoing Quran Courses</h2>
        <div className="space-y-4">
          {ongoingCourses.map((course) => (
            <div
              key={course.id}
              className="border border-zinc-200 rounded-xl p-4 flex flex-col sm:flex-row justify-between gap-4"
            >
              <div className="flex-1">
                <div className="flex justify-between">
                  <span className="font-medium">{course.name}</span>
                  <span className="text-sm text-gray-500">{course.progress}</span>
                </div>
                <p className="text-xs text-blue-700 mt-1">
                  Focus: {course.tajweed}
                </p>
                <div className="w-full bg-blue-100 rounded-full h-2 mt-2">
                  <div
                    className="bg-blue-900 h-2 rounded-full"
                    style={{ width: course.progress }}
                  ></div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <img
                  src={course.img}
                  alt="Teacher"
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <p className="font-medium">{course.teacher}</p>
                  <div className="flex items-center gap-1 text-yellow-500 text-sm">
                    <FiStar /> {course.rating}/5
                  </div>
                  <button className="mt-1 px-3 py-1 bg-blue-900 text-white rounded flex items-center gap-1 text-xs">
                    <FiMessageSquare /> Message
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
          <div
            key={course.id}
            className="border p-3 rounded-xl mb-3 flex justify-between items-center"
          >
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

export default StudentDashboard;
