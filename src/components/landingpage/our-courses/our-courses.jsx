"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import pic1 from "../../../assets/images/courses/1.png"
import pic2 from "../../../assets/images/courses/2.png"
import pic3 from "../../../assets/images/courses/3.jpeg"
import pic4 from "../../../assets/images/courses/4.jpeg"


gsap.registerPlugin(ScrollTrigger);

const courses = [
  {
    title: "Hifz Course",
    description: "Memorize the Quran step-by-step with expert tutors.",
    image:pic1,
  },
  {
    title: "Tajweed Course",
    description: "Master the rules of Tajweed and beautify your recitation.",
    image:pic2,
  },
  {
    title: "Arabic Course",
    description: "Understand Quranic Arabic and explore its deep meanings.",
    image:pic3,
  },
  {
    title: "Noorani Qaida",
    description: "Learn to read Arabic with correct pronunciation from scratch.",
    image:pic4,
  },
];

export default function QuranCourses() {
  const containerRef = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".why-us-section", {
        opacity: 0,
        y: 100,
        duration: 1,
        scrollTrigger: {
          trigger: ".why-us-section",
          start: "top 90%",
        },
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="bg-gradient-to-t from-blue-50 to-white  px-4 py-20 relative overflow-hidden"
    >
      {/* TITLE */}
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-blue-900 mb-4">
          Learn Quran Online – Anytime, Anywhere
        </h2>
        <p className="text-lg text-blue-800 mb-10">
          Our certified tutors offer personalized Quran learning with modern tools.
        </p>

        {/* COURSES */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {courses.map((course, idx) => (
            <div
              key={idx}
              className="course-card bg-white rounded-3xl shadow-md shadow-blue-200 transition-all duration-300 ease-in-out transform hover:-translate-y-3 hover:scale-105 hover:bg-blue-100 hover:shadow-xl hover:shadow-blue-300"
            >
              <img
                src={course.image}
                alt={course.title}
                className="rounded-t-2xl w-full h-44 object-cover"
              />
              <div className="p-5 text-left">
                <h3 className="text-xl font-semibold mb-2 text-blue-900">
                  {course.title}
                </h3>
                <p className="text-gray-700 text-sm mb-4">
                  {course.description}
                </p>
                <button className="w-full py-2 text-sm font-medium rounded-lg bg-blue-700 text-white hover:bg-blue-900 transition">
                  Enroll Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* WHY CHOOSE US */}
        <div className="why-us-section mt-24 bg-blue-950 rounded-lg p-8 text-white text-left">
          <h2 className="text-3xl font-bold text-center mb-8">Why Choose Us?</h2>
          <div className="grid md:grid-cols-2 gap-6 text-zinc-300">
            <ul className="space-y-3 list-disc list-inside">
              <li>Expert Quran instructors</li>
              <li>Customized learning schedules</li>
              <li>1-on-1 online lessons</li>
              <li>Track your progress easily</li>
            </ul>
            <ul className="space-y-3 list-disc list-inside">
              <li>Accessible on all devices</li>
              <li>Interactive learning tools</li>
              <li>Safe & kid-friendly classes</li>
              <li>Available 24/7 for support</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
