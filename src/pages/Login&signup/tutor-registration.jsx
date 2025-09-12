import React, { useEffect, useRef, useState } from "react";
import countryCodes from "../../../constant/countryCode";
import { toast } from "react-toastify";
import sendOtp from "../../services/sendOtp";
import Loader from "../../components/loader"; // ✅ make sure you have this component
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import registerTeacher from "../../services/teacherStudent";

const TutorRegisterForm = () => {
  const [languages, setLanguages] = useState([]);
  const [courses, setCourses] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingOtp, setOtpLoading] = useState(false);
  const [resendLoading,setResendLoading] = useState(false);

  const [formData, setFormData] = useState({
    dob: "",
    profesnalEmail: "",
    name: "",
    email: "",
    gender: "",
    country: "",
    languageInput: "",
    courseInput: "",
    education: "",
    certificateName: "",
    certificateFile: null,
    profilePicture: null,
    bio: "",
    phoneNumber: "",
    countryCode: "92",
    rate: "",
    otp:""
  });

    const [timeLeft, setTimeLeft] = useState(120); // 2 minutes = 120 sec
  const otpRef=useRef("enter otp")
  const navigate=useNavigate()

 useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const addLanguage = () => {
    if (formData.languageInput.trim() && !languages.includes(formData.languageInput)) {
      setLanguages([...languages, formData.languageInput.trim()]);
      setFormData((prev) => ({ ...prev, languageInput: "" }));
    }
  };

  const addCourse = () => {
    if (formData.courseInput.trim() && !courses.includes(formData.courseInput)) {
      setCourses([...courses, formData.courseInput.trim()]);
      setFormData((prev) => ({ ...prev, courseInput: "" }));
    }
  };

  const addCertificate = () => {
    if (certificates.length >= 10) {
      return toast("Cannot upload more than 10 certificates");
    }
    if (formData.certificateName.trim() && formData.certificateFile) {
      const newCertificate = {
        name: formData.certificateName.trim(),
        file: formData.certificateFile
      };
      setCertificates([...certificates, newCertificate]);
      setFormData((prev) => ({
        ...prev,
        certificateName: "",
        certificateFile: null
      }));

      // Clear the file input
      const fileInput = document.querySelector('input[name="certificateFile"]');
      if (fileInput) fileInput.value = "";
    }
  };

  const removeCertificate = (index) => {
    setCertificates(certificates.filter((_, i) => i !== index));
  };
  // Prepare submission data
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setResendLoading(true)
     setFormData((prev) => ({
      ...prev,
      otp:"",
    }));
    try {
      // Basic validation
      if (!formData.email || !formData.name) {
        toast("Please fill in all required fields");
        setLoading(false);
        return;
      }
      
      const res = await sendOtp(formData.email);
      if (res.success) {
        setOtpLoading(false);setTimeLeft(120);
        otpRef.current=""
        setTimeLeft(120)
        setOtpSent(true);
        setResendLoading(false)
        toast("otp sent to your email")
      }
    } catch (e) {
      setResendLoading(false)
      setLoading(false)
      console.log(e)
      if (e?.response?.data?.message === "User already exists") {
        toast("User already exists");
      } 
      else {
        toast(e?.response?.data?.message);
      }
     if(!e.response){
      toast("something went wrong")
     }
    } finally {
      setLoading(false);
      
    }
  };


