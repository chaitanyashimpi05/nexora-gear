import React from "react";

const Input = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  name,
  id,
  required = false,
  textarea = false,
  rows = 4,
  error,
  className = "",
  ...props
}) => {
  const inputId = id || name;
  const inputClass = `w-full bg-gaming-dark/60 border ${
    error ? "border-red-500/60 focus:border-red-500 focus:ring-red-500/30" : "border-neutral-800 focus:border-gaming-purple focus:ring-gaming-purple/30"
  } rounded-lg px-4 py-3 text-gray-200 placeholder-neutral-500 outline-none focus:ring-4 transition-all duration-300 font-sans glass-card`;

  return (
    <div className={`flex flex-col space-y-1 w-full ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="text-xs font-semibold uppercase tracking-wider text-neutral-400 font-gaming mb-1"
        >
          {label} {required && <span className="text-gaming-cyan">*</span>}
        </label>
      )}
      {textarea ? (
        <textarea
          id={inputId}
          name={name}
          rows={rows}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className={inputClass}
          {...props}
        />
      ) : (
        <input
          id={inputId}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className={inputClass}
          {...props}
        />
      )}
      {error && <span className="text-xs text-red-500 mt-1 font-sans">{error}</span>}
    </div>
  );
};

export default Input;
