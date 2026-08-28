"use client";
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const slides = [
  {
    id: "bharathanatyam",
    image: "/assets/bharatanatyam.png",
    subtitle: "Specialist in Bharathanatyam Costumes",
    link: "/bharathanatyam"
  },
  {
    id: "tailoring",
    image: "/assets/tailoring.png",
    subtitle: "Custom Tailoring & Designer Wear",
    link: "/tailoring"
  },
  {
    id: "embroidery",
    image: "/assets/aari.png",
    subtitle: "Aari & Hand Embroidery",
    link: "/tailoring"
  },
  {
    id: "beauty",
    image: "/assets/mehendii.png",
    subtitle: "Beauty Parlour & Aesthetics",
    link: "/beauty"
  },
  {
    id: "tattoo",
    image: "/assets/tattoo.png",
    subtitle: "Tattoo Services",
    link: "/beauty"
  }
];

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.2]);

  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Safe index to prevent HMR out of bounds errors
  const safeIndex = currentIndex >= slides.length ? 0 : currentIndex;
  const activeSlide = slides[safeIndex];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <section ref={ref} className="relative w-full h-[70vh] md:h-screen flex flex-col items-center justify-center overflow-hidden bg-[#1a1114]">
        
        <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full"
            >
              <Image 
                src={activeSlide.image} 
                alt={activeSlide.subtitle} 
                fill 
                sizes="100vw"
                className="object-cover object-top" 
                priority={safeIndex === 0}
              />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/80 z-10 pointer-events-none"></div>
        </motion.div>

        <div className="relative z-20 w-full text-center px-4 mt-20 flex flex-col items-center">
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="text-3xl min-[400px]:text-4xl sm:text-6xl md:text-8xl lg:text-[110px] font-serif text-white tracking-[0.1em] md:tracking-[0.2em] font-bold drop-shadow-2xl uppercase whitespace-normal sm:whitespace-nowrap mb-6"
          >
            Sri Sanjana
          </motion.h1>

          <div className="h-12 overflow-hidden flex items-center justify-center w-full px-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8 }}
                className="flex items-center gap-2 md:gap-4 justify-center"
              >
                <div className="hidden sm:block w-4 md:w-8 h-[2px] bg-[#F0C550]"></div>
                <span className="text-base md:text-2xl text-[#F0C550] uppercase tracking-[0.25em] md:tracking-[0.45em] font-sans font-extrabold text-center drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                  {activeSlide.subtitle}
                </span>
                <div className="hidden sm:block w-4 md:w-8 h-[2px] bg-[#F0C550]"></div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center gap-3">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all duration-500 ${
                idx === safeIndex ? "w-8 bg-gold" : "w-2 bg-white/40 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

    <section className="w-full py-16 px-4 sm:px-6 relative z-10 overflow-hidden">
  <motion.div
    initial={{
      opacity: 0,
      scale: 0.8,
      y: 80,
    }}
    whileInView={{
      opacity: 1,
      scale: 1,
      y: 0,
    }}
    viewport={{ once: true, amount: 0.25 }}
    transition={{
      duration: 0.8,
      type: "spring",
      stiffness: 100,
      damping: 15,
    }}
    className="max-w-[1000px] mx-auto rounded-[30px] bg-[#2b0f18]/95 backdrop-blur-xl border border-[#D4AF37]/20 shadow-[0_20px_60px_rgba(0,0,0,0.45)] px-6 sm:px-8 md:px-10 lg:px-12 py-10 text-center"
  >
    {/* Heading */}
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="mb-8 flex items-center justify-center gap-4"
    >
      <span className="w-14 h-[2px] bg-[#D4AF37]" />

      <span className="text-xs md:text-sm uppercase tracking-[0.35em] font-bold text-[#D4AF37]">
        Welcome to Sri Sanjana
      </span>

      <span className="w-14 h-[2px] bg-[#D4AF37]" />
    </motion.div>

    {/* Content */}
    <div className="max-w-[700px] mx-auto text-left text-white/90 text-base md:text-lg leading-8 space-y-5">
      <p>
        What began as a small home-based tailoring business has grown into a
        trusted brand serving customers across the globe. At Sri Sanjana, we
        started by teaching tailoring and stitching customized garments with
        care and dedication. Today, nearly 90% of our customers are from
        overseas, and we proudly design and deliver custom-made outfits
        worldwide.
      </p>

      <p>
        Over the past 15 years, we have expanded our expertise beyond tailoring
        to offer a wide range of creative and professional services,
        including:
      </p>

      <ul className="space-y-3 py-2">
        <li className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#D4AF37]"></span>
          <span>Authentic Bharathanatyam Costumes</span>
        </li>

        <li className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#D4AF37]"></span>
          <span>Custom Tailoring & Designer Wear</span>
        </li>

        <li className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#D4AF37]"></span>
          <span>Premium Beauty Parlour & Aesthetics</span>
        </li>
      </ul>

      <p>
        We are committed to delivering the highest quality craftsmanship,
        ensuring every stitch and design is executed with absolute perfection.
      </p>

      <h3 className="pt-4 text-center font-serif text-2xl md:text-3xl italic font-bold text-[#D4AF37]">
        Thank you for being a part of the Sri Sanjana family.
      </h3>
    </div>

    {/* Button */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.4, duration: 0.5 }}
      className="mt-10 flex flex-col sm:flex-row justify-center gap-4"
    >
      <Link
        href="#services"
        className="inline-flex items-center justify-center rounded-full border border-[#D4AF37] bg-[#D4AF37] px-8 py-3 text-sm font-semibold text-[#2b0f18] transition-all duration-300 hover:scale-105 hover:bg-transparent hover:text-[#D4AF37]"
      >
        Explore Our Services
      </Link>

      <Link
        href="/book-now"
        className="inline-flex items-center justify-center rounded-full border border-[#D4AF37] bg-transparent px-8 py-3 text-sm font-semibold text-[#D4AF37] transition-all duration-300 hover:scale-105 hover:bg-[#D4AF37] hover:text-[#2b0f18]"
      >
        Book Now
      </Link>
    </motion.div>
  </motion.div>
  
</section>
    </>
  );
}