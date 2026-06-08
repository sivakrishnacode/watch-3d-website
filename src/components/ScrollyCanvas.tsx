"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, MotionValue } from "framer-motion";

interface ScrollyCanvasProps {
  scrollProgress: MotionValue<number>;
}

export default function ScrollyCanvas({ scrollProgress }: ScrollyCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const totalCount = 150;

  // rAF refs — all mutable, never trigger re-render
  const rafIdRef = useRef<number | null>(null);
  const targetFrameRef = useRef<number>(0);
  const lastDrawnFrameRef = useRef<number>(-1);

  // ── 1. Lock scroll until every frame is in memory ──────────────────────────
  useEffect(() => {
    const lock = () => {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    };
    const unlock = () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
    if (!isLoaded) lock(); else unlock();
    return unlock;
  }, [isLoaded]);

  // ── 2. Preload all frames eagerly ───────────────────────────────────────────
  useEffect(() => {
    let loaded = 0;
    const images: HTMLImageElement[] = new Array(totalCount);

    for (let i = 0; i < totalCount; i++) {
      const paddedIndex = String(i).padStart(3, "0");
      const img = new Image();
      img.src = `/sequence/frame_${paddedIndex}_delay-0.066s.webp`;

      const done = () => {
        loaded++;
        setLoadedCount(loaded);
        if (loaded === totalCount) setIsLoaded(true);
      };
      img.onload = done;
      img.onerror = () => {
        console.error(`Frame ${i} failed to load`);
        done();
      };
      images[i] = img;
    }
    imagesRef.current = images;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── 3. rAF-gated rendering — one unified effect ────────────────────────────
  useEffect(() => {
    if (!isLoaded) return;

    /** Draw a single frame onto the canvas with object-fit:cover semantics */
    const drawFrame = (index: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      const img = imagesRef.current[index];
      if (!ctx || !img) return;

      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      const nextW = Math.round(rect.width * dpr);
      const nextH = Math.round(rect.height * dpr);
      const sizeChanged = canvas.width !== nextW || canvas.height !== nextH;

      // Nothing to do — same frame, same size
      if (!sizeChanged && index === lastDrawnFrameRef.current) return;

      if (sizeChanged) {
        canvas.width = nextW;
        canvas.height = nextH;
      }

      // setTransform avoids accumulating scale across repeated calls
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const cw = rect.width;
      const ch = rect.height;
      const iw = img.naturalWidth || img.width;
      const ih = img.naturalHeight || img.height;

      const scale = Math.max(cw / iw, ch / ih); // cover
      const x = (cw - iw * scale) / 2;
      const y = (ch - ih * scale) / 2;

      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, x, y, iw * scale, ih * scale);
      lastDrawnFrameRef.current = index;
    };

    /** Request a paint on the next animation frame (deduplicated) */
    const scheduleFrame = (index: number) => {
      targetFrameRef.current = index;
      if (rafIdRef.current === null) {
        rafIdRef.current = requestAnimationFrame(() => {
          drawFrame(targetFrameRef.current);
          rafIdRef.current = null;
        });
      }
    };

    const handleScroll = (progress: number) => {
      const idx = Math.min(totalCount - 1, Math.max(0, Math.floor(progress * totalCount)));
      scheduleFrame(idx);
    };

    const handleResize = () => {
      lastDrawnFrameRef.current = -1; // force redraw even if same frame index
      handleScroll(scrollProgress.get());
    };

    // Wire up listeners
    const unsubscribe = scrollProgress.on("change", handleScroll);
    window.addEventListener("resize", handleResize, { passive: true });

    // Paint first frame immediately after unlock
    handleScroll(scrollProgress.get());

    return () => {
      unsubscribe();
      window.removeEventListener("resize", handleResize);
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [isLoaded, scrollProgress, totalCount]);

  const percentage = Math.round((loadedCount / totalCount) * 100);

  return (
    <div className="relative w-full h-full bg-[#020812]">
      {/* Canvas — invisible until every frame is ready */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{ opacity: isLoaded ? 1 : 0, transition: "opacity 0.7s ease-in-out" }}
      />

      {/* Luxury preloader — blocks interaction and hides canvas */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#020812]"
          >
            <div className="flex flex-col items-center max-w-xs w-full px-6">
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="font-display text-4xl sm:text-5xl tracking-[0.3em] text-white uppercase text-center mb-10"
              >
                VIRTUS
              </motion.h1>

              {/* Animated progress bar */}
              <div className="w-full h-[2px] bg-white/5 relative overflow-hidden mb-4 rounded-full">
                <motion.div
                  className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-electric-500 to-ice-400"
                  style={{ width: `${percentage}%` }}
                  transition={{ ease: "easeOut" }}
                />
              </div>

              <div className="w-full flex justify-between items-center text-[10px] tracking-[0.2em] uppercase text-silver-400 font-ui">
                <span>SYSTEM PRELOAD</span>
                <span className="font-semibold text-white">{percentage}%</span>
              </div>
            </div>

            {/* Ambient blue glow */}
            <div className="absolute w-[300px] h-[300px] rounded-full bg-electric-500/10 blur-[100px] pointer-events-none" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
