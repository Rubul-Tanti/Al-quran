// components/AppPromo.tsx
import { FaGooglePlay, FaApple } from 'react-icons/fa';

const AppPromo = () => {
  return (
    <section className="bg-teal-50 py-20 px-6 md:px-12 lg:px-24">
      <div className=" mx-auto flex flex-row  md:flex-row items-center justify-center gap-12">
        
        {/* Left Content */}
        <div className="flex-1  text-center md:text-left">
          <h2 className="text-4xl  text-center font-bold text-gray-800 mb-4">
            One Platform to <span className="text-pink-900">Learn or Teach Quran</span><br />
            All in Your Pocket
          </h2>
          <p className="text-gray-600 text-lg  text-center mb-8">
            Access Quran classes anywhere, anytime. Whether you're a teacher or a student, our mobile app makes your journey smooth and flexible. Available now on Android and iOS.
          </p>

          <div className="flex flex-row  sm:flex-row gap-4 justify-center md:justify-center ">
            <a
              href="#"
              className="flex items-center gap-2 bg-pink-900 text-white px-5 py-3 rounded-full hover:bg-pink-800 transition"
            >
              <FaGooglePlay className="text-xl" />
              <span>Get it on Play Store</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-2 border-2 border-pink-900 text-pink-900 px-5 py-3 rounded-full hover:bg-pink-50 transition"
            >
              <FaApple className="text-xl" />
              <span>Download on App Store</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppPromo;