const otpHandler=async(e)=>{
  e.preventDefault()
    const submissionData = new FormData();
      submissionData.append("name", formData.name);
      submissionData.append("email", formData.email);
      submissionData.append("profesnalEmail", formData.profesnalEmail);
      submissionData.append("gender", formData.gender);
      submissionData.append("country", formData.country);
      submissionData.append("educationDetails", formData.education);
      submissionData.append("bio", formData.bio);
      submissionData.append("phone", `${formData.countryCode}${formData.phoneNumber}`);
      submissionData.append("countryCode", formData.countryCode);
      submissionData.append("rate", formData.rate);
      submissionData.append("dob", formData.dob);

      // Append profile picture if uploaded
      if (formData.profilePicture) {
        submissionData.append("profilePicture", formData.profilePicture);
      }

      // Append certificates
        certificates.forEach((cert, index) => {
  submissionData.append(`${cert.name}`, cert.file);   // string
});


      // Append arrays
      languages.forEach((lang, index) => {
        submissionData.append(`languages[${index}]`, lang);
      });

      courses.forEach((course, index) => {
        submissionData.append(`specializations[${index}]`, course);
      });

  setOtpLoading(true)

  const otpValue=formData.otp
  console.log(otpValue,"otp")
  submissionData.append("otp",otpValue)
  const data=await registerTeacher(submissionData)
  if(data.success){
    setOtpLoading(false)
    toast("tutor registor successfully")
    toast.info("password has been sent to your email")
    navigate("/login")
  }else{
   setOtpLoading(false)
    toast("otp not matched")
 }

}

     const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };




  if (otpSent) {
 return (
  <div className="flex min-h-screen items-center justify-center bg-blue-50 px-4">
    <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-lg">
      <form onSubmit={otpHandler} className="flex flex-col gap-6">
        <h2 className="text-center text-2xl font-bold text-blue-900">
          Verify OTP
        </h2>
        <input
          type="text"
          minLength={6}
          maxLength={6}
          name="otp"
          onChange={handleChange}
          className="w-full rounded-xl border-2 border-blue-900 px-4 py-3 text-center text-xl tracking-widest text-blue-900 focus:border-blue-600 focus:ring-2 focus:ring-blue-600 focus:outline-none"
          placeholder="Enter 6-digit OTP"
        />

        {timeLeft <= 0 && (
          <p className="text-center text-sm font-medium text-red-600">
            OTP expired! Please request a new one.
          </p>
        )}

        <button
          disabled={timeLeft <= 0}
          className={`w-full rounded-xl py-3 font-semibold transition-all duration-200 ${
            timeLeft <= 0
              ? "cursor-not-allowed bg-gray-300 text-gray-600"
              : "bg-blue-900 text-white hover:bg-blue-800"
          }`}
        >
          {loadingOtp ? "Verifying..." : "Verify OTP"}
        </button>
      </form>

      <div className="mt-6 flex flex-col items-center gap-3">
        {timeLeft <= 0 && (
          <button
            onClick={(e) => handleSubmit(e)}
            className="rounded-xl bg-green-500 px-6 py-2 font-semibold text-white transition-all hover:bg-green-600"
          >
            {resendLoading ? <Loader variant="button" /> : "Resend OTP"}
          </button>
        )}

        <p className="text-center text-sm font-medium text-blue-900">
          {timeLeft > 0 ? `⏳ Time left: ${formatTime(timeLeft)}` : "OTP expired"}
        </p>
      </div>
    </div>
  </div>
);

  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl p-8">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Tutor Registration
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Profile & Personal Info */}
          <div className="flex flex-col md:flex-row gap-8">
            {/* Profile Pic */}
            <div className="flex flex-col items-center">
              <div className="h-32 w-32 rounded-full overflow-hidden bg-gray-200 shadow">
                {formData.profilePicture ? (
                  <img
                    src={URL.createObjectURL(formData.profilePicture)}
                    alt="Preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-gray-400 text-sm">
                    No Image
                  </div>
                )}
              </div>
              <input
                type="file"
                name="profilePicture"
                onChange={handleChange}
                accept="image/*"
                required
                className="mt-3 text-sm"
              />
            </div>

            {/* Personal Info */}
            <div className="flex-1 space-y-4">
              <h3 className="text-lg font-semibold text-gray-700">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  name="name"
                  type="text"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  required
                />

                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  required
                />

                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full p-3 border h-12 border-gray-300 rounded-lg"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>

                <div className="flex flex-col">
                  <label htmlFor="dob" className="text-lg font-semibold text-gray-700">
                    D.O.B
                  </label>
                  <input
                    id="dob"
                    type="date"
                    value={formData.dob}
                    name="dob"
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Phone Number */}
                <div className="flex flex-col">
                  <label className="block font-medium mb-2">Phone Number</label>
                  <div className="flex">
                    <select
                      value={formData.countryCode}
                      onChange={handleChange}
                      name="countryCode"
                      className="border w-24 border-gray-300 h-10 text-sm mr-2 rounded px-2 py-2 mb-2 bg-white outline-0"
                      required
                    >
                      {countryCodes.map((c) => (
                        <option key={c.code} value={c.dial_code}>
                          ({c.dial_code}) ({c.name})
                        </option>
                      ))}
                    </select>

                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      placeholder="Enter phone number"
                      className="border max-w-[150px] h-10 border-gray-300 outline-0 rounded px-3 py-2"
                      maxLength={10}
                      minLength={10}
                      title="Enter 10 digit phone number"
                      required
                    />
                  </div>
                </div>

                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full p-3 border h-14 border-gray-300 rounded-lg"
                  required
                >
                  <option value="">Select Country</option>
                  {countryCodes.map((nation) => (
                    <option key={nation.code} value={nation.name}>
                      {nation.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Teaching Info */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-700">Teaching Information</h3>

            {/* Languages */}
            <div>
              <label className="block font-medium mb-2">Languages Spoken</label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  name="languageInput"
                  placeholder="Add language"
                  value={formData.languageInput}
                  onChange={handleChange}
                  className="flex-1 p-3 border border-gray-300 rounded-lg"
                />
                <button
                  type="button"
                  onClick={addLanguage}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {languages.map((lang, i) => (
                  <span
                    key={i}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            {/* Courses */}
            <div>
              <label className="block font-medium mb-2">Courses Offered</label>
              <div className="flex gap-2 mb-3">
                <select
                  name="courseInput"
                  value={formData.courseInput}
                  onChange={handleChange}
                  className="flex-1 p-3 border border-gray-300 rounded-lg"
                >
                  <option value="">Select a course</option>
                  <option value="Hifz Course">Hifz Course</option>
                  <option value="Tajweed Course">Tajweed Course</option>
                  <option value="Arabic Course">Arabic Course</option>
                  <option value="Noorani Qaida">Noorani Qaida</option>
                </select>
                <button
                  type="button"
                  onClick={addCourse}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                >
                  Add
                </button>
              </div>

              <label htmlFor="rate">$ Hourly Rate</label>
              <input
                id="rate"
                name="rate"
                value={formData.rate}
                onChange={handleChange
                }
                placeholder="Hourly Rate"
                className="outline-0 border border-gray-300 rounded-lg px-3 py-2"
                required
              />

              <div className="flex flex-wrap gap-2 mt-2">
                {courses.map((course, i) => (
                  <span
                    key={i}
                    className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                  >
                    {course}
                  </span>
                ))}
              </div>
            </div>

            {/* Education */}
            <div>
              <label className="block font-medium mb-2">Education Details</label>
              <textarea
                name="education"
                placeholder="Describe your education background..."
                value={formData.education}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                rows={3}
                required
              />
            </div>
          </div>

          {/* Certificates & Bio */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-700">Additional Information</h3>

            <div>
              <label className="block font-medium mb-2">Certificates (Optional)</label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  name="certificateName"
                  onChange={handleChange}
                  value={formData.certificateName}
                  className="p-3 border border-gray-300 rounded-lg"
                  placeholder="Certificate name"
                />
                <input
                  type="file"
                  name="certificateFile"
                  onChange={handleChange}
                  accept=".pdf,.jpg,.png"
                  className="flex-1 p-3 border border-gray-300 rounded-lg"
                />
                <button
                  type="button"
                  onClick={addCertificate}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                >
                  Add
                </button>
              </div>
              <div className="space-y-2">
                {certificates.map((cert, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                  >
                    <div>
                      <span className="font-medium">{cert.name}</span>
                      <span className="text-gray-500 ml-2">({cert.file.name})</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeCertificate(i)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-medium mb-2">Bio</label>
              <textarea
                name="bio"
                placeholder="Tell us about yourself and your teaching experience..."
                value={formData.bio}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                rows={4}
                required
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            {loading ? <Loader variant="button" /> : "Register as Tutor"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TutorRegisterForm;
