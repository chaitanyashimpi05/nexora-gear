import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaTrash, FaShoppingCart, FaArrowLeft, FaCheck, FaPercent } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { formatCurrency } from "../utils/helpers";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../components/ui/Button";

const Cart = () => {
  const navigate = useNavigate();
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    gst,
    shipping,
    grandTotal,
    shippingThreshold
  } = useCart();

  // Simulated Promo Code
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);

  const applyPromoCode = (e) => {
    e.preventDefault();
    if (promoApplied) {
      toast.info("💡 Only one coupon allowed per guild checkout.");
      return;
    }

    if (promoCode.trim().toUpperCase() === "NEXORASTREAM") {
      setDiscount(Math.round(subtotal * 0.1)); // 10% discount
      setPromoApplied(true);
      toast.success("🎮 Promo code applied! Enjoy 10% off your gaming setup.");
    } else {
      toast.error("❌ Invalid promo code! Try NEXORASTREAM");
    }
  };

  const handleCheckout = () => {
    navigate("/checkout", { state: { discount } });
  };

  // Free shipping progress indicator
  const progressToFreeShipping = Math.min(100, (subtotal / shippingThreshold) * 100);
  const amountNeededForFreeShipping = shippingThreshold - subtotal;

  if (cart.length === 0) {
    return (
      <div className="pt-28 pb-16 min-h-screen max-w-2xl mx-auto px-4 flex flex-col items-center justify-center text-center space-y-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="p-6 bg-neutral-900 border border-neutral-800 rounded-full text-gaming-purple shadow-glow-purple"
        >
          <FaShoppingCart className="text-6xl" />
        </motion.div>
        <div className="space-y-2">
          <h1 className="text-3xl font-gaming font-extrabold uppercase tracking-tight text-white">
            Cart is <span className="text-gaming-cyan">Empty</span>
          </h1>
          <p className="text-neutral-400 font-sans text-sm max-w-sm">
            Your shopping locker is currently empty. Go to the armory to find weapons of gaming destruction!
          </p>
        </div>
        <Link to="/shop">
          <Button variant="primary" size="md">
            Go To Armory
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-16 min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-gaming font-black uppercase text-white tracking-tight">
          Shopping <span className="text-gaming-cyan">Cart</span>
        </h1>
        <p className="text-neutral-400 text-xs font-sans">
          Review your gaming hardware list before deploying to checkout.
        </p>
      </div>

      {/* Cart Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Items List */}
        <div className="lg:col-span-2 space-y-4">
          {/* Progressive Free Shipping Alert */}
          {subtotal < shippingThreshold ? (
            <div className="glass-card rounded-2xl border border-neutral-900 p-4 space-y-2 font-sans">
              <div className="flex justify-between text-xs text-neutral-300">
                <span>
                  Add <span className="font-bold text-gaming-cyan">{formatCurrency(amountNeededForFreeShipping)}</span> more for <span className="text-gaming-cyan font-bold">FREE SHIPPING</span>
                </span>
                <span className="font-semibold text-xxs uppercase tracking-wider text-neutral-500">
                  {Math.round(progressToFreeShipping)}% Configured
                </span>
              </div>
              <div className="w-full bg-neutral-950 rounded-full h-2 overflow-hidden border border-neutral-900">
                <div
                  className="bg-gradient-to-r from-gaming-purple to-gaming-cyan h-full rounded-full transition-all duration-500"
                  style={{ width: `${progressToFreeShipping}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-2 text-emerald-400 bg-emerald-950/20 px-4 py-3 rounded-2xl border border-emerald-900/40 text-xs font-sans">
              <FaCheck className="text-sm" />
              <span>Congratulations! Your order qualifies for <strong>Free Express Shipping</strong>.</span>
            </div>
          )}

          {/* Cart Table Header */}
          <div className="hidden sm:grid grid-cols-6 text-[10px] uppercase font-gaming font-bold tracking-widest text-neutral-500 bg-neutral-900/40 border border-neutral-900 rounded-xl px-4 py-2.5">
            <span className="col-span-3">Product details</span>
            <span className="text-center">Price</span>
            <span className="text-center">Quantity</span>
            <span className="text-right">Subtotal</span>
          </div>

          {/* Items Map */}
          <div className="space-y-3">
            <AnimatePresence>
              {cart.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  className="glass-card rounded-2xl border border-neutral-900 p-4 grid grid-cols-1 sm:grid-cols-6 gap-4 items-center"
                >
                  {/* Photo & Name */}
                  <div className="col-span-1 sm:col-span-3 flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover bg-neutral-950 rounded-xl border border-neutral-850 flex-shrink-0"
                    />
                    <div className="space-y-0.5">
                      <Link to={`/product/${item.id}`}>
                        <h4 className="text-white font-gaming font-bold text-sm hover:text-gaming-cyan transition-colors line-clamp-1">
                          {item.name}
                        </h4>
                      </Link>
                      <span className="text-[10px] uppercase font-semibold text-neutral-500 font-gaming">
                        {item.category.replace("-", " ")}
                      </span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="text-center text-sm font-gaming text-neutral-300">
                    <span className="sm:hidden text-neutral-500 mr-2">Unit:</span>
                    {formatCurrency(item.price)}
                  </div>

                  {/* Quantity Actions */}
                  <div className="flex justify-center items-center">
                    <div className="flex items-center bg-neutral-950 border border-neutral-850 rounded-lg p-0.5">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center text-xs font-bold text-neutral-400 hover:text-white rounded transition-colors"
                      >
                        -
                      </button>
                      <span className="w-6 text-center text-xs font-gaming font-bold text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center text-xs font-bold text-neutral-400 hover:text-white rounded transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Subtotal & Delete */}
                  <div className="flex items-center justify-between sm:justify-end gap-4 text-right">
                    <span className="sm:hidden text-neutral-500 text-sm">Total:</span>
                    <div className="text-sm font-gaming font-bold text-white">
                      {formatCurrency(item.price * item.quantity)}
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2.5 bg-neutral-950/60 border border-neutral-850 text-neutral-500 hover:text-red-400 hover:border-red-900 rounded-lg transition-colors focus:outline-none"
                    >
                      <FaTrash className="text-xs" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Cart Buttons */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4">
            <Link
              to="/shop"
              className="inline-flex items-center space-x-2 text-xs font-gaming font-bold uppercase tracking-wider text-neutral-400 hover:text-gaming-cyan transition-colors"
            >
              <FaArrowLeft />
              <span>Continue Shopping</span>
            </Link>
            <button
              onClick={clearCart}
              className="text-xs font-gaming font-bold uppercase tracking-widest text-neutral-500 hover:text-red-400 border border-neutral-900 hover:border-red-900/40 bg-transparent px-4 py-2.5 rounded-lg transition-all"
            >
              Clear Cart
            </button>
          </div>
        </div>

        {/* Right Column: Checkout Summary */}
        <div className="space-y-6">
          <div className="glass-card rounded-2xl border border-neutral-900 p-6 space-y-6 sticky top-24">
            <h2 className="text-lg font-gaming font-extrabold text-white uppercase border-b border-neutral-900 pb-2">
              Order Summary
            </h2>

            {/* Simulated Coupon Field */}
            <form onSubmit={applyPromoCode} className="flex gap-2">
              <input
                type="text"
                placeholder="Coupon e.g. NEXORASTREAM"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                disabled={promoApplied}
                className="flex-1 bg-neutral-950 border border-neutral-850 rounded-lg px-3 py-2 text-xs text-gray-200 placeholder-neutral-500 focus:outline-none focus:border-gaming-cyan transition-colors"
              />
              <button
                type="submit"
                disabled={promoApplied}
                className="px-4 py-2 bg-neutral-900 hover:bg-neutral-850 border border-neutral-850 rounded-lg text-neutral-400 hover:text-gaming-cyan text-xs font-gaming font-bold uppercase tracking-widest disabled:opacity-40 transition-colors"
              >
                <FaPercent className="text-xxs inline-block mr-1" />
                <span>Apply</span>
              </button>
            </form>

            {/* Calculations lines */}
            <div className="space-y-3 font-sans text-sm">
              <div className="flex justify-between text-neutral-400 text-xs">
                <span>Items Subtotal</span>
                <span className="font-gaming font-medium">{formatCurrency(subtotal)}</span>
              </div>
              
              {discount > 0 && (
                <div className="flex justify-between text-emerald-400 text-xs">
                  <span>10% Guild Discount</span>
                  <span className="font-gaming font-medium">-{formatCurrency(discount)}</span>
                </div>
              )}

              <div className="flex justify-between text-neutral-400 text-xs">
                <span>GST (18% calculated)</span>
                <span className="font-gaming font-medium">{formatCurrency(gst)}</span>
              </div>

              <div className="flex justify-between text-neutral-400 text-xs">
                <span>Shipping Charges</span>
                <span className="font-gaming font-medium">
                  {shipping === 0 ? <span className="text-emerald-400 font-bold">FREE</span> : formatCurrency(shipping)}
                </span>
              </div>

              <div className="border-t border-neutral-900 pt-4 flex justify-between items-baseline">
                <span className="font-gaming font-extrabold uppercase text-white tracking-wide">
                  Grand Total
                </span>
                <span className="text-2xl font-gaming font-black text-gaming-cyan">
                  {formatCurrency(grandTotal - discount)}
                </span>
              </div>
            </div>

            {/* Checkout Button */}
            <Button
              onClick={handleCheckout}
              variant="primary"
              className="w-full py-3.5 shadow-glow-purple-lg"
            >
              Secure Guest Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
