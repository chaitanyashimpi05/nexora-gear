import React from "react";
import { FaShieldAlt, FaRocket, FaHeadset, FaGamepad } from "react-icons/fa";
import { motion } from "framer-motion";

const About = () => {
  const stats = [
    { value: "0ms", label: "Input Compromise" },
    { value: "100k+", label: "Gamers Armed" },
    { value: "99.8%", label: "Positive Reports" },
    { value: "1-Yr", label: "Instant Swap Warranty" }
  ];

  const milestones = [
    { year: "2024", title: "Guild Foundation", desc: "NEXORA GEAR founded in Pune with a mission to develop lag-free performance peripherals." },
    { year: "2025", title: "Hall-Effect Magnetic Switches", desc: "First in the category to introduce magnetic keyboards at accessible price thresholds." },
    { year: "2026", title: "Global Lobby Presence", desc: "Expanding distribution networks and sponsoring national esports events." }
  ];

  return (
    <div className="pt-28 pb-16 min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
      {/* Brand Intro Hero */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="inline-block px-3 py-1 bg-purple-950/40 border border-purple-800/40 rounded-full text-xs text-gaming-neonPurple uppercase tracking-widest font-gaming font-semibold">
            🛡️ Our Mission
          </div>
          <h1 className="text-4xl sm:text-5xl font-gaming font-black uppercase text-white tracking-tight leading-tight">
            ENGINEERED FOR <br />
            <span className="text-gaming-cyan">THE ELITE LOBBY</span>
          </h1>
          <p className="text-neutral-400 text-sm font-sans leading-relaxed">
            NEXORA GEAR is a fictional premium gaming accessories brand dedicated to delivering high-performance keyboards, gaming mice, monitors, headsets, mousepads, and accessories designed for gamers who demand performance and style.
          </p>
          <p className="text-neutral-400 text-sm font-sans leading-relaxed">
            Every product in our arsenal is meticulously drafted to eliminate latency, optimize grip comfort, and deliver breathtaking RGB lighting synchronicity. Whether you're climbing rankings in tactical shooters or speedrunning indie gems, we configure your deck to win.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative flex items-center justify-center"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gaming-purple/20 to-gaming-cyan/20 rounded-3xl blur-3xl opacity-50 scale-90 pointer-events-none" />
          <img
            src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800"
            alt="Esports Arena"
            className="rounded-3xl border border-neutral-850 shadow-2xl relative z-10 w-full aspect-video object-cover"
          />
        </motion.div>
      </section>

      {/* Stats Counter Section */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-gaming-dark/60 rounded-3xl border border-neutral-900 p-8 glass-card">
        {stats.map((s, idx) => (
          <div key={idx} className="text-center space-y-1">
            <span className="text-3xl sm:text-4xl font-gaming font-black text-gaming-cyan block uppercase tracking-tight">
              {s.value}
            </span>
            <span className="text-neutral-500 font-gaming uppercase tracking-widest text-[10px] block">
              {s.label}
            </span>
          </div>
        ))}
      </section>

      {/* Philosophy Timeline */}
      <section className="space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-gaming font-extrabold uppercase text-white">
            Deployment <span className="text-gaming-purple">Chronicles</span>
          </h2>
          <p className="text-neutral-400 text-sm font-sans max-w-sm mx-auto">
            Our historical timeline from local foundation to regional armory.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {milestones.map((mil, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="glass-card rounded-2xl border border-neutral-900 p-6 space-y-4 hover:border-gaming-cyan/20 transition-all duration-300 relative group"
            >
              <span className="text-4xl font-gaming font-black text-neutral-800 group-hover:text-gaming-cyan/15 transition-colors absolute top-4 right-6 select-none">
                {mil.year}
              </span>
              <h3 className="text-base font-gaming font-bold uppercase text-white pr-10">
                {mil.title}
              </h3>
              <p className="text-neutral-400 text-xs font-sans leading-relaxed">
                {mil.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
