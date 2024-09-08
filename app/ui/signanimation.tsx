"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Space_Grotesk } from "next/font/google"


const space = Space_Grotesk({
    weight: ["300", "400", "500", "600", "700"],
    subsets: ["latin"],
  });

const cryptoIcons = [
  { id: 'btc', address: '3FZbgi29cpjq2GjdwV***HuJJnkLtktZc5' },
  { id: 'eth', address: '0xb794f5ea0ba39494ce839613fffba74279579268' },
  { id: 'bnb', address: '0x10d543e2e0355e36c5cab769df8d2d60abb77' },
  { id: 'sol', address: '7EcDhSYGxXyscszYEp35KHN8vvw3svAuLKTzXwCFLtV' },
  { id: 'ltc', address: 'MGxNPPB7eBoWPUaprtX9v9CXJZoD2465zN' },
  { id: 'ton', address: 'EQCI7d2SQ9ili8W41vpsIuaMyVmBMQcsBxEcM01UE5aL' },
  { id: 'tron', address: 'TBia4uHnb3oSSZm5isP284cA7Np1v15Vhi' },
];

const CryptoAnimation = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % cryptoIcons.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
      <div className="relative flex items-center justify-center">
        {cryptoIcons.map((icon, index) => (
          <motion.div
            key={icon.id}
            className="absolute flex items-center justify-center p-1 py-2 backdrop-blur-2xl bg-black/[0.06] w-64 rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: index === currentIndex ? 1 : 0 }}
            transition={{ duration: .5, ease: "easeInOut" }}
          >
            <span className={`${space.className} text-sm font-medium`}>{icon.address.slice(0, 24)}...</span>
          </motion.div>
        ))}
      </div>

  );
};

export default CryptoAnimation;
