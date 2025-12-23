import React from "react";
import { motion } from "framer-motion";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className = "", hoverEffect = true }) => {
  return (
    <motion.div
      className={`relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 p-6 ${className}`}
      whileHover={hoverEffect ? { y: -5, boxShadow: "0 20px 40px -15px rgba(0,0,0,0.3)" } : {}}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      {children}
    </motion.div>
  );
};

export default Card;
