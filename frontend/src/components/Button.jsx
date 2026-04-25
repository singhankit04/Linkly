import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyles = "w-full py-3 px-4 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer";
  
  const variants = {
    primary: "bg-purple-600 hover:bg-purple-700 text-white shadow-[0_0_15px_rgba(147,51,234,0.3)]",
    secondary: "bg-white/5 hover:bg-white/10 text-white border border-white/10",
    ghost: "bg-transparent hover:bg-white/5 text-gray-300 hover:text-white"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
