"use client";
import React from "react";
import { SparklesCore } from "@/components/ui/sparkles";
import { motion } from "framer-motion";

export function SparklesPreview() {
  return (
    <>
      <div className="w-full absolute top-[88px] h-[calc(100vh-88px)]">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>
      <motion.h1 
        className="text-6xl font-semibold tracking-tight"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 120 }}
       >
        Welcome to the Survey!
      </motion.h1>
    </>
  );
}
