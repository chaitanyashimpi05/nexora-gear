import React, { useState } from "react";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaPaperPlane, FaBroadcastTower } from "react-icons/fa";
import { submitContactMessage } from "../services/firebase";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Name is required.";
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errs.email = "Email is required.";
    } else if (!emailRegex.test(formData.email)) {
      errs.email = "Please enter a valid email address.";
    }
    
    if (!formData.subject.trim()) errs.subject = "Subject is required.";
    if (!formData.message.trim()) errs.message = "Message is required.";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    try {
      await submitContactMessage(formData);
      toast.success("🎮 Message sent successfully! The NEXORA team will contact you soon.", {
        position: "bottom-right"
      });
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to send message. Try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-28 pb-16 min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Title */}
      <div className="text-center space-y-4 mb-10">
        <h1 className="text-4xl font-gaming font-extrabold uppercase tracking-tight">
          CONTACT <span className="text-gaming-cyan">THE GUILD</span>
        </h1>
        <p className="text-neutral-400 text-xs font-sans max-w-xl mx-auto">
          Encountered a bug, require bulk peripheral shipments, or want to discuss sponsorships? Shoot our technical officers a transmission.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left Column: Coordinates & Cyber Map */}
        <div className="space-y-6 flex flex-col justify-between">
          {/* Coordinates Card */}
          <div className="glass-card rounded-2xl border border-neutral-900 p-6 space-y-6">
            <h2 className="text-base font-gaming font-extrabold uppercase text-white tracking-wide border-b border-neutral-900 pb-2">
              Corporate Coordinates
            </h2>

            <div className="space-y-4 font-sans text-sm text-neutral-400">
              <div className="flex items-start space-x-3.5">
                <div className="p-2.5 bg-neutral-950 rounded-lg text-gaming-cyan border border-neutral-850 mt-0.5">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <span className="text-[10px] text-neutral-500 uppercase tracking-wider block font-gaming mb-0.5">Corporate HQ</span>
                  <p className="text-white">Pune, Maharashtra, India</p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <div className="p-2.5 bg-neutral-950 rounded-lg text-gaming-cyan border border-neutral-850 mt-0.5">
                  <FaPhone />
                </div>
                <div>
                  <span className="text-[10px] text-neutral-500 uppercase tracking-wider block font-gaming mb-0.5">Voice Line</span>
                  <p className="text-white">+91 9876543210</p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <div className="p-2.5 bg-neutral-950 rounded-lg text-gaming-cyan border border-neutral-850 mt-0.5">
                  <FaEnvelope />
                </div>
                <div>
                  <span className="text-[10px] text-neutral-500 uppercase tracking-wider block font-gaming mb-0.5">Mail Transmissions</span>
                  <p className="text-white">support@nexoragear.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <div className="p-2.5 bg-neutral-950 rounded-lg text-gaming-cyan border border-neutral-850 mt-0.5">
                  <FaClock />
                </div>
                <div>
                  <span className="text-[10px] text-neutral-500 uppercase tracking-wider block font-gaming mb-0.5">Comms Hours</span>
                  <p className="text-white">Monday – Saturday</p>
                  <p className="text-neutral-500 text-xs">10:00 AM – 8:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Cyber Maps Radar Simulation (Highly Premium Look) */}
          <div className="glass-card rounded-2xl border border-neutral-900 p-6 flex-1 min-h-[250px] relative overflow-hidden flex flex-col justify-center items-center">
            {/* Grid Backdrop */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(6,182,212,0.03)_1px,_transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
            
            {/* Radar Sweeper Circle */}
            <div className="w-48 h-48 rounded-full border border-gaming-cyan/15 flex items-center justify-center relative animate-pulse-glow">
              <div className="w-32 h-32 rounded-full border border-gaming-cyan/20 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full border border-gaming-cyan/30 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-gaming-cyan shadow-glow-cyan animate-ping" />
                </div>
              </div>
              
              {/* Radar sweep lines */}
              <div className="absolute top-0 bottom-0 left-1/2 border-l border-gaming-cyan/10" />
              <div className="absolute left-0 right-0 top-1/2 border-t border-gaming-cyan/10" />

              {/* Glowing Location PIN */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/3 left-1/3 flex flex-col items-center cursor-pointer group"
              >
                <FaBroadcastTower className="text-gaming-neonCyan text-2xl filter drop-shadow-[0_0_8px_#22d3ee]" />
                <span className="text-[9px] font-gaming font-extrabold uppercase tracking-widest text-black bg-gaming-cyan px-2 py-0.5 rounded border border-cyan-400 mt-1 shadow-[0_0_8px_#22d3ee]">
                  HQ PUNE
                </span>
              </motion.div>
            </div>
            
            <span className="text-[10px] text-neutral-500 font-gaming uppercase tracking-widest mt-4">
              Satellite Location Radar
            </span>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="glass-card rounded-2xl border border-neutral-900 p-6 space-y-6">
          <h2 className="text-base font-gaming font-extrabold uppercase text-white tracking-wide border-b border-neutral-900 pb-2">
            Secure Comms Form
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Sender Handle / Full Name"
              name="name"
              required
              value={formData.name}
              onChange={handleInputChange}
              error={errors.name}
            />

            <Input
              label="Email Credentials"
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              error={errors.email}
            />

            <Input
              label="Transmission Subject"
              name="subject"
              required
              value={formData.subject}
              onChange={handleInputChange}
              error={errors.subject}
            />

            <Input
              label="Message Body"
              placeholder="Draft your query here..."
              name="message"
              required
              textarea
              rows={5}
              value={formData.message}
              onChange={handleInputChange}
              error={errors.message}
            />

            <Button
              type="submit"
              disabled={submitting}
              variant="primary"
              className="w-full py-3.5 shadow-glow-purple-lg"
              icon={FaPaperPlane}
            >
              {submitting ? "Transmitting..." : "Send Comms Transmission"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
