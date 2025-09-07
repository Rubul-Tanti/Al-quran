import { useQueries, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  FiSearch,
  FiStar,
  FiMessageSquare,
  FiFilter,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";
import { RiFindReplaceLine } from "react-icons/ri";
import api from "../../utils/axios";
import Loader from "../loader";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const FindTeachers = () => {
  const [search, setSearch] = useState("");
  const [subject, setSubject] = useState("");
  const [rating, setRating] = useState("");
  const [availability, setAvailability] = useState("");
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");
  const [language, setLanguage] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();

  const RadioGroup = ({ label, options, value, setValue }) => (
    <div className="flex flex-col gap-1">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <div className="flex flex-wrap gap-1">
        {options.map((opt) => (
          <label
            key={opt.value}
            className={`px-3 py-1 border rounded-full cursor-pointer text-sm whitespace-nowrap ${
              value === opt.value
                ? "bg-blue-900 text-white border-blue-900"
                : "bg-white text-gray-700 border-gray-300"
            }`}
          >
            <input
              type="radio"
              name={label}
              value={opt.value}
              checked={value === opt.value}
              onChange={() => setValue(opt.value)}
              className="hidden"
            />
            {opt.label}
          </label>
        ))}
      </div>
    </div>
  );

  const teacherlist = async () => {
    const res = await api.get("/v1/teacherlist?page=1&limit=10 ");
    return res.data.data;
  };
  const { isLoading, error, data } = useQuery({
    queryKey: ["teacherList"],
    queryFn: teacherlist,
  });
  if (isLoading) {
    return <Loader />;
  }
  console.log(data);

  // view teacher profile

  return (
    <div className="p-6 bg-zinc-50 min-h-screen text-blue-900 space-y-6">
      <h1 className="text-2xl font-bold flex items-center gap-2 ">
        <RiFindReplaceLine size={24} /> Find Teachers
      </h1>

      {/* Mobile Filter Toggle */}
      <div
        className="md:hidden flex justify-between items-center bg-white p-3 rounded-xl shadow cursor-pointer"
        onClick={() => setShowFilters(!showFilters)}
      >
        <div className="flex items-center gap-2 font-medium text-blue-900">
          <FiFilter /> Filters
        </div>
        {showFilters ? <FiChevronUp /> : <FiChevronDown />}
      </div>

      {/* Filter Section */}
      <div
        className={`relative overflow-hidden bg-white p-6 rounded-2xl shadow-lg border border-gray-100 transition-all duration-500 ${
          showFilters ? "block animate-fadeIn" : "hidden"
        } md:block`}
      >
        {/* Subtle Gradient Background Decoration */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-100 to-transparent rounded-full blur-2xl opacity-40"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-blue-50 to-transparent rounded-full blur-2xl opacity-40"></div>

        <div className="relative flex flex-wrap gap-6 items-center z-10">
          {/* Search Box */}
          <div className="flex items-center border border-gray-200 rounded-xl px-4 py-2 w-full md:w-72 bg-gray-50 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all duration-300 hover:shadow-md">
            <FiSearch className="text-gray-500" />
            <input
              type="text"
              placeholder="🔍 Search by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="outline-none flex-1 ml-2 bg-transparent text-sm"
            />
          </div>

          {/* Filters Row */}
          <div className="flex flex-wrap gap-4">
            <RadioGroup
              label="Subject"
              options={[
                { label: "All", value: "" },
                { label: "Tajweed", value: "Tajweed" },
                { label: "Hifz", value: "Hifz" },
                { label: "Qira'at", value: "Qira'at" },
              ]}
              value={subject}
              setValue={setSubject}
            />

            <RadioGroup
              label="Rating"
              options={[
                { label: "All", value: "" },
                { label: "⭐ 5 Stars", value: "5" },
                { label: "⭐ 4+ Stars", value: "4" },
                { label: "⭐ 3+ Stars", value: "3" },
              ]}
              value={rating}
              setValue={setRating}
            />

            <RadioGroup
              label="Availability"
              options={[
                { label: "Any", value: "" },
                { label: "Today", value: "Today" },
                { label: "Weekdays", value: "Weekdays" },
                { label: "Weekends", value: "Weekends" },
              ]}
              value={availability}
              setValue={setAvailability}
            />

            <RadioGroup
              label="Gender"
              options={[
                { label: "Any", value: "" },
                { label: "Male", value: "Male" },
                { label: "Female", value: "Female" },
              ]}
              value={gender}
              setValue={setGender}
            />

            <RadioGroup
              label="Country"
              options={[
                { label: "All", value: "" },
                { label: "Egypt", value: "Egypt" },
                { label: "Pakistan", value: "Pakistan" },
              ]}
              value={country}
              setValue={setCountry}
            />

            <RadioGroup
              label="Language"
              options={[
                { label: "All", value: "" },
                { label: "Arabic", value: "Arabic" },
                { label: "Urdu", value: "Urdu" },
              ]}
              value={language}
              setValue={setLanguage}
            />
          </div>

          {/* Reset Button */}
          <button
            onClick={() => {
              setSearch("");
              setSubject("");
              setRating("");
              setAvailability("");
              setGender("");
              setCountry("");
              setLanguage("");
            }}
            className="ml-auto px-4 py-2 bg-blue-900 text-white text-sm rounded-xl hover:bg-blue-800 transition shadow-md"
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* Teacher Cards */}
      <div className="flex flex-col gap-4">
        {data.length > 0 ? (
          data.map((teacher, index) => (
            <motion.div
              key={teacher._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{
                boxShadow: "0px 8px 24px rgba(0,0,0,0.12)",
              }}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl hover:scale-[1.02] hover:border-blue-200 hover:bg-gradient-to-br hover:from-blue-50 hover:to-white transition-all duration-300 flex flex-col sm:flex-row gap-4 items-start sm:items-center"
            >
              {/* Profile Pic */}
              <img
                src={teacher.persnalDetails.profilePic}
                alt={teacher.persnalDetails.name}
                className="w-20 h-20 rounded-full object-contain ring-2 ring-blue-200 hover:scale-115 transition-transform duration-300"
              />

              {/* Info Section */}
              <div className="flex-1 space-y-1">
                <h2 className="text-lg font-semibold text-blue-900">
                  {teacher.persnalDetails.name}
                </h2>
                <p className="text-sm text-blue-700 font-medium">
                  {teacher.title || "Quran Teacher"}
                </p>
                <span className="px-3 py-1 bg-blue-100 text-blue-900 rounded-full text-xs font-medium">
                  ${teacher.profesnalDetails.hourlyRate}/hr
                </span>

                {/* Specializations */}
                <div className="flex flex-wrap gap-2 mt-2">
                  {teacher.profesnalDetails.specializations.map(
                    (skill, idx) => (
                      <span
                        key={idx}
                        className="bg-blue-50 text-blue-800 px-2 py-1 rounded-full text-xs border border-blue-200"
                      >
                        {skill}
                      </span>
                    )
                  )}
                </div>

                {/* Bio */}
                <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                  {teacher.profesnalDetails.bio}
                </p>
              </div>

              {/* Action Section */}
              <div className="flex flex-col items-end gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                <div className="flex items-center gap-1 text-yellow-500 text-sm">
                  {teacher.rating ? (
                    <>
                      {[...Array(5)].map((_, i) => (
                        <FiStar
                          key={i}
                          className={
                            i < Math.round(teacher.rating)
                              ? "fill-yellow-500"
                              : "opacity-30"
                          }
                        />
                      ))}
                      <span className="text-gray-700 ml-1">
                        {teacher.rating.toFixed(1)}
                      </span>
                    </>
                  ) : (
                    <span className="text-gray-500 italic">
                      Be the first to review
                    </span>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`/find-teachers/${teacher._id}`)}
                    className="px-4 py-1 bg-blue-900 text-white rounded-lg text-sm hover:bg-blue-800 transition"
                  >
                    View Profile
                  </button>
                  <button className="px-4 py-1 bg-gray-200 text-blue-900 rounded-lg flex items-center gap-1 text-sm hover:bg-gray-300 transition">
                    <FiMessageSquare /> Message
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-10 text-gray-500">
            <img
              src="https://illustrations.popsy.co/gray/teacher.svg"
              alt="No teachers"
              className="mx-auto w-40 mb-4"
            />
            <p className="text-lg font-medium">No teachers found 🙁</p>
            <p className="text-sm">
              Try adjusting your filters to see more results.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FindTeachers;
