import React from "react";
import { Link } from "react-router-dom";
import { FaSkull, FaHome, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import Button from "../components/ui/Button";

const NotFound = () => {
  return (
    <div className="pt-28 pb-16 min-h-screen max-w-md mx-auto px-4 flex flex-col items-center justify-center text-center space-y-8 select-none">
      {/* Skull Icon */}
      <motion.div
        animate={{ 
          rotate: [0, -10, 10, -10, 10, 0],
          scale: [1, 1.05, 1]
        }}
        transition={{ 
          duration: 3, 
          repeat: Infinity,
          repeatType: "mirror"
        }}
        className="p-6 bg-red-950/20 border border-red-900/60 rounded-full text-red-500 shadow-[0_0_25px_rgba(239,68,68,0.3)]"
      >
        <FaSkull className="text-6xl" />
      </motion.div>

      {/* Main warning text */}
      <div className="space-y-3">
        <h1 className="text-5xl font-gaming font-black uppercase text-red-500 tracking-wider shadow-glow-purple-lg">
          GAME OVER
        </h1>
        <h2 className="text-sm font-gaming font-extrabold uppercase text-neutral-400 tracking-widest">
          404 - Coordinates Lost
        </h2>
        <p className="text-neutral-500 font-sans text-xs max-w-sm mx-auto leading-relaxed">
          The quadrant you are attempting to jump into has been eliminated or never existed. Return to HQ to resume operations.
        </p>
      </div>

      {/* Navigation options */}
      <div className="flex gap-4 w-full">
        <Link to="/" className="flex-1">
          <Button variant="outline" className="w-full" icon={FaHome}>
            Respawn Home
          </Button>
        </Link>
        <Link to="/shop" className="flex-1">
          <Button variant="cyan" className="w-full">
            <span>Shop Armory</span>
            <FaArrowRight className="ml-1 text-2xs" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
