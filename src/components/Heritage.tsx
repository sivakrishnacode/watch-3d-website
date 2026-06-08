"use client";

import React from "react";
import { motion } from "framer-motion";

interface TimelineEvent {
  year: string;
  title: string;
  label: string;
  description: string;
}

const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    year: "1884",
    label: "THE STEEL FOUNDATION",
    title: "Glashütte Origins",
    description: "Established in the cold Swiss-German mountain valleys. Focused exclusively on forging ultra-resistant marine chronometers for oceanic exploration.",
  },
  {
    year: "1928",
    label: "CALIBRE INNOVATION",
    title: "Magnetic Resistance",
    description: "Patented the first steel-silicon alloy escape wheel, neutralizing magnetic interference from early electrical machinery.",
  },
  {
    year: "1972",
    label: "AN ELEGANT PROFILE",
    title: "Ultra-Thin Automatic",
    description: "Unveiled the record-breaking calibre 12, introducing a micro-rotor assembly that achieved an unprecedented 2.3mm thickness.",
  },
  {
    year: "2026",
    label: "THE MODERN CHRONICLE",
    title: "Virtus Evolution",
    description: "Bridging mechanical masterworks with editorial digital canvas dynamics. A study in cold steel light and kinetic scrolling.",
  },
];

export default function Heritage() {
  return (
    <section 
      id="heritage" 
      className="relative z-20 bg-[#020812] py-24 md:py-32 px-6 md:px-12 border-t border-cold overflow-hidden"
    >
      {/* Background steel-grey line decorations */}
      <div className="absolute inset-y-0 left-1/4 w-[1px] bg-white/[0.02] pointer-events-none" />
      <div className="absolute inset-y-0 left-2/4 w-[1px] bg-white/[0.02] pointer-events-none" />
      <div className="absolute inset-y-0 left-3/4 w-[1px] bg-white/[0.02] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <span className="font-ui text-[10px] md:text-xs tracking-[0.4em] text-ice-400 uppercase font-light mb-3 block">
              OUR LINEAGE
            </span>
            <h2 className="font-display text-4xl md:text-6xl tracking-[0.1em] text-white font-light uppercase">
              THE HERITAGE
            </h2>
          </div>
          <p className="font-ui text-sm text-silver-400 font-light leading-relaxed max-w-sm mt-4 md:mt-0">
            For over a century, we have shaped steel to conquer gravity, temperature, and time. No warm gold, no compromises.
          </p>
        </div>

        {/* Horizontal Timeline Container */}
        <div className="relative mt-8">
          {/* Main Horizontal Timeline Steel-Grey Divider */}
          <div className="absolute top-[80px] left-0 right-0 h-[1px] bg-white/10 hidden md:block" />

          {/* Timeline Scroll Box */}
          <div className="flex flex-col md:flex-row gap-12 md:gap-8 overflow-x-visible pb-4">
            {TIMELINE_EVENTS.map((event, index) => (
              <motion.div
                key={event.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: index * 0.15, ease: "easeOut" }}
                className="flex-1 min-w-[280px] relative flex flex-col items-start"
              >
                {/* Timeline node & Year (Desktop only layout connector) */}
                <div className="h-[80px] w-full items-end hidden md:flex pb-6 relative">
                  {/* Floating Year */}
                  <span className="font-display text-4xl text-white font-light tracking-wide">
                    {event.year}
                  </span>
                  {/* Glowing connector node */}
                  <div className="absolute bottom-[-4.5px] left-0 w-2.5 h-2.5 rounded-full bg-electric-500 border border-ice-400 shadow-blue-glow z-10" />
                </div>

                {/* Mobile only Year Header */}
                <div className="flex items-baseline gap-4 md:hidden mb-4">
                  <span className="font-display text-3xl text-white font-light">
                    {event.year}
                  </span>
                  <div className="h-[1px] flex-grow bg-white/10 min-w-[50px]" />
                </div>

                {/* Card Content */}
                <div className="pt-2">
                  <span className="font-ui text-[9px] tracking-[0.2em] text-ice-400 font-medium uppercase mb-2 block">
                    {event.label}
                  </span>
                  <h3 className="font-display text-xl text-white font-light mb-3">
                    {event.title}
                  </h3>
                  <p className="font-ui text-xs md:text-sm text-silver-400 font-light leading-relaxed max-w-xs">
                    {event.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
