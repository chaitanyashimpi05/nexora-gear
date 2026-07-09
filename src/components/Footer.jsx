import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  FaGamepad, FaDiscord, FaYoutube, FaInstagram, FaTwitter, 
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane 
} from "react-icons/fa";
import { toast } from "react-toastify";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    
    // Simulate API call
    toast.success("🎮 Welcome to the Guild! You've successfully subscribed to our newsletter.", {
      position: "bottom-right",
      autoClose: 4000,
    });
    setEmail("");
  };

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "About Us", path: "/about" },
    { name: "Contact Us", path: "/contact" }
  ];

  const categories = [
    { name: "Mechanical Keyboards", path: "/shop?category=mechanical-keyboards" },
    { name: "Gaming Mouse", path: "/shop?category=gaming-mouse" },
    { name: "Gaming Monitors", path: "/shop?category=gaming-monitors" },
    { name: "Gaming Headsets", path: "/shop?category=gaming-headsets" }
  ];

  return (
    <footer className="bg-gaming-dark border-t border-neutral-900 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Logo & Intro */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <FaGamepad className="text-3xl text-gaming-cyan filter drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]" />
              <span className="font-gaming font-extrabold text-2xl tracking-tighter text-white">
                NEXORA<span className="text-gaming-cyan font-semibold">GEAR</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed font-sans">
              Level Up Your Gaming Experience. We build premium accessories engineered for speed, precision, and ultimate style.
            </p>
            {/* Socials */}
            <div className="flex space-x-4 pt-2">
              {[
                { icon: FaDiscord, url: "https://discord.gg", color: "hover:text-[#5865F2] hover:shadow-[0_0_10px_#5865F2]" },
                { icon: FaYoutube, url: "https://youtube.com", color: "hover:text-[#FF0000] hover:shadow-[0_0_10px_#FF0000]" },
                { icon: FaInstagram, url: "https://instagram.com", color: "hover:text-[#E1306C] hover:shadow-[0_0_10px_#E1306C]" },
                { icon: FaTwitter, url: "https://twitter.com", color: "hover:text-[#1DA1F2] hover:shadow-[0_0_10px_#1DA1F2]" }
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className={`p-2 bg-neutral-900 border border-neutral-800 rounded-lg text-neutral-400 transition-all duration-300 ${social.color}`}
                >
                  <social.icon className="text-lg" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-gaming text-sm uppercase tracking-wider font-bold mb-4 border-l-2 border-gaming-purple pl-2">
              Quick Navigation
            </h3>
            <ul className="space-y-2.5 text-sm font-sans text-neutral-400">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="hover:text-gaming-cyan hover:pl-1 transition-all duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-gaming text-sm uppercase tracking-wider font-bold mb-4 border-l-2 border-gaming-purple pl-2">
              Categories
            </h3>
            <ul className="space-y-2.5 text-sm font-sans text-neutral-400">
              {categories.map((cat) => (
                <li key={cat.name}>
                  <Link
                    to={cat.path}
                    className="hover:text-gaming-cyan hover:pl-1 transition-all duration-200"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information & Newsletter */}
          <div className="space-y-4">
            <h3 className="text-white font-gaming text-sm uppercase tracking-wider font-bold mb-4 border-l-2 border-gaming-purple pl-2">
              Guild Newsletter
            </h3>
            <p className="text-neutral-400 text-xs font-sans">
              Subscribe to get exclusive drops, setups, and special firmware discounts.
            </p>
            <form onSubmit={handleSubscribe} className="flex relative items-center">
              <input
                type="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 pr-12 text-sm text-gray-200 placeholder-neutral-500 focus:border-gaming-cyan focus:outline-none transition-all duration-300 font-sans"
              />
              <button
                type="submit"
                className="absolute right-1 p-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-md text-white transition-all duration-300 focus:outline-none shadow-glow-purple"
              >
                <FaPaperPlane className="text-xs" />
              </button>
            </form>
            <div className="space-y-2 pt-2 text-xs font-sans text-neutral-400">
              <div className="flex items-center space-x-2">
                <FaMapMarkerAlt className="text-gaming-cyan" />
                <span>Pune, Maharashtra, India</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaPhone className="text-gaming-cyan" />
                <span>+91 9876543210</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaEnvelope className="text-gaming-cyan" />
                <span>support@nexoragear.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="border-t border-neutral-900 pt-8 mt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-sans text-neutral-500">
          <p>© 2026 NEXORA GEAR. All Rights Reserved. (Fictional College Project)</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a href="#privacy" className="hover:text-neutral-300 transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-neutral-300 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
