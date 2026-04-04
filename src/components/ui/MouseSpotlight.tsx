"use client";

import React, { useEffect } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

const MouseSpotlight: React.FC = () => {
  const mouseX = useMotionValue(-100); // Start off-screen
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 20, stiffness: 100, mass: 0.5 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Center the spotlight on the cursor
      mouseX.set(e.clientX - 200); 
      mouseY.set(e.clientY - 200);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="pointer-events-none fixed z-30 rounded-full opacity-60 mix-blend-screen"
      style={{
        x,
        y,
        width: 400,
        height: 400,
        background: "radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, rgba(59, 130, 246, 0) 70%)",
        filter: "blur(40px)",
      }}
    />
  );
};

export default MouseSpotlight;
