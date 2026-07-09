import React from "react";
import { motion } from "framer-motion";

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary", // primary, cyan, outline, danger
  size = "md", // sm, md, lg
  className = "",
  disabled = false,
  icon: Icon,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed font-gaming uppercase tracking-wider";
  
  const sizeStyles = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  const variantStyles = {
    primary: "bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-500 hover:to-indigo-600 text-white shadow-glow-purple focus:ring-purple-500 border border-purple-500/30",
    cyan: "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold shadow-glow-cyan focus:ring-cyan-500 border border-cyan-400/30",
    outline: "bg-transparent text-white border border-neutral-700 hover:border-gaming-cyan hover:text-gaming-neonCyan hover:shadow-glow-cyan focus:ring-gaming-cyan",
    danger: "bg-red-950/40 text-red-400 border border-red-900/60 hover:bg-red-900 hover:text-white hover:shadow-[0_0_15px_rgba(239,68,68,0.4)] focus:ring-red-500",
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      whileHover={disabled ? {} : { scale: 1.03, y: -2 }}
      whileTap={disabled ? {} : { scale: 0.97 }}
      {...props}
    >
      {Icon && <Icon className="mr-2 text-lg" />}
      {children}
    </motion.button>
  );
};

export default Button;
