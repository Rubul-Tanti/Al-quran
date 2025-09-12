import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import Hero from "../../../assets/images/landingpage/hero2.png"
export default function QuranHero() {
  return (
    <section>
  <marquee direction="right" className="py-2">
بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ خَلَقَ الْإِنْسَانَ مِنْ عَلَقٍ اقْرَأْ وَرَبُّكَ الْأَكْرَمُ الَّذِي عَلَّمَ بِالْقَلَمِ عَلَّمَ الْإِنْسَانَ مَا لَمْ يَعْلَمْ كَلَّا إِنَّ الْإِنْسَانَ لَيَطْغَىٰ أَنْ رَآهُ اسْتَغْنَىٰ إِنَّ إِلَىٰ رَبِّكَ الرُّجْعَىٰ أَرَأَيْتَ الَّذِي يَنْهَىٰ عَبْدًا إِذَا صَلَّىٰ أَرَأَيْتَ إِنْ كَانَ عَلَى الْهُدَىٰ أَوْ أَمَرَ بِالتَّقْوَىٰ أَرَأَيْتَ إِنْ كَذَّبَ وَتَوَلَّىٰ أَلَمْ يَعْلَمْ بِأَنَّ اللَّهَ يَرَىٰ كَلَّا لَئِنْ لَمْ يَنْتَهِ لَنَسْفَعًا بِالنَّاصِيَةِ نَاصِيَةٍ كَاذِبَةٍ خَاطِئَةٍ فَلْيَدْعُ نَادِيَهُ سَنَدْعُ الزَّبَانِيَةَ كَلَّا لَا تُطِعْهُ وَاسْجُدْ وَاقْتَرِبْ ۩
</marquee>


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
          <div className="flx-1 rounded-l-[30%]  overflow-hidden">
            <img
              src={Hero}
              alt="Online Quran Lesson"
              className=" max-w-md mx-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

