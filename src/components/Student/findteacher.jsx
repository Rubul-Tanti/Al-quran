import { useQueries, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { FiSearch, FiStar, FiMessageSquare, FiFilter, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { RiFindReplaceLine } from "react-icons/ri";
import api from "../../utils/axios";
import Loader from "../loader";
const FindTeachers = () => {
  const [search, setSearch] = useState("");
  const [subject, setSubject] = useState("");
  const [rating, setRating] = useState("");
  const [availability, setAvailability] = useState("");
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");
  const [language, setLanguage] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const teachers = [
    {
      id: 1,
      name: "Ustadh Ahmad",
      title: "Expert Tajweed & Recitation Teacher | Quran Mentor",
      subject: "Tajweed & Recitation",
      rating: 4.9,
      availability: "Weekdays",
      gender: "Male",
      country: "Egypt",
      language: "Arabic",
      hourlyRate: "$15/hr",
      earned: "$2,000 earned",
      skills: ["Tajweed", "Recitation", "Arabic Grammar", "Qira'at"],
      bio: "Dedicated to helping students perfect their recitation and understanding of Quranic Arabic.",
      img: "https://via.placeholder.com/80"
    },
    {
      id: 2,
      name: "Ustadhah Maryam",
      title: "Hifz Specialist | Quran Memorization Coach",
      subject: "Memorization (Hifz)",
      rating: 4.8,
      availability: "Weekends",
      gender: "Female",
      country: "Pakistan",
      language: "Urdu",
      hourlyRate: "$10/hr",
      earned: "$1,500 earned",
      skills: ["Hifz", "Tajweed", "Urdu Tafseer", "Female Teacher"],
      bio: "Helping students memorize the Quran with perfect Tajweed and understanding.",
      img: "https://via.placeholder.com/80"
    }
  ];

  const filteredTeachers = teachers.filter((teacher) => {
    return (
      teacher.name.toLowerCase().includes(search.toLowerCase()) &&
      (subject === "" || teacher.subject.toLowerCase().includes(subject.toLowerCase())) &&
      (rating === "" || teacher.rating >= parseFloat(rating)) &&
      (availability === "" || teacher.availability === availability) &&
      (gender === "" || teacher.gender === gender) &&
      (country === "" || teacher.country === country) &&
      (language === "" || teacher.language === language)
    );
  });

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
const teacherlist=async()=>{
const res=await api.post("/v1/teacherlist")
 return res.data.data
}
  const {isLoading,error,data}=useQuery({queryKey:["teacherList"],queryFn:teacherlist})
   if(isLoading){
    return<Loader />
   }
   console.log(data)
  return (
    <div className="p-6 bg-zinc-50 min-h-screen text-blue-900 space-y-6">
      <h1 className="text-2xl font-bold flex items-center gap-2 "><RiFindReplaceLine size={24}/> Find Teachers</h1>

      {/* Mobile Filter Toggle */}
      <div className="md:hidden flex justify-between items-center bg-white p-3 rounded-xl shadow cursor-pointer" onClick={() => setShowFilters(!showFilters)}>
        <div className="flex items-center gap-2 font-medium text-blue-900">
          <FiFilter /> Filters
        </div>
        {showFilters ? <FiChevronUp /> : <FiChevronDown />}
      </div>

      {/* Filter Section */}
      <div className={`bg-white p-4 rounded-2xl shadow space-y-4 ${showFilters ? "block" : "hidden"} md:block`}>
        <div className="flex flex-wrap gap-5">
          {/* Search */}
          <div className="flex items-center border h-10 border-gray-300 rounded-lg px-3 py-2 w-full md:w-auto flex-1">
            <FiSearch className="text-gray-500" />
            <input
              type="text"
              placeholder="Search by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="outline-none flex-1 ml-2"
            />
          </div>

          {/* Subject Filter */}
          <RadioGroup
            label="Subject"
            options={[
              { label: "All", value: "" },
              { label: "Tajweed", value: "Tajweed" },
              { label: "Hifz", value: "Hifz" },
              { label: "Qira'at", value: "Qira'at" }
            ]}
            value={subject}
            setValue={setSubject}
          />

          {/* Rating Filter */}
          <RadioGroup
            label="Rating"
            options={[
              { label: "All", value: "" },
              { label: "⭐ 5 Stars", value: "5" },
              { label: "⭐ 4+ Stars", value: "4" },
              { label: "⭐ 3+ Stars", value: "3" }
            ]}
            value={rating}
            setValue={setRating}
          />

          {/* Availability Filter */}
          <RadioGroup
            label="Availability"
            options={[
              { label: "Any", value: "" },
              { label: "Today", value: "Today" },
              { label: "Weekdays", value: "Weekdays" },
              { label: "Weekends", value: "Weekends" }
            ]}
            value={availability}
            setValue={setAvailability}
          />

          {/* Gender Filter */}
          <RadioGroup
            label="Gender"
            options={[
              { label: "Any", value: "" },
              { label: "Male", value: "Male" },
              { label: "Female", value: "Female" }
            ]}
            value={gender}
            setValue={setGender}
          />

          {/* Country Filter */}
          <RadioGroup
            label="Country"
            options={[
              { label: "All", value: "" },
              { label: "Egypt", value: "Egypt" },
              { label: "Pakistan", value: "Pakistan" }
            ]}
            value={country}
            setValue={setCountry}
          />

          {/* Language Filter */}
          <RadioGroup
            label="Language"
            options={[
              { label: "All", value: "" },
              { label: "Arabic", value: "Arabic" },
              { label: "Urdu", value: "Urdu" }
            ]}
            value={language}
            setValue={setLanguage}
          />
        </div>
      </div>

      {/* Teacher Cards */}
      <div className="grid grid-cols-1 gap-4">
        {data.length > 0 ? (
          data.map((teacher) => (
            <div
              key={teacher._id}
              className="bg-white p-5 rounded-2xl shadow flex flex-col sm:flex-row gap-4 items-start sm:items-center"
            >
              <img
                src={teacher.persnalDetails.profilePic}
                alt={teacher.persnalDetails.name}
                className="w-20 h-20 rounded-full"
              />
              <div className="flex-1 space-y-1">
                <h2 className="text-lg font-semibold">{teacher.persnalDetails.name}</h2>
                <p className="text-sm text-blue-900 font-medium">{teacher.title}</p>
                <p className="text-xs text-gray-500">{teacher.profesnalDetails.hourlyRate} • "not defined"</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {teacher.profesnalDetails.specializations.map((skill, idx) => (
                    <span
                      key={idx}
                      className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-gray-600 mt-2">{teacher.profesnalDetails.bio}</p>
              </div>
              <div className="flex flex-col items-center sm:items-end gap-2">
                <div className="flex items-center gap-1 text-yellow-500">
                  <FiStar /> {"not ratting"}
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-1 bg-blue-900 text-white rounded-lg text-sm">View Profile</button>
                  <button className="px-4 py-1 bg-gray-200 text-blue-900 rounded-lg flex items-center gap-1 text-sm">
                    <FiMessageSquare /> Message
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No teachers match your filters.</p>
        )}
      </div>
    </div>
  );
};

export default FindTeachers;
    