import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaShoppingCart, FaBars, FaTimes, FaGamepad, FaChevronDown } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { getCategories } from "../services/firebase";

const Navbar = () => {
  const { cartCount } = useCart();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [categories, setCategories] = useState([]);
  const [showCatDropdown, setShowCatDropdown] = useState(false);

  // Handle scroll backdrop effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch categories for navbar dropdown
  useEffect(() => {
    const fetchCats = async () => {
      const cats = await getCategories();
      setCategories(cats);
    };
    fetchCats();
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    setShowCatDropdown(false);
  }, [location]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" }
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "glass-nav py-3 shadow-[0_4px_30px_rgba(0,0,0,0.8)] border-b border-purple-500/10"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <FaGamepad className="text-3xl text-gaming-cyan group-hover:text-gaming-neonPurple transition-colors duration-300 filter drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]" />
            <span className="font-gaming font-extrabold text-2xl tracking-tighter bg-gradient-to-r from-white via-neutral-200 to-gaming-purple bg-clip-text text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:via-gaming-neonCyan group-hover:to-gaming-neonPurple transition-all duration-300">
              NEXORA<span className="text-gaming-cyan font-semibold">GEAR</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`font-gaming text-sm uppercase tracking-widest font-semibold hover:text-gaming-neonCyan hover:neon-glow-cyan transition-all duration-200 ${
                  location.pathname === link.path
                    ? "text-gaming-cyan neon-glow-cyan"
                    : "text-gray-300"
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Categories Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setShowCatDropdown(true)}
              onMouseLeave={() => setShowCatDropdown(false)}
            >
              <button
                className="flex items-center space-x-1 font-gaming text-sm uppercase tracking-widest font-semibold text-gray-300 hover:text-gaming-neonCyan hover:neon-glow-cyan transition-all duration-200 focus:outline-none"
              >
                <span>Categories</span>
                <FaChevronDown className={`text-xs transition-transform duration-200 ${showCatDropdown ? "transform rotate-180" : ""}`} />
              </button>
              
              <AnimatePresence>
                {showCatDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-0 mt-2 w-56 rounded-lg glass-card border border-purple-500/20 shadow-2xl p-2"
                  >
                    {categories.map((cat) => (
                      <Link
                        key={cat.id}
                        to={`/shop?category=${cat.id}`}
                        className="block px-4 py-2 text-sm rounded-md text-gray-300 hover:bg-purple-950/40 hover:text-gaming-neonCyan transition-all duration-200"
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Cart Icon & Mobile Hamburger */}
          <div className="flex items-center space-x-4">
            <Link
              to="/cart"
              className="relative p-2.5 rounded-full bg-neutral-900/60 border border-neutral-800 text-gray-300 hover:text-gaming-neonCyan hover:border-gaming-cyan/40 hover:shadow-glow-cyan transition-all duration-300 group"
            >
              <FaShoppingCart className="text-xl group-hover:scale-110 transition-transform duration-200" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xxs font-bold rounded-full w-5 h-5 flex items-center justify-center border border-black shadow-[0_0_8px_#7c3aed]">
                  {cartCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2.5 rounded-full bg-neutral-900/60 border border-neutral-800 text-gray-300 hover:text-gaming-neonCyan hover:border-gaming-cyan/40 focus:outline-none transition-all duration-300"
            >
              {isOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden glass-nav border-t border-purple-500/10 shadow-2xl overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`block px-3 py-2.5 rounded-md font-gaming text-base uppercase tracking-widest font-semibold ${
                    location.pathname === link.path
                      ? "text-gaming-cyan bg-purple-950/20 border-l-4 border-gaming-cyan"
                      : "text-gray-300 hover:text-white hover:bg-neutral-900"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              
              <div className="border-t border-neutral-800 pt-3 mt-3">
                <span className="px-3 text-xs uppercase tracking-wider text-neutral-500 font-gaming block mb-2">
                  Browse Categories
                </span>
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/shop?category=${cat.id}`}
                    className="block px-6 py-2 text-sm text-gray-400 hover:text-gaming-cyan"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
