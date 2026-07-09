import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  FaRocket, FaShieldAlt, FaUndo, FaHeadset, 
  FaTrophy, FaCreditCard, FaChevronLeft, FaChevronRight 
} from "react-icons/fa";
import { getProducts, getCategories } from "../services/firebase";
import ProductCard from "../components/ProductCard";
import SkeletonLoader from "../components/SkeletonLoader";
import Button from "../components/ui/Button";
import { getCategoryIcon } from "../utils/helpers";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodsData, catsData] = await Promise.all([
          getProducts(),
          getCategories()
        ]);
        setProducts(prodsData);
        setCategories(catsData);
      } catch (err) {
        console.error("Error loading home page data: ", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const featuredProducts = products.filter(p => p.featured).slice(0, 3);
  const bestSellers = products.filter(p => p.bestSeller).slice(0, 3);
  const newArrivals = products.filter(p => p.newArrival).slice(0, 3);

  // Why choose us items
  const valueProps = [
    { icon: FaTrophy, title: "Premium Accessories", desc: "Crafted with aircraft-grade metals and professional switches." },
    { icon: FaRocket, title: "Blazing Fast Delivery", desc: "Free dispatch within 24 hours. Secure tracking included." },
    { icon: FaCreditCard, title: "Secure Payments", desc: "UPI, Cards, or Cash on Delivery. Fully simulated security." },
    { icon: FaUndo, title: "Easy 14-Day Returns", desc: "Zero questions asked. Simple, automated return process." },
    { icon: FaShieldAlt, title: "1-Year Full Warranty", desc: "Immediate replacement for any manufacturer defect." },
    { icon: FaHeadset, title: "24/7 Dedicated Support", desc: "Join our Discord guild or shoot our team an email." }
  ];

  // Testimonials
  const testimonials = [
    { name: "Karan Johar", role: "Ranked Immortal Player", text: "Nexora Gear has transformed my competitive setups. The Phantom Claw mouse is insanely light and accurate!", rating: 5 },
    { name: "Ananya Panday", role: "Valkyrie Streamer", text: "The NovaBlade keyboard looks and sounds like a custom-built mechanical masterpiece. My chat keeps asking about it!", rating: 5 },
    { name: "Sid Malhotra", role: "Speedrunner", text: "The VisionX monitor is pure speed. 165Hz makes target tracking effortless. Incredible quality for this budget.", rating: 4.8 }
  ];

  const handleNextTestimonial = () => {
    setTestimonialIdx((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrevTestimonial = () => {
    setTestimonialIdx((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="space-y-24 pb-16 overflow-hidden">
      {/* 1. Hero Banner */}
      <section className="relative min-h-[95vh] flex items-center justify-center pt-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-950/20 via-black to-black">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(255,255,255,0.01)_1px,_transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
        
        {/* Glow Spheres */}
        <div className="absolute top-[20%] left-[10%] w-[350px] h-[350px] bg-gaming-purple/10 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" />
        <div className="absolute bottom-[20%] right-[10%] w-[350px] h-[350px] bg-gaming-cyan/5 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-center lg:text-left py-12">
          {/* Hero Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 max-w-2xl mx-auto lg:mx-0"
          >
            <div className="inline-flex items-center space-x-2 bg-purple-950/40 border border-purple-800/40 rounded-full px-4 py-1.5 text-xs text-gaming-neonPurple uppercase tracking-widest font-gaming font-semibold shadow-[0_0_15px_rgba(168,85,247,0.2)]">
              <span>🚀 Premium Gaming Arsenal</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-gaming font-extrabold tracking-tight leading-[1.05] text-white">
              LEVEL UP <br />
              <span className="rgb-gradient-text">EVERY MATCH</span>
            </h1>
            
            <p className="text-gray-400 text-base sm:text-lg max-w-lg mx-auto lg:mx-0 leading-relaxed font-sans">
              Premium gaming accessories built for gamers who demand speed, precision, and style. Command the lobby with NEXORA GEAR.
            </p>
            
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
              <Link to="/shop">
                <Button variant="primary" size="lg" className="shadow-glow-purple-lg">
                  Shop Now
                </Button>
              </Link>
              <a href="#categories">
                <Button variant="outline" size="lg">
                  Explore Collection
                </Button>
              </a>
            </div>
          </motion.div>

          {/* Hero Media / Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex items-center justify-center group"
          >
            {/* Ambient image background glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-gaming-purple/20 to-gaming-cyan/20 rounded-3xl blur-3xl opacity-60 scale-90 group-hover:scale-100 transition-all duration-700 pointer-events-none" />
            <img
              src="https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=800"
              alt="Gaming Setup"
              className="rounded-3xl border border-neutral-800 shadow-[0_0_50px_rgba(0,0,0,0.8)] z-10 w-full max-w-[500px] aspect-video object-cover animate-float"
            />
          </motion.div>
        </div>
      </section>

      {/* 2. Shop By Category */}
      <section id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl sm:text-4xl font-gaming font-extrabold uppercase tracking-tight">
            Shop by <span className="text-gaming-cyan">Category</span>
          </h2>
          <p className="text-neutral-400 max-w-xl mx-auto text-sm font-sans">
            Gear up with precision. Select a division below to customize your loadout.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-44 bg-neutral-900/60 rounded-2xl animate-pulse border border-neutral-950" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat, idx) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="group relative h-48 rounded-2xl overflow-hidden glass-card border border-neutral-900/80 shadow-lg hover:border-gaming-cyan/40 transition-all duration-300"
              >
                {/* Background image overlay */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={cat.banner}
                    alt={cat.name}
                    className="w-full h-full object-cover opacity-20 group-hover:opacity-30 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                </div>

                {/* Content */}
                <div className="relative z-10 h-full p-6 flex flex-col justify-between items-start">
                  <div className="p-3 bg-neutral-950/60 rounded-xl border border-neutral-850 text-gaming-cyan group-hover:text-gaming-neonPurple group-hover:border-gaming-purple/40 transition-all duration-300">
                    {getCategoryIcon(cat.icon, "text-xl")}
                  </div>
                  
                  <div className="space-y-1 mt-4">
                    <h3 className="text-lg font-gaming font-extrabold text-white uppercase group-hover:text-gaming-neonCyan transition-colors duration-200">
                      {cat.name}
                    </h3>
                    <p className="text-neutral-400 text-xxs font-sans leading-relaxed line-clamp-2 pr-4">
                      {cat.description}
                    </p>
                  </div>
                  
                  <Link
                    to={`/shop?category=${cat.id}`}
                    className="absolute right-4 bottom-4 p-2 bg-neutral-950/80 border border-neutral-800 text-neutral-400 rounded-full group-hover:bg-gaming-cyan group-hover:text-black group-hover:border-gaming-cyan/40 transition-all duration-300"
                  >
                    <FaChevronRight className="text-xs" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* 3. Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between border-b border-neutral-900 pb-4 mb-10 gap-4">
          <div className="text-center sm:text-left">
            <h2 className="text-3xl font-gaming font-extrabold uppercase text-white">
              Featured <span className="text-gaming-purple">Gear</span>
            </h2>
            <p className="text-neutral-400 text-xs font-sans mt-1">Our highly-recommended esports equipment.</p>
          </div>
          <Link to="/shop">
            <Button variant="outline" size="sm">View All Shop</Button>
          </Link>
        </div>

        {loading ? (
          <SkeletonLoader count={3} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* 4. Best Sellers & New Arrivals Row */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Best Sellers */}
        <div className="space-y-8">
          <div className="border-b border-neutral-900 pb-4">
            <h2 className="text-2xl font-gaming font-extrabold uppercase text-white">
              🏆 Best <span className="text-gaming-cyan">Sellers</span>
            </h2>
            <p className="text-neutral-400 text-xs font-sans">Tested and approved by thousands of gamers.</p>
          </div>

          {loading ? (
            <div className="space-y-4">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="h-28 bg-neutral-900/60 rounded-xl animate-pulse border border-neutral-950" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {bestSellers.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          )}
        </div>

        {/* New Arrivals */}
        <div className="space-y-8">
          <div className="border-b border-neutral-900 pb-4">
            <h2 className="text-2xl font-gaming font-extrabold uppercase text-white">
              🔥 New <span className="text-gaming-purple">Arrivals</span>
            </h2>
            <p className="text-neutral-400 text-xs font-sans">The latest innovations in high-performance gear.</p>
          </div>

          {loading ? (
            <div className="space-y-4">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="h-28 bg-neutral-900/60 rounded-xl animate-pulse border border-neutral-950" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {newArrivals.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 5. Why Choose Us */}
      <section className="bg-gaming-dark/60 py-16 border-y border-neutral-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl font-gaming font-extrabold uppercase tracking-tight">
              Why Choose <span className="text-gaming-purple">Nexora Gear</span>
            </h2>
            <p className="text-neutral-400 max-w-xl mx-auto text-sm font-sans">
              We focus on building elite equipment with zero compromises.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {valueProps.map((prop, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="glass-card rounded-2xl p-6 border border-neutral-900/80 hover:border-purple-500/20 transition-all duration-300 group flex items-start space-x-4"
              >
                <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800 text-gaming-purple group-hover:text-gaming-cyan group-hover:shadow-[0_0_10px_#06b6d4] transition-all duration-300">
                  <prop.icon className="text-2xl" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-white font-gaming font-bold text-base uppercase">
                    {prop.title}
                  </h3>
                  <p className="text-neutral-400 text-xs font-sans leading-relaxed">
                    {prop.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Customer Reviews */}
      <section className="max-w-4xl mx-auto px-4 text-center space-y-8">
        <div className="space-y-3">
          <h2 className="text-3xl font-gaming font-extrabold uppercase text-white">
            What Gamers <span className="text-gaming-cyan">Say</span>
          </h2>
          <p className="text-neutral-400 text-sm font-sans">Real reports from professional and casual esports players.</p>
        </div>

        {/* Testimonial Box */}
        <div className="glass-card rounded-2xl p-8 md:p-12 border border-neutral-900 shadow-2xl relative">
          <div className="absolute top-4 left-6 text-gaming-purple text-5xl font-serif select-none opacity-20">“</div>
          
          <div className="space-y-6">
            <p className="text-neutral-200 text-base md:text-lg italic font-sans leading-relaxed relative z-10">
              {testimonials[testimonialIdx].text}
            </p>
            <div>
              <h4 className="text-white font-gaming font-bold uppercase tracking-wider text-sm">
                {testimonials[testimonialIdx].name}
              </h4>
              <span className="text-gaming-cyan text-xs font-medium font-gaming">
                {testimonials[testimonialIdx].role}
              </span>
            </div>
          </div>

          {/* Testimonial Selectors */}
          <div className="flex justify-center space-x-4 mt-8">
            <button
              onClick={handlePrevTestimonial}
              className="p-2 bg-neutral-950/60 border border-neutral-850 hover:border-gaming-purple/40 hover:text-white rounded-full text-neutral-400 transition-colors"
            >
              <FaChevronLeft className="text-xs" />
            </button>
            <button
              onClick={handleNextTestimonial}
              className="p-2 bg-neutral-950/60 border border-neutral-850 hover:border-gaming-purple/40 hover:text-white rounded-full text-neutral-400 transition-colors"
            >
              <FaChevronRight className="text-xs" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
