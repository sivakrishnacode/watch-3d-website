"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface WatchProduct {
  id: string;
  name: string;
  price: string;
  specs: string;
  image: string;
  desc: string;
}

const PRODUCTS: WatchProduct[] = [
  {
    id: "aether-blue",
    name: "Aether Blue",
    price: "$6,400",
    specs: "AUTOMATIC CALIBRE // 41MM",
    image: "/watch_aether_blue.png",
    desc: "Featuring a deep navy bezel with light-sweep dynamics and manual finish.",
  },
  {
    id: "nadir-chrono",
    name: "Nadir Chrono",
    price: "$8,200",
    specs: "CHRONOMETER CALIBRE // 40MM",
    image: "/watch_nadir_chrono.png",
    desc: "Triple subdials in silver brushed steel, paired with hand-stitched navy leather.",
  },
  {
    id: "chronos-navy",
    name: "Chronos Navy",
    price: "$4,800",
    specs: "MINIMALIST CALIBRE // 38MM",
    image: "/watch_chronos_navy.png",
    desc: "An ultra-thin execution highlighting a single electric-blue sweep second hand.",
  },
];

export default function Collections() {
  return (
    <section id="collections" className="relative z-20 bg-[#020812] py-24 md:py-32 px-6 md:px-12 border-t border-cold">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <span className="font-ui text-[10px] md:text-xs tracking-[0.4em] text-ice-400 uppercase font-light mb-3">
            EXPLORE THE SERIES
          </span>
          <h2 className="font-display text-4xl md:text-6xl tracking-[0.1em] text-white font-light uppercase mb-6">
            THE COLLECTIONS
          </h2>
          <div className="h-[1px] w-16 bg-electric-500/50 mb-6" />
          <p className="font-ui text-sm text-silver-400 max-w-md font-light leading-relaxed">
            Swiss precision engineered with an icy steel finish. Each edition represents a unique study in cold light and horological craftsmanship.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {PRODUCTS.map((watch, index) => (
            <motion.div
              key={watch.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.15, ease: [0.215, 0.61, 0.355, 1] }}
              whileHover={{ y: -8 }}
              className="group relative backdrop-blur-md bg-[#020812]/40 border border-cold hover:border-ice-400/30 rounded-none p-6 flex flex-col justify-between hover:shadow-blue-glow-hover transition-all duration-500 ease-out"
            >
              {/* Image Container */}
              <div className="relative aspect-square w-full overflow-hidden bg-navy-950/80 border border-white/5 mb-6">
                <Image
                  src={watch.image}
                  alt={watch.name}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-w-768px) 100vw, 33vw"
                  priority
                />
                {/* Cold subtle overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#020812]/30 to-transparent pointer-events-none" />
              </div>

              {/* Product Info */}
              <div className="flex flex-col flex-grow">
                <span className="font-ui text-[9px] tracking-[0.2em] text-silver-400 uppercase font-light mb-2">
                  {watch.specs}
                </span>
                
                <div className="flex justify-between items-baseline mb-3">
                  <h3 className="font-display text-2xl tracking-wide text-white font-light">
                    {watch.name}
                  </h3>
                  <span className="font-ui text-sm text-ice-400 font-light">
                    {watch.price}
                  </span>
                </div>

                <p className="font-ui text-xs text-silver-400 leading-relaxed font-light mb-6">
                  {watch.desc}
                </p>
              </div>

              {/* Action Divider & CTA */}
              <div className="mt-auto pt-6 border-t border-white/5">
                <a
                  href="#contact"
                  className="block w-full text-center font-ui text-[10px] tracking-[0.25em] text-white font-light uppercase border border-white/10 py-3 hover:bg-electric-500 hover:border-electric-500 hover:shadow-blue-glow transition-all duration-300"
                >
                  ENQUIRE NOW
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
