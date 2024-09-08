"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { LuSunMedium } from "react-icons/lu";
import { FaRegMoon } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const DarkToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="relative w-10 h-10">
      <button
        className="outline-none w-full h-full flex items-center justify-center" 
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        <AnimatePresence>
          {theme === "light" ? (
            <motion.div
              key="moon"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.17 }}
              className="absolute flex items-center justify-center" 
            >
              <FaRegMoon className="rotate-[-21deg]" size={21} />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.17 }}
              className="absolute flex items-center justify-center"
            >
              <LuSunMedium size={25} />
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
};

export default DarkToggle;
