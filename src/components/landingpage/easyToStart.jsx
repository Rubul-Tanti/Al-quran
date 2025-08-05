// components/EasyToStart.tsx
import { FaUserPlus, FaChalkboardTeacher, FaBookOpen, FaUserGraduate, FaCalendarCheck, FaPlay } from "react-icons/fa";

const EasyToStart = () => {
  return (
    <section className="bg-teal-50 py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          Easy to Get Started
        </h2>
        <p className="text-gray-600 text-lg">
          Whether you're a teacher or a student, start your Quran journey in just a few steps.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* For Teachers */}
        <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition">
          <h3 className="text-2xl font-bold text-teal-700 mb-6 text-center">For Teachers</h3>
          <ul className="space-y-6">
            <li className="flex items-start gap-4">
              <FaUserPlus className="text-pink-900 text-3xl" />
              <div>
                <h4 className="font-semibold text-lg">Create a Teacher Profile</h4>
                <p className="text-gray-600">Sign up and share your Quranic teaching experience.</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <FaChalkboardTeacher className="text-pink-900 text-3xl" />
              <div>
                <h4 className="font-semibold text-lg">List Your Classes</h4>
                <p className="text-gray-600">Set your timings, pricing, and course outline.</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <FaCalendarCheck className="text-pink-900 text-3xl" />
              <div>
                <h4 className="font-semibold text-lg">Start Teaching</h4>
                <p className="text-gray-600">Connect with students and begin your teaching journey.</p>
              </div>
            </li>
          </ul>
        </div>

        {/* For Students */}
        <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition">
          <h3 className="text-2xl font-bold text-teal-700 mb-6 text-center">For Students</h3>
          <ul className="space-y-6">
            <li className="flex items-start gap-4">
              <FaUserGraduate className="text-pink-900 text-3xl" />
              <div>
                <h4 className="font-semibold text-lg">Create a Student Account</h4>
                <p className="text-gray-600">Register and choose your learning preferences.</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <FaBookOpen className="text-pink-900 text-3xl" />
              <div>
                <h4 className="font-semibold text-lg">Find a Teacher</h4>
                <p className="text-gray-600">Browse verified teachers and compare their classes.</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <FaPlay className="text-pink-900 text-3xl" />
              <div>
                <h4 className="font-semibold text-lg">Start Learning</h4>
                <p className="text-gray-600">Join online classes and start your Quranic journey.</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default EasyToStart;
