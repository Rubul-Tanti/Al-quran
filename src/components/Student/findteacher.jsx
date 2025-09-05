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

  const teachers = [
    {
      password: "securePass1",
      rating: 4.8,
      verified: true,
      role: "teacher",
      persnalDetails: {
        name: "Ahmed Khan",
        gender: "Male",
        email: "ahmed.khan@example.com",
        dob: "1985-03-12T00:00:00.000Z",
        country: "Pakistan",
        profilePic: "https://example.com/images/ahmed.jpg",
        phone: "+923001112222",
        languageSpoken: ["Urdu", "Arabic", "English"],
      },
      reviews: [
        {
          studentDetail: {
            studentName: "Ali Raza",
            studenProfilePic: "https://example.com/images/ali.jpg",
            studentId: "650a3c6f5b3f4a12f23abcde",
            country: "UAE",
          },
          rating: "5",
          review: "Great teacher with deep knowledge of Tajweed.",
        },
      ],
      profesnalDetails: {
        profesnalEmail: "ahmed.teacher@example.com",
        hourlyRate: "15",
        course: [
          {
            studentDetail: {
              studentName: "Ali Raza",
              studenProfilePic: "https://example.com/images/ali.jpg",
              studentId: "650a3c6f5b3f4a12f23abcde",
              country: "UAE",
            },
            status: "ongoing",
            courseDetail: {
              classTime: "18:00",
              hourlyRate: 15,
              courseName: "Tajweed Course",
              duration: "3 months",
            },
            hourlyRate: "15",
          },
        ],
        cirtificates: ["https://example.com/certs/tajweed-cert.pdf"],
        educationDetails: "Al-Azhar University Graduate in Islamic Studies",
        bio: "Experienced Quran and Tajweed teacher with 10+ years of experience.",
        specializations: ["Tajweed", "Quran Memorization"],
      },
    },
    {
      password: "teachPass2",
      rating: 4.2,
      verified: false,
      role: "teacher",
      persnalDetails: {
        name: "Fatima Zahra",
        gender: "Female",
        email: "fatima.zahra@example.com",
        dob: "1990-07-22T00:00:00.000Z",
        country: "Egypt",
        profilePic: "https://example.com/images/fatima.jpg",
        phone: "+201001112233",
        languageSpoken: ["Arabic", "English"],
      },
      reviews: [
        {
          studentDetail: {
            studentName: "Sara Ahmed",
            studenProfilePic: "https://example.com/images/sara.jpg",
            studentId: "650a3c6f5b3f4a12f23dcbae",
            country: "UK",
          },
          rating: "4",
          review: "Very patient and explains concepts clearly.",
        },
      ],
      profesnalDetails: {
        profesnalEmail: "fatima.teacher@example.com",
        hourlyRate: "12",
        course: [
          {
            studentDetail: {
              studentName: "Sara Ahmed",
              studenProfilePic: "https://example.com/images/sara.jpg",
              studentId: "650a3c6f5b3f4a12f23dcbae",
              country: "UK",
            },
            status: "completed",
            courseDetail: {
              classTime: "15:30",
              hourlyRate: 12,
              courseName: "Arabic Course",
              duration: "6 weeks",
            },
            hourlyRate: "12",
          },
        ],
        cirtificates: ["https://example.com/certs/arabic-cert.pdf"],
        educationDetails: "M.A. in Arabic Language from Cairo University",
        bio: "Arabic language teacher with a passion for helping students speak fluently.",
        specializations: ["Arabic Grammar", "Conversation Skills"],
      },
    },
  ];

  // const filteredTeachers = data?.filter((teacher) => {
  //   // return (
  //   //   teacher.name.toLowerCase().includes(search.toLowerCase()) &&
  //   //   (subject === "" ||
  //   //     teacher.subject.toLowerCase().includes(subject.toLowerCase())) &&
  //   //   (rating === "" || teacher.rating >= parseFloat(rating)) &&
  //   //   (availability === "" || teacher.availability === availability) &&
  //   //   (gender === "" || teacher.gender === gender) &&
  //   //   (country === "" || teacher.country === country) &&
  //   //   (language === "" || teacher.language === language)
  //   // );
  // });

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
        className={`bg-white p-4 rounded-2xl shadow space-y-4 ${
          showFilters ? "block" : "hidden"
        } md:block`}
      >
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
              { label: "Qira'at", value: "Qira'at" },
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
              { label: "⭐ 3+ Stars", value: "3" },
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
              { label: "Weekends", value: "Weekends" },
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
              { label: "Female", value: "Female" },
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
              { label: "Pakistan", value: "Pakistan" },
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
              { label: "Urdu", value: "Urdu" },
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
                <h2 className="text-lg font-semibold">
                  {teacher.persnalDetails.name}
                </h2>
                <p className="text-sm text-blue-900 font-medium">
                  {teacher.title}
                </p>
                <p className="text-xs text-gray-500">
                  {teacher.profesnalDetails.hourlyRate} • "not defined"
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {teacher.profesnalDetails.specializations.map(
                    (skill, idx) => (
                      <span
                        key={idx}
                        className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
                      >
                        {skill}
                      </span>
                    )
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  {teacher.profesnalDetails.bio}
                </p>
              </div>
              <div className="flex flex-col items-center sm:items-end gap-2">
                <div className="flex items-center gap-1 text-yellow-500">
                  <FiStar /> {"not ratting"}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`/find-teachers/${teacher._id}`)}
                    className="px-4 py-1 bg-blue-900 text-white rounded-lg text-sm"
                  >
                    View Profile
                  </button>
                  <button className="px-4 py-1 bg-gray-200 text-blue-900 rounded-lg flex items-center gap-1 text-sm">
                    <FiMessageSquare /> Message
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">
            No teachers match your filters.
          </p>
        )}
      </div>
    </div>
  );
};

export default FindTeachers;
