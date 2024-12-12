"use client";
import { motion } from "framer-motion";
import React from "react";

function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      className="h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 1 }}
    >
      {children}
    </motion.div>
  );
}

export default Template;
