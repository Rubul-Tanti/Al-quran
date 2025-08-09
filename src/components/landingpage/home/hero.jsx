import heroImage from "../../../assets/images/landingpage/hero.png"

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-white py-20 px-6 md:px-12 lg:px-24 text-gray-800">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
        
        {/* Left Content */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
            Learn or Teach the <span className="text-blue -600">Quran Online</span><br />
            For Kids & Adults
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Join a trusted platform where teachers can guide students to recite, memorize, and understand the Quran. Interactive, personalized, and flexible online classes for everyone.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button className="bg-blue-900 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-900 transition duration-300">
              Start Learning
            </button>
            <button className="border-2 border-blue-900 text-blue-900 px-6 py-3 rounded-full font-semibold hover:bg-blue-50 transition duration-300">
              Become a Teacher
            </button>
          </div>
        </div>  

        {/* Right Image */}
        <div className="flex-1">
          <img
            src={heroImage}
            alt="Learn Quran Online"
            className="w-full max-w-md mx-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
