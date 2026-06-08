"use client";

import React from "react";
import { motion, MotionValue, useTransform } from "framer-motion";

interface OverlayProps {
  scrollProgress: MotionValue<number>;
}

export default function Overlay({ scrollProgress }: OverlayProps) {
  // Phase 1: Center Hero Text (0% - 15% scroll)
  const heroOpacity = useTransform(scrollProgress, [0, 0.15], [1, 0]);
  const heroY = useTransform(scrollProgress, [0, 0.15], [0, -80]);

  // Phase 2: Left Side Collection (20% - 45% scroll)
  const collectionOpacity = useTransform(scrollProgress, [0.18, 0.26, 0.38, 0.46], [0, 1, 1, 0]);
  const collectionY = useTransform(scrollProgress, [0.18, 0.26, 0.38, 0.46], [60, 0, 0, -60]);

  // Phase 3: Right Side Craftsmanship (50% - 75% scroll)
  const craftOpacity = useTransform(scrollProgress, [0.48, 0.56, 0.68, 0.76], [0, 1, 1, 0]);
  const craftY = useTransform(scrollProgress, [0.48, 0.56, 0.68, 0.76], [60, 0, 0, -60]);

  // Floating helper prompt for the user at the bottom (0% - 85% scroll)
  const scrollIndicatorOpacity = useTransform(scrollProgress, [0, 0.05, 0.8, 0.85], [1, 1, 0, 0]);

  return (
    <div className="absolute inset-0 z-10 w-full h-full pointer-events-none overflow-hidden select-none">
      {/* 1. HERO HERO TEXT (Center) */}
      <motion.div
        style={{ opacity: heroOpacity, y: heroY }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
      >
        <h2 className="font-display text-5xl md:text-8xl tracking-[0.25em] text-white uppercase font-light leading-none">
          VIRTUS
        </h2>
        <div className="h-[1px] w-24 bg-electric-500 my-6 md:my-8" />
        <p className="font-ui text-xs md:text-sm tracking-[0.4em] text-ice-400 uppercase font-light">
          Precision In Cold Steel
        </p>
      </motion.div>

      {/* 2. COLLECTION DETAILS (Left Side) */}
      <motion.div
        style={{ opacity: collectionOpacity, y: collectionY }}
        className="absolute left-[8%] right-[8%] md:right-auto md:left-[12%] top-[30%] md:top-[35%] max-w-md flex flex-col items-start text-left"
      >
        <span className="font-ui text-[10px] md:text-xs tracking-[0.3em] text-ice-400 uppercase font-medium mb-3">
          01 // DESIGN SYSTEM
        </span>
        <h3 className="font-display text-3xl md:text-5xl tracking-[0.05em] text-white font-light leading-tight mb-4">
          AETHER BLUE
        </h3>
        <p className="font-ui text-sm md:text-base text-silver-400 leading-relaxed font-light font-sans max-w-sm">
          A cinematic light sweep across the ceramic bezel highlights the hand-finished steel. 
          Sculpted surfaces reflect a dark, near-black navy environment.
        </p>
        <div className="flex gap-4 mt-6">
          <div className="h-[1px] w-12 bg-electric-500/50 self-center" />
          <span className="font-ui text-[10px] tracking-widest text-silver-400 font-light uppercase">
            AUTOMATIC CALIBRE
          </span>
        </div>
      </motion.div>

      {/* 3. CRAFTSMANSHIP DETAILS (Right Side) */}
      <motion.div
        style={{ opacity: craftOpacity, y: craftY }}
        className="absolute left-[8%] right-[8%] md:left-auto md:right-[12%] top-[30%] md:top-[35%] max-w-md flex flex-col items-start md:items-end text-left md:text-right"
      >
        <span className="font-ui text-[10px] md:text-xs tracking-[0.3em] text-ice-400 uppercase font-medium mb-3">
          02 // HOROLOGY
        </span>
        <h3 className="font-display text-3xl md:text-5xl tracking-[0.05em] text-white font-light leading-tight mb-4">
          SWISS PRECISION
        </h3>
        <p className="font-ui text-sm md:text-base text-silver-400 leading-relaxed font-light font-sans max-w-sm">
          Every gear is micro-machined and finished by hand. 
          Cold-room assembly ensures absolute airtight integrity, 
          guaranteeing accuracy within standard chronometer specifications.
        </p>
        <div className="flex gap-4 mt-6 md:flex-row-reverse">
          <div className="h-[1px] w-12 bg-electric-500/50 self-center" />
          <span className="font-ui text-[10px] tracking-widest text-silver-400 font-light uppercase">
            SAPPHIRE CRYSTAL BACK
          </span>
        </div>
      </motion.div>

      {/* Scroll indicator prompt */}
      <motion.div
        style={{ opacity: scrollIndicatorOpacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center gap-2"
      >
        <span className="font-ui text-[9px] tracking-[0.3em] text-silver-400 uppercase font-light">
          SCROLL TO EXPLORE
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="w-[1px] h-10 bg-gradient-to-b from-white to-transparent"
        />
      </motion.div>
    </div>
  );
}
