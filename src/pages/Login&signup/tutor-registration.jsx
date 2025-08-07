import React, { useState } from "react";

const TutorRegisterForm = () => {
  const [languages, setLanguages] = useState([]);
  const [courses, setCourses] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [formData, setFormData] = useState({
    fullName: "",
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
  });

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
      if (fileInput) fileInput.value = '';
    }
  };

  const removeCertificate = (index) => {
    setCertificates(certificates.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submissionData = {
      ...formData,
      languages,
      courses,
      certificates,
    };
    console.log("Submitted:", submissionData);
    alert("Registration submitted successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl p-8">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Tutor Registration
        </h2>

        <div className="space-y-8">
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
                className="mt-3 text-sm"
              />
            </div>

            {/* Personal Info */}
            <div className="flex-1 space-y-4">
              <h3 className="text-lg font-semibold text-gray-700">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  name="fullName"
                  type="text"
                  placeholder="Full Name"
                  value={formData.fullName}
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
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                <input
                  name="country"
                  type="text"
                  placeholder="Country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  required
                />
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
              <div className="flex flex-wrap gap-2">
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
              
              {/* Display added certificates */}
              <div className="space-y-2">
                {certificates.map((cert, i) => (
                  <div key={i} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
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
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Register as Tutor
          </button>
        </div>
      </div>
    </div>
  );
};

export default TutorRegisterForm;