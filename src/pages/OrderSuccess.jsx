import React, { useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { FaTrophy, FaArrowRight, FaMapMarkerAlt, FaShippingFast, FaCheckCircle } from "react-icons/fa";
import { formatCurrency } from "../utils/helpers";
import Button from "../components/ui/Button";

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;

  // Redirect to home if accessed directly without order data
  useEffect(() => {
    if (!order) {
      navigate("/");
    }
  }, [order, navigate]);

  if (!order) return null;

  // Calculate simulated delivery date (current date + 3 days)
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 3);
  const formattedDeliveryDate = deliveryDate.toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  return (
    <div className="pt-28 pb-16 min-h-screen max-w-4xl mx-auto px-4 flex flex-col items-center justify-center space-y-10">
      {/* Victory Icon Animation Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex p-6 bg-emerald-950/20 border border-emerald-900/60 rounded-full text-emerald-400 shadow-glow-cyan animate-bounce mb-2">
          <FaTrophy className="text-5xl" />
        </div>
        <h1 className="text-4xl font-gaming font-black uppercase tracking-tight text-white leading-none">
          Setup <span className="text-gaming-cyan">Deployed!</span>
        </h1>
        <p className="text-neutral-400 font-sans text-sm max-w-md mx-auto">
          Your order request was verified and written to Firestore. Your combat equipment is preparing for logistics.
        </p>
      </div>

      {/* Order Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        {/* Receipt Box */}
        <div className="glass-card rounded-2xl border border-neutral-900 p-6 md:col-span-2 space-y-6">
          <div className="flex justify-between items-center border-b border-neutral-900 pb-3">
            <h2 className="text-xs uppercase font-gaming font-bold text-neutral-400 tracking-wider">
              Tactical Bill details
            </h2>
            <span className="text-xs font-bold text-gaming-cyan font-gaming">
              ID: {order.id}
            </span>
          </div>

          {/* Items Map */}
          <div className="space-y-4 max-h-[220px] overflow-y-auto pr-1">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 border-b border-neutral-950 pb-3 last:border-0 last:pb-0 font-sans text-xs">
                <img src={item.image} alt="" className="w-10 h-10 object-cover rounded bg-neutral-950 border border-neutral-850" />
                <div className="flex-1 space-y-0.5">
                  <span className="text-neutral-300 font-medium block truncate pr-1">{item.name}</span>
                  <span className="text-neutral-500 text-xxs font-gaming uppercase tracking-widest">{item.quantity}x @ {formatCurrency(item.price)}</span>
                </div>
                <span className="font-gaming font-bold text-white shrink-0">{formatCurrency(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>

          {/* Pricing Calculations */}
          <div className="border-t border-neutral-900 pt-4 space-y-2 text-xs font-sans text-neutral-400">
            <div className="flex justify-between">
              <span>Items Subtotal</span>
              <span className="font-gaming">{formatCurrency(order.summary.subtotal)}</span>
            </div>
            {order.summary.discount > 0 && (
              <div className="flex justify-between text-emerald-400">
                <span>Guild Coupon Applied</span>
                <span className="font-gaming">-{formatCurrency(order.summary.discount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>GST Calculation (18%)</span>
              <span className="font-gaming">{formatCurrency(order.summary.gst)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping Charges</span>
              <span className="font-gaming">
                {order.summary.shipping === 0 ? <span className="text-emerald-400 font-bold uppercase">Free</span> : formatCurrency(order.summary.shipping)}
              </span>
            </div>
            <div className="border-t border-neutral-900 pt-3 flex justify-between items-baseline text-sm text-white">
              <span className="font-gaming font-extrabold uppercase tracking-wide">Total Deployed Cost</span>
              <span className="text-lg font-gaming font-black text-gaming-cyan">{formatCurrency(order.summary.total)}</span>
            </div>
          </div>
        </div>

        {/* Shipping & Delivery info column */}
        <div className="glass-card rounded-2xl border border-neutral-900 p-6 space-y-6">
          <h2 className="text-xs uppercase font-gaming font-bold text-neutral-400 tracking-wider border-b border-neutral-900 pb-3 flex items-center">
            <FaShippingFast className="mr-1.5 text-gaming-cyan text-sm" />
            <span>Cargo Logistics</span>
          </h2>

          <div className="space-y-4 text-xs font-sans">
            <div className="space-y-1">
              <span className="text-[10px] text-neutral-500 uppercase tracking-wider block font-gaming">
                Recipient coordinates
              </span>
              <p className="text-white font-medium">{order.customer.fullName}</p>
              <p className="text-neutral-400">{order.customer.phone}</p>
              <p className="text-neutral-400 truncate">{order.customer.email}</p>
            </div>

            <div className="space-y-1 pt-2 border-t border-neutral-950">
              <span className="text-[10px] text-neutral-500 uppercase tracking-wider block font-gaming">
                Delivery Address
              </span>
              <div className="flex items-start gap-1">
                <FaMapMarkerAlt className="text-gaming-purple mt-0.5 shrink-0 text-xxs" />
                <p className="text-neutral-400 leading-normal">
                  {order.customer.address}, {order.customer.city}, {order.customer.state} - {order.customer.pincode}
                </p>
              </div>
            </div>

            <div className="space-y-1.5 pt-2 border-t border-neutral-950 text-xxs font-gaming uppercase tracking-wider">
              <span className="text-[10px] text-neutral-500 block">
                Estimated Landing
              </span>
              <p className="text-gaming-cyan font-bold leading-normal">
                {formattedDeliveryDate}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Return options */}
      <div className="flex space-x-4">
        <Link to="/">
          <Button variant="outline" size="md">
            Return Home
          </Button>
        </Link>
        <Link to="/shop">
          <Button variant="cyan" size="md">
            <span>Continue Shopping</span>
            <FaArrowRight className="ml-1 text-xxs" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;
