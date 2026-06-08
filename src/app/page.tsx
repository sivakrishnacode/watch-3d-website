"use client";

import React, { useRef } from "react";
import { useScroll } from "framer-motion";
import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import Collections from "@/components/Collections";
import Heritage from "@/components/Heritage";
import Contact from "@/components/Contact";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress of the 500vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <main className="relative bg-[#020812] text-white">
      {/* Editorial Header Navigation */}
      <header className="fixed top-0 left-0 w-full z-40 p-6 md:p-8 flex justify-between items-center pointer-events-none">
        <a 
          href="#" 
          className="font-display text-xl md:text-2xl tracking-[0.2em] text-white hover:text-ice-400 transition-colors duration-300 pointer-events-auto"
        >
          VIRTUS
        </a>
        <nav className="hidden md:flex gap-8 pointer-events-auto">
          <a href="#collections" className="font-ui text-[10px] tracking-[0.25em] text-silver-400 hover:text-white transition-colors duration-300">
            COLLECTIONS
          </a>
          <a href="#heritage" className="font-ui text-[10px] tracking-[0.25em] text-silver-400 hover:text-white transition-colors duration-300">
            HERITAGE
          </a>
          <a href="#contact" className="font-ui text-[10px] tracking-[0.25em] text-silver-400 hover:text-white transition-colors duration-300">
            ENQUIRE
          </a>
        </nav>
        <div className="pointer-events-auto">
          <a 
            href="#contact" 
            className="font-ui text-[10px] tracking-[0.2em] text-white border border-white/10 px-4 py-2 hover:bg-white hover:text-[#020812] transition-all duration-300"
          >
            REQUEST CATALOGUE
          </a>
        </div>
      </header>

      {/* 1. SCROLLYTELLING VIEWPORT SECTION (500vh) */}
      <div ref={containerRef} className="relative h-[500vh] w-full">
        {/* Sticky Container holding Canvas and Overlay */}
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#020812]">
          <ScrollyCanvas scrollProgress={scrollYProgress} />
          <Overlay scrollProgress={scrollYProgress} />
        </div>
      </div>

      {/* 2. STATIC/SCROLLABLE PAGES */}
      <div className="relative bg-[#020812] z-20">
        <Collections />
        <Heritage />
        <Contact />
      </div>

      {/* Minimal Editorial Footer */}
      <footer className="relative z-20 bg-[#020812] border-t border-white/5 py-12 px-6 text-center">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <span className="font-display text-lg tracking-[0.2em] text-white">
            VIRTUS
          </span>
          <span className="font-ui text-[9px] tracking-[0.25em] text-silver-400 uppercase">
            © 2026 VIRTUS WATCH CO. SWISS MADE. ALL RIGHTS RESERVED.
          </span>
          <div className="flex gap-6">
            <span className="font-ui text-[9px] tracking-widest text-silver-400">COLD PRECISION</span>
            <span className="font-ui text-[9px] tracking-widest text-silver-400">HOROLOGY</span>
          </div>
        </div>
      </footer>
    </main>
  );
}

