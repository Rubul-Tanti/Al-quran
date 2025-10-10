import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import webLogo from "../../../public/webLogo.png"
import {Link} from "react-router-dom"
const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-blue-50 to-blue-100 text-blue-900 py-10 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo & Security */}
        <div>
           <Link to={"/"}>
          <img src={webLogo} alt="weblogo" className="h-6 md:h-10"/>
        </Link>
        </div>

        {/* Company Info */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Company Info</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#">About Us</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">Mobile App</a></li>
            <li><a href="#">Blog</a></li>
          </ul>
        </div>

        {/* Courses */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Courses</h3>
          <ul className="space-y-2 text-sm">
            <li>Recitation</li>
            <li>Arabic</li>
            <li>Hifz</li>
            <li>Tajweed</li>
            <li><strong>Teachers</strong></li>
          </ul>
        </div>

        {/* Useful Links & App */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Useful Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#">FAQs</a></li>
            <li><a href="#">Technical Support</a></li>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Tutor Evaluation</a></li>
          </ul>

          <div className="mt-5">
            <h3 className="font-semibold text-sm mb-2">Follow us:</h3>
            <div className="flex space-x-3 text-blue-800">
              <FaFacebookF className="w-5 h-5 hover:text-blue-500 cursor-pointer" />
              <FaInstagram className="w-5 h-5 hover:text-pink-500 cursor-pointer" />
              <FaLinkedinIn className="w-5 h-5 hover:text-blue-700 cursor-pointer" />
            </div>
          </div>

          <div className="mt-5">
            <p className="font-semibold text-sm mb-2">Download Qtuor App</p>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/512px-Google_Play_Store_badge_EN.svg.png"
              alt="Get it on Google Play"
              className="w-36"
            />
          </div>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="text-center mt-10 text-xs text-blue-700">
        © {new Date().getFullYear()} Qtuor. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
