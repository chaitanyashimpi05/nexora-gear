import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaStar, FaShoppingCart, FaArrowRight, FaEye } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import Button from "./ui/Button";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    toast.success(`🎮 Added ${product.name} to Cart!`, {
      position: "bottom-right",
      autoClose: 2000
    });
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.stockStatus === "out-of-stock") {
      toast.error("❌ Out of stock! Cannot checkout.", {
        position: "bottom-right",
        autoClose: 2500
      });
      return;
    }
    addToCart(product, 1);
    navigate("/checkout");
  };

  // Helper for rendering stars
  const renderStars = (rating) => {
    const stars = [];
    const floorRating = Math.floor(rating);
    for (let i = 1; i <= 5; i++) {
      if (i <= floorRating) {
        stars.push(<FaStar key={i} className="text-yellow-400 text-xs" />);
      } else if (i - 0.5 <= rating) {
        stars.push(<FaStar key={i} className="text-yellow-400 opacity-60 text-xs" />);
      } else {
        stars.push(<FaStar key={i} className="text-neutral-700 text-xs" />);
      }
    }
    return stars;
  };

  const stockBadge = {
    "in-stock": { text: "In Stock", class: "bg-emerald-950/60 text-emerald-400 border border-emerald-900/60" },
    "low-stock": { text: "Low Stock", class: "bg-amber-950/60 text-amber-400 border border-amber-900/60" },
    "out-of-stock": { text: "Out of Stock", class: "bg-red-950/60 text-red-400 border border-red-900/60" },
  };

  const formatCategory = (catId) => {
    return catId
      .split("-")
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 15 }}
      transition={{ duration: 0.4 }}
      className="glass-card glass-card-hover rounded-2xl overflow-hidden p-4 flex flex-col justify-between h-[480px] group border border-neutral-900 relative"
    >
      <div>
        {/* Card Header & Image */}
        <div className="relative w-full h-44 bg-neutral-950 rounded-xl overflow-hidden mb-4 flex items-center justify-center">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out select-none"
            loading="lazy"
          />
          {/* Overlay tags */}
          <div className="absolute top-2 left-2 flex flex-col space-y-1.5">
            <span className="text-[10px] px-2 py-0.5 rounded-full font-gaming font-semibold bg-purple-950/80 border border-purple-800/40 text-gaming-neonPurple tracking-wider uppercase">
              {formatCategory(product.category)}
            </span>
          </div>

          <div className="absolute top-2 right-2">
            <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-gaming font-semibold tracking-wider uppercase ${stockBadge[product.stockStatus].class}`}>
              {stockBadge[product.stockStatus].text}
            </span>
          </div>

          {/* Quick view button on hover */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300 z-10">
            <Link
              to={`/product/${product.id}`}
              className="flex items-center space-x-2 px-4 py-2 bg-white text-black font-gaming font-semibold rounded-lg text-xs uppercase tracking-wider scale-90 group-hover:scale-100 transition-all duration-300 shadow-[0_0_15px_white]"
            >
              <FaEye />
              <span>Details</span>
            </Link>
          </div>
        </div>

        {/* Card Body */}
        <div className="space-y-2">
          {/* Title & Rating */}
          <div className="flex justify-between items-start gap-2">
            <Link to={`/product/${product.id}`}>
              <h3 className="text-white font-gaming font-bold text-base hover:text-gaming-cyan transition-colors duration-200 line-clamp-1">
                {product.name}
              </h3>
            </Link>
            <div className="flex items-center space-x-1 mt-1 bg-neutral-900/60 px-1.5 py-0.5 rounded border border-neutral-800">
              <span className="text-[10px] font-bold text-yellow-400 font-sans">{product.rating}</span>
              <div className="flex">{renderStars(product.rating)}</div>
            </div>
          </div>

          {/* Short Desc */}
          <p className="text-neutral-400 text-xs font-sans leading-relaxed line-clamp-2">
            {product.shortDesc}
          </p>
        </div>
      </div>

      {/* Card Footer & Call to Actions */}
      <div className="mt-4 pt-4 border-t border-neutral-900/60 space-y-3">
        {/* Price & Buy Info */}
        <div className="flex justify-between items-baseline">
          <span className="text-[10px] uppercase font-semibold text-neutral-500 tracking-wider font-gaming">Price</span>
          <span className="text-xl font-gaming font-black text-white bg-gradient-to-r from-white via-white to-gaming-cyan bg-clip-text">
            ₹{product.price.toLocaleString("en-IN")}
          </span>
        </div>

        {/* Buttons Grid */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleAddToCart}
            disabled={product.stockStatus === "out-of-stock"}
            className="flex items-center justify-center py-2.5 rounded-lg border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700 hover:bg-neutral-950/60 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed group focus:outline-none"
            title="Add to Cart"
          >
            <FaShoppingCart className="mr-1.5 text-xs text-gaming-cyan group-hover:scale-110 transition-transform duration-200" />
            <span className="font-gaming font-semibold text-xxs uppercase tracking-wider">Add to Cart</span>
          </button>
          
          <button
            onClick={handleBuyNow}
            disabled={product.stockStatus === "out-of-stock"}
            className="flex items-center justify-center py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-gaming font-semibold text-xxs uppercase tracking-wider shadow-glow-purple disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 focus:outline-none"
          >
            <span>Buy Now</span>
            <FaArrowRight className="ml-1 text-2xs animate-pulse" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
