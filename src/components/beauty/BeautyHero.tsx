"use client";
import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function BeautyHero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);

  return (
    <section ref={ref} className="relative w-full h-[70vh] md:h-[90vh] bg-[#1a1114] flex items-center justify-center overflow-hidden pt-20">
      {/* Background Images Collage */}
      <motion.div style={{ opacity }} className="absolute inset-0 w-full h-full flex z-0">
        <motion.div style={{ y: y1 }} className="w-1/3 h-[120%] relative -top-[10%]">
          <Image 
            src="/assets/mehendii.png" 
            alt="Mehendi Art" 
            fill 
            className="object-cover opacity-60 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700" 
          />
        </motion.div>
        <motion.div style={{ y: y2 }} className="w-1/3 h-[120%] relative -top-[5%]">
          <Image 
            src="/assets/beauty_detail.png" 
            alt="Professional Makeup" 
            fill 
            className="object-cover opacity-60 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700" 
          />
        </motion.div>
        <motion.div style={{ y: y1 }} className="w-1/3 h-[120%] relative -top-[15%]">
          <Image 
            src="/assets/service_tattoo_1783356284270.png" 
            alt="Temporary Tattoo" 
            fill 
            className="object-cover opacity-60 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700" 
          />
        </motion.div>
        
        {/* Dark overlay to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/80"></div>
        <div className="absolute inset-0 bg-black/20"></div>
      </motion.div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="w-16 h-[2px] bg-gold mb-6"
        ></motion.div>
        
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-gold tracking-[0.5em] uppercase text-xs md:text-sm font-bold block mb-4"
        >
          Professional Care & Styling
        </motion.span>
        
        <motion.h1 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif text-white font-bold drop-shadow-2xl mb-8 text-center"
        >
          Beauty Parlour
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-white/80 font-sans text-lg md:text-xl max-w-2xl font-light"
        >
          Transforming moments into memories with exquisite Mehendi, flawless makeup, and elegant styling.
        </motion.p>
      </div>
    </section>
  );
}
