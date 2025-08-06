import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

export default function QuranHero() {
  return (
    <section>
    <p className="pl-4 py-2 text-sm text-blue-800 bg-blue-100 w-full flex items-center gap-2">
  <Link
    to="/"
    className="hover:text-blue-600 transition-colors duration-200 font-medium"
  >
    Home
  </Link>
  <span>/</span>
  <Link
    to="/our-course"
    className="hover:text-blue-600 transition-colors duration-200 font-medium"
  >
    Our Course
  </Link>
  <span>/</span>
  <Link
    to="/subscription-plans"
    className="hover:text-blue-600 transition-colors duration-200 font-medium"
  >
    our-courses
  </Link>
</p>


      <div className="relative bg-gradient-to-br from-blue-50 to-white text-blue-900 py-16 px-6 md:px-20 overflow-hidden">
        {/* Optional overlay image background */}
        <div className="absolute inset-0 bg-[url('/path-to-your-bg.jpg')] bg-cover bg-center opacity-10 z-0"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
          {/* Left content */}
          <div className="max-w-xl">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Learn the Quran Online with Our Courses
            </h1>
            <p className="text-lg mb-6">
              Join interactive classes, practice tajweed, and memorize the Quran from anywhere in the world.
            </p>
            <Link
              to="/free-lesson"
              className="inline-flex items-center gap-2 bg-pink-900 text-white font-semibold px-6 py-3 rounded-md shadow hover:bg-pink-800 transition"
            >
              Try Free Lesson <FaArrowRight />
            </Link>
          </div>

          {/* Right side image */}
          <div className="w-full md:w-1/2">
            <img
              src="/images/quran-lesson-illustration.png"
              alt="Online Quran Lesson"
              className="w-full max-w-md mx-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

