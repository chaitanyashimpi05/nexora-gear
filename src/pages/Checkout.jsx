import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { FaTruck, FaLock, FaShoppingBag, FaArrowLeft } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { createOrder } from "../services/firebase";
import { formatCurrency, generateOrderId } from "../utils/helpers";
import { toast } from "react-toastify";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, subtotal, gst, shipping, grandTotal, clearCart } = useCart();

  const discount = location.state?.discount || 0;
  const finalGrandTotal = grandTotal - discount;

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: ""
  });

  const [formErrors, setFormErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  // Redirect if cart is empty
  useEffect(() => {
    if (cart.length === 0) {
      toast.info("🛒 Your shopping session was empty. Redirecting to cart.");
      navigate("/cart");
    }
  }, [cart, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: null }));
    }
  };


  const validateForm = () => {
    const errors = {};
    if (!formData.fullName.trim()) errors.fullName = "Full Name is required.";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = "Email is required.";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Please enter a valid email address.";
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required.";
    } else if (!phoneRegex.test(formData.phone)) {
      errors.phone = "Phone number must be a valid 10-digit Indian number.";
    }

    if (!formData.address.trim()) errors.address = "Delivery address is required.";
    if (!formData.city.trim()) errors.city = "City is required.";
    if (!formData.state.trim()) errors.state = "State is required.";

    const pinRegex = /^\d{6}$/;
    if (!formData.pincode.trim()) {
      errors.pincode = "Pincode is required.";
    } else if (!pinRegex.test(formData.pincode)) {
      errors.pincode = "Pincode must be exactly 6 digits.";
    }

    // Payment validation (None needed for Cash on Delivery)

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("⚠️ Validation failed. Please correct form errors.");
      return;
    }

    setIsProcessing(true);
    addFakeNetworkDelay();
  };

  const addFakeNetworkDelay = async () => {
    // Generate unique order ID
    const orderId = generateOrderId();

    const orderObj = {
      id: orderId,
      customer: formData,
      items: cart.map(item => ({
        productId: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image
      })),
      summary: {
        subtotal,
        discount,
        gst,
        shipping,
        total: finalGrandTotal
      },
      paymentMethod: "COD"
    };

    try {
      // Save order to Firebase / LocalStorage
      const createdOrder = await createOrder(orderObj);

      toast.success("🎮 Setup deployed! Order placed successfully.");
      clearCart();

      // Navigate to order success screen with order details
      navigate("/order-success", { state: { order: createdOrder } });
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to deploy order. Please check configuration.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="pt-28 pb-16 min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-gaming font-black uppercase text-white tracking-tight">
          Secure <span className="text-gaming-cyan">Checkout</span>
        </h1>
        <p className="text-neutral-400 text-xs font-sans">
          Deploying guest cargo. Enter billing and shipping coordinates below.
        </p>
      </div>

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Columns: Guest Info & Payments */}
        <div className="lg:col-span-2 space-y-6">

          {/* Guest Form Section */}
          <div className="glass-card rounded-2xl border border-neutral-900 p-6 space-y-4">
            <h2 className="text-base font-gaming font-extrabold uppercase text-white tracking-wide border-b border-neutral-900 pb-2 flex items-center">
              <span className="w-5 h-5 bg-gaming-purple/20 text-gaming-neonPurple rounded-full flex items-center justify-center mr-2 text-xs">1</span>
              <span>Shipping Information</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleInputChange}
                error={formErrors.fullName}
              />
              <Input
                label="Email Coordinates"
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                error={formErrors.email}
              />
              <Input
                label="Active Phone Contact"
                type="tel"
                name="phone"
                placeholder="10-digit number"
                required
                value={formData.phone}
                onChange={handleInputChange}
                error={formErrors.phone}
              />
              <Input
                label="Postal Pincode"
                name="pincode"
                placeholder="6-digit PIN"
                required
                value={formData.pincode}
                onChange={handleInputChange}
                error={formErrors.pincode}
              />
            </div>

            <Input
              label="Cargo Delivery Address"
              name="address"
              required
              value={formData.address}
              onChange={handleInputChange}
              error={formErrors.address}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="City"
                name="city"
                required
                value={formData.city}
                onChange={handleInputChange}
                error={formErrors.city}
              />
              <Input
                label="State"
                name="state"
                required
                value={formData.state}
                onChange={handleInputChange}
                error={formErrors.state}
              />
            </div>
          </div>

          {/* Simulated Payment Section (COD Only) */}
          <div className="glass-card rounded-2xl border border-neutral-900 p-6 space-y-6">
            <h2 className="text-base font-gaming font-extrabold uppercase text-white tracking-wide border-b border-neutral-900 pb-2 flex items-center">
              <span className="w-5 h-5 bg-gaming-purple/20 text-gaming-neonPurple rounded-full flex items-center justify-center mr-2 text-xs">2</span>
              <span>Payment Protocol</span>
            </h2>

            {/* Simulated Payment Choice (COD Only Visual Indicator) */}
            <div className="bg-neutral-950/65 rounded-xl border border-neutral-900 p-6 flex flex-col md:flex-row items-center gap-4">
              <div className="p-4 bg-purple-950/30 border border-gaming-purple rounded-2xl text-gaming-neonPurple shadow-glow-purple shrink-0">
                <FaTruck className="text-3xl animate-bounce" />
              </div>
              <div className="space-y-1.5 font-sans text-xs">
                <p className="text-white font-gaming uppercase tracking-widest text-sm font-black">
                  Cash On Delivery (Active Option)
                </p>
                <p className="text-neutral-400 leading-relaxed max-w-lg">
                  To keep payments simple, this store only operates on Cash on Delivery. Please pay the delivery courier in cash or via mobile UPI code scan upon arrival at your shipping destination.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Checkout Summary Details */ }
  <div className="space-y-6">
    <div className="glass-card rounded-2xl border border-neutral-900 p-6 space-y-6 sticky top-24">
      <h2 className="text-lg font-gaming font-extrabold text-white uppercase border-b border-neutral-900 pb-2 flex items-center">
        <FaShoppingBag className="mr-2 text-gaming-cyan text-sm" />
        <span>Cart Summary</span>
      </h2>

      {/* Products Thumb list */}
      <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
        {cart.map((item) => (
          <div key={item.id} className="flex items-center gap-3 border-b border-neutral-900/60 pb-3 last:border-0 last:pb-0 font-sans text-xs">
            <img src={item.image} alt="" className="w-10 h-10 object-cover rounded bg-neutral-950 border border-neutral-850" />
            <div className="flex-1 space-y-0.5 min-w-0">
              <span className="text-neutral-300 font-medium block truncate pr-1">{item.name}</span>
              <span className="text-neutral-500 text-xxs font-gaming uppercase tracking-widest">{item.quantity}x @ {formatCurrency(item.price)}</span>
            </div>
            <span className="font-gaming font-bold text-white shrink-0">{formatCurrency(item.price * item.quantity)}</span>
          </div>
        ))}
      </div>

      {/* Calculations summaries */}
      <div className="space-y-3 font-sans text-sm border-t border-neutral-900 pt-4">
        <div className="flex justify-between text-neutral-400 text-xs">
          <span>Subtotal</span>
          <span className="font-gaming font-medium">{formatCurrency(subtotal)}</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-emerald-400 text-xs">
            <span>Guild Discount Applied</span>
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
            Deploy Price
          </span>
          <span className="text-2xl font-gaming font-black text-gaming-cyan">
            {formatCurrency(finalGrandTotal)}
          </span>
        </div>
      </div>

      {/* Confirm Submit */}
      <Button
        type="submit"
        disabled={isProcessing}
        variant="primary"
        className="w-full py-4 text-xs font-bold font-gaming uppercase tracking-widest shadow-glow-purple-lg flex items-center justify-center"
      >
        <FaLock className="mr-2 text-xxs animate-pulse" />
        <span>{isProcessing ? "Deploying Order..." : "Confirm & Deploy Order"}</span>
      </Button>

      <Link
        to="/cart"
        className="inline-flex items-center justify-center space-x-2 text-2xs font-gaming font-bold uppercase tracking-wider text-neutral-500 hover:text-gaming-cyan transition-colors w-full text-center"
      >
        <FaArrowLeft className="text-3xs" />
        <span>Return to Locker</span>
      </Link>
    </div>
  </div>
      </form >
    </div >
  );
};

export default Checkout;
