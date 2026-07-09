import React from "react";
import { 
  FaKeyboard, FaMousePointer, FaLayerGroup, 
  FaTv, FaHeadphones, FaGamepad 
} from "react-icons/fa";

// Format currency to Indian Rupee (₹)
export const formatCurrency = (value) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(value);
};

// Generate custom Order ID (e.g. NXR202612345)
export const generateOrderId = () => {
  const prefix = "NXR2026";
  const randomNum = Math.floor(100000 + Math.random() * 900000); // 6-digit random number
  return `${prefix}${randomNum}`;
};

// Map icon string name to React Icon Component
export const getCategoryIcon = (iconName, className = "") => {
  const icons = {
    FaKeyboard: FaKeyboard,
    FaMousePointer: FaMousePointer,
    FaLayerGroup: FaLayerGroup,
    FaTv: FaTv,
    FaHeadphones: FaHeadphones,
    FaGamepad: FaGamepad
  };

  const IconComponent = icons[iconName] || FaGamepad;
  return <IconComponent className={className} />;
};
