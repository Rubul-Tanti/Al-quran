import React from "react";
import { useParams } from "react-router-dom";
import api from "../../utils/axios";

const TeacherDetails = () => {
  const { id } = useParams();

const asyncTeacherDetails = async () => {
    const res = await api.get("/v1/teacherlist?page=1&limit=10")
    
    
}
asyncTeacherDetails()

  return (
    
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      {/* Header Section */}
      <div className="flex items-center space-x-6 border-b pb-6">
        <img
          src="https://via.placeholder.com/120"
          alt="Profile"
          className="w-28 h-28 rounded-full object-cover border-4 border-blue-900"
        />
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Teacher Name</h1>
          <p className="text-sm text-gray-500">teacher.email@example.com</p>
          <div className="flex items-center gap-4 mt-2">
            <span className="text-yellow-500 font-semibold">⭐ 4.8</span>
            <span className="bg-blue-100 text-blue-900 px-2 py-1 rounded text-xs">
              Verified
            </span>
          </div>
        </div>
      </div>

      {/* Main Sections */}
      <div className="mt-8 space-y-8">
        {/* Personal Info */}
        <section>
          <h2 className="text-xl font-semibold border-b pb-2 mb-4">
            Personal Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
            <p>
              <strong>Email:</strong> teacher.email@example.com
            </p>
            <p>
              <strong>Gender:</strong> Male
            </p>
            <p>
              <strong>Country:</strong> Pakistan
            </p>
            <p>
              <strong>Languages:</strong> Urdu, Arabic, English
            </p>
          </div>
        </section>

        {/* Professional Details */}
        <section>
          <h2 className="text-xl font-semibold border-b pb-2 mb-4">
            Professional Details
          </h2>
          <div className="space-y-2 text-gray-700">
            <p>
              <strong>Professional Email:</strong> teacher.teacher@example.com
            </p>
            <p>
              <strong>Hourly Rate:</strong> $15/hour
            </p>
            <p>
              <strong>Education:</strong> Islamic Studies from XYZ Institute
            </p>
            <p>
              <strong>Bio:</strong> Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Lorem bio goes here.
            </p>
          </div>
        </section>

        {/* Specializations */}
        <section>
          <h2 className="text-xl font-semibold border-b pb-2 mb-4">
            Specializations
          </h2>
          <div className="flex flex-wrap gap-2">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              Tajweed
            </span>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              Quran Memorization
            </span>
          </div>
        </section>

        {/* Courses */}
        <section>
          <h2 className="text-xl font-semibold border-b pb-2 mb-4">Courses</h2>
          <div className="space-y-4">
            <div className="p-4 border rounded bg-gray-50">
              <p>
                <strong>Course Name:</strong> Tajweed Course
              </p>
              <p>
                <strong>Student:</strong> Ali Raza (UAE)
              </p>
              <p>
                <strong>Class Time:</strong> 6:00 PM
              </p>
              <p>
                <strong>Duration:</strong> 3 months
              </p>
              <p>
                <strong>Status:</strong> Ongoing
              </p>
            </div>
          </div>
        </section>

        {/* Certificates */}
        <section>
          <h2 className="text-xl font-semibold border-b pb-2 mb-4">
            Certificates
          </h2>
          <div className="space-y-2">
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline block"
            >
              Certificate 1 (Tajweed)
            </a>
          </div>
        </section>

        {/* Reviews */}
        <section>
          <h2 className="text-xl font-semibold border-b pb-2 mb-4">
            Student Reviews
          </h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-4 bg-gray-50 p-4 rounded">
              <img
                src="https://via.placeholder.com/50"
                alt="Student"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-gray-800">Ali Raza (UAE)</p>
                <p className="text-yellow-500">⭐ 5</p>
                <p className="text-gray-700">
                  Great teacher with deep knowledge of Tajweed.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TeacherDetails;
