"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [rendering, setRendering] = useState(true);

  useEffect(() => {
    // Prevent browser from restoring scroll position behind the preloader
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
      }
      window.scrollTo(0, 0);
    }

    // Wait 2 seconds to show the animation completely, then start fading out
    const timer1 = setTimeout(() => setVisible(false), 2000);
    // Remove from DOM completely after fade out
    const timer2 = setTimeout(() => setRendering(false), 2800);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  if (!rendering) return null;

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.04, delayChildren: 0.2 },
    },
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", damping: 12, stiffness: 100 },
    },
    hidden: { opacity: 0, y: 20 },
  };

  const titleText = "SRI SANJANA";
  const subtitleText = "Bharathanatyam | Tailoring | Beauty Parlour";

  return (
    <div className={`fixed inset-0 z-[9999] bg-foreground flex flex-col items-center justify-center transition-opacity duration-1000 ease-in-out ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="flex flex-col items-center">
        
        {/* Animated Logo - Elegant Float */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative w-40 h-40 md:w-56 md:h-56 mb-12 bg-white rounded-full p-6 md:p-8 shadow-2xl overflow-hidden"
        >
          <Image 
            src="/assets/finallogo1.png" 
            alt="Sri Sanjana Logo" 
            fill
            className="object-contain animate-float"
            priority
          />
        </motion.div>
        
        {/* Staggered Typing Text */}
        <div className="flex items-center gap-6">
          <motion.span 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-16 md:w-32 h-[2px] bg-gold origin-right"
          ></motion.span>
          
          <motion.h1 
            className="text-white uppercase tracking-[0.4em] text-2xl md:text-4xl font-serif font-bold flex"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            {Array.from(titleText).map((letter, index) => (
              <motion.span variants={child} key={index} className="inline-block">
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </motion.h1>
          
          <motion.span 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-16 md:w-32 h-[2px] bg-gold origin-left"
          ></motion.span>
        </div>
        
        {/* Subtitle Typing */}
        <motion.p 
          className="mt-8 text-gold uppercase tracking-[0.15em] md:tracking-[0.2em] text-[8px] md:text-xs font-bold flex flex-wrap justify-center px-4 text-center"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.015, delayChildren: 0.5 } }
          }}
          initial="hidden"
          animate="visible"
        >
          {Array.from(subtitleText).map((letter, index) => (
            <motion.span 
              variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} 
              key={index} 
              className="inline-block"
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </motion.p>

      </div>
    </div>
  );
}
