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

  const rafIdRef = useRef<number | null>(null);
  const targetFrameRef = useRef<number>(0);
  const lastDrawnFrameRef = useRef<number>(-1);

  // Prevent scroll during preloading
  useEffect(() => {
    if (!isLoaded) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isLoaded]);

  // Preload all frames on mount
  useEffect(() => {
    let loaded = 0;
    const images: HTMLImageElement[] = [];

    const getFrameUrl = (index: number) => {
      const paddedIndex = String(index).padStart(3, "0");
      return `/sequence/frame_${paddedIndex}_delay-0.066s.webp`;
    };

    for (let i = 0; i < totalCount; i++) {
      const img = new Image();
      img.src = getFrameUrl(i);
      img.onload = () => {
        loaded++;
        setLoadedCount(loaded);
        if (loaded === totalCount) {
          setIsLoaded(true);
        }
      };
      img.onerror = () => {
        // Fallback or retry on error
        console.error(`Failed to load frame ${i}`);
        loaded++;
        setLoadedCount(loaded);
        if (loaded === totalCount) {
          setIsLoaded(true);
        }
      };
      images.push(img);
    }
    imagesRef.current = images;
  }, []);

  // Frame drawing function
  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const img = imagesRef.current[index];
    if (!canvas || !ctx || !img) return;

    // Set canvas dimensions with device pixel ratio support for sharp rendering
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const nextWidth = Math.round(rect.width * dpr);
    const nextHeight = Math.round(rect.height * dpr);

    const sizeChanged = canvas.width !== nextWidth || canvas.height !== nextHeight;

    if (!sizeChanged && index === lastDrawnFrameRef.current) {
      return; // Skip redundant draw call
    }

    if (sizeChanged) {
      canvas.width = nextWidth;
      canvas.height = nextHeight;
    }

    // Apply scaling transform cleanly without accumulating scale on repeated draws
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const canvasWidth = rect.width;
    const canvasHeight = rect.height;
    const imgWidth = img.naturalWidth || img.width;
    const imgHeight = img.naturalHeight || img.height;

    // Object-fit: cover scaling logic
    const scale = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight);
    const x = (canvasWidth - imgWidth * scale) / 2;
    const y = (canvasHeight - imgHeight * scale) / 2;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(img, x, y, imgWidth * scale, imgHeight * scale);

    lastDrawnFrameRef.current = index;
  };

  // Draw frame in requestAnimationFrame loop
  const renderLoop = () => {
    drawFrame(targetFrameRef.current);
    rafIdRef.current = null;
  };

  // Redraw when loaded or when scrollProgress changes
  useEffect(() => {
    if (!isLoaded) return;

    const handleScroll = (latest: number) => {
      const frameIndex = Math.min(
        totalCount - 1,
        Math.max(0, Math.floor(latest * totalCount))
      );
      
      targetFrameRef.current = frameIndex;

      if (rafIdRef.current === null) {
        rafIdRef.current = requestAnimationFrame(renderLoop);
      }
    };

    const unsubscribe = scrollProgress.on("change", handleScroll);

    // Initial render
    handleScroll(scrollProgress.get());

    return () => {
      unsubscribe();
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [isLoaded, scrollProgress]);

  // Handle canvas sizing and redraw on window resize
  useEffect(() => {
    if (!isLoaded) return;

    const handleResize = () => {
      const activeIndex = Math.min(
        totalCount - 1,
        Math.max(0, Math.floor(scrollProgress.get() * totalCount))
      );
      
      targetFrameRef.current = activeIndex;

      if (rafIdRef.current === null) {
        rafIdRef.current = requestAnimationFrame(renderLoop);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [isLoaded, scrollProgress]);

  const percentage = Math.round((loadedCount / totalCount) * 100);

  return (
    <div className="relative w-full h-full bg-[#020812]">
      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block object-cover transition-opacity duration-700 ease-in-out"
        style={{ opacity: isLoaded ? 1 : 0 }}
      />

      {/* Luxury Brand Preloader Screen */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#020812]"
          >
            <div className="flex flex-col items-center max-w-xs w-full px-6">
              {/* Brand Title */}
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="font-display text-4xl sm:text-5xl tracking-[0.3em] text-white uppercase text-center mb-10"
              >
                VIRTUS
              </motion.h1>

              {/* Progress Bar Container */}
              <div className="w-full h-[2px] bg-white/5 relative overflow-hidden mb-4 rounded-full">
                {/* Active progress bar */}
                <motion.div
                  className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-electric-500 to-ice-400"
                  style={{ width: `${percentage}%` }}
                  transition={{ ease: "easeOut" }}
                />
              </div>

              {/* Loader Status & Percentage */}
              <div className="w-full flex justify-between items-center text-[10px] tracking-[0.2em] uppercase text-silver-400 font-ui">
                <span>SYSTEM PRELOAD</span>
                <span className="font-semibold text-white">{percentage}%</span>
              </div>
            </div>

            {/* Glowing background sweep */}
            <div className="absolute w-[300px] h-[300px] rounded-full bg-electric-500/10 blur-[100px] pointer-events-none" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
