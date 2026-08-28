"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Star, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Testimonials() {
  const reviews = [
    {
      name: "Anjali S.",
      role: "Professional Dancer",
      headline: "Absolute Freedom on Stage",
      text: "The fall of the pleats and the richness of the zari are unmatched. I felt absolute freedom during my Tillana."
    },
    {
      name: "Meera V.",
      role: "Bridal Client",
      headline: "Breathtaking Bridal Craft",
      text: "Sri Sanjana crafted the most breathtaking Aari work blouse for my wedding. The fitting and attention to detail were simply perfect."
    },
    {
      name: "Kavya R.",
      role: "Beauty Client",
      headline: "Flawless & Premium",
      text: "The Mehendi design for my engagement was incredibly intricate, and the makeup was flawlessly natural. A truly premium experience."
    }
  ];

  const screenshots = [
    { src: "/assets/tailoring_customer_reviews/tcr3.jpeg", rotate: -6, alt: "Customer feedback about stitching work" },
    { src: "/assets/tailoring_customer_reviews/tcr4.jpeg", rotate: 4, alt: "Customer feedback about saree" },
    { src: "/assets/tailoring_customer_reviews/tcr6.jpeg", rotate: -3, alt: "Customer feedback about pavadai stitching" },
    { src: "/assets/bharathanatyam_customer_reviews/cr8.jpeg", rotate: 5, alt: "Customer feedback about outfit" },
    { src: "/assets/bharathanatyam_customer_reviews/cr3.jpeg", rotate: -5, alt: "Customer feedback about dance costumes" },
    { src: "/assets/bharathanatyam_customer_reviews/cr1.jpeg", rotate: 3, alt: "Customer feedback about dresses" },
    { src: "/assets/tailoring_customer_reviews/tcr7.jpeg", rotate: -4, alt: "Customer feedback about dance photos" },
    { src: "/assets/tailoring_customer_reviews/tcr8.jpeg", rotate: 6, alt: "Customer feedback about dress compliment" },
    { src: "/assets/tailoring_customer_reviews/tcr9.jpeg", rotate: -2, alt: "Customer feedback about custom Bharatanatyam dress" },
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % reviews.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [reviews.length]);

  const active = reviews[index];

  return (
    <>
      {/* Spotlight testimonial */}
      <section className="py-24 px-6 md:px-8 relative z-10 overflow-hidden">
        <div className="w-full max-w-[1100px] mx-auto">

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="text-xs md:text-sm uppercase tracking-[0.4em] font-sans font-bold text-[#8a6314] block mb-4">
              From Our Cherished Clients
            </span>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif text-foreground font-bold">
              Voices of Grace
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="relative rounded-[32px] border-2 border-gold/50 bg-gradient-to-br from-foreground to-foreground/90 shadow-[0_30px_80px_rgba(0,0,0,0.3)] overflow-hidden"
          >
            {/* dotted texture */}
            <div
              className="absolute inset-0 opacity-[0.06] pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)',
                backgroundSize: '18px 18px',
                color: '#D4AF37'
              }}
            />

            <div className="relative z-10 flex flex-col md:flex-row items-stretch">

              {/* LEFT: Avatar / decorative panel */}
              <div className="w-full md:w-[280px] shrink-0 flex items-center justify-center py-12 md:py-16 px-8 relative">
                <div className="absolute inset-0 bg-gold/5 md:border-r border-gold/20" />
                <AnimatePresence mode="wait">
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5 }}
                    className="relative z-10 w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-gold/60 bg-gold/10 flex items-center justify-center"
                  >
                    <span className="font-serif font-bold text-5xl md:text-6xl text-gold">
                      {active.name.charAt(0)}
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* RIGHT: Content */}
              <div className="flex-1 p-8 sm:p-10 md:p-12 lg:p-14 relative">
                <Quote className="w-10 h-10 md:w-12 md:h-12 text-gold mb-4" fill="currentColor" />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex items-center gap-4 mb-3 flex-wrap">
                      <span className="text-sm md:text-base font-bold text-white uppercase tracking-[0.1em]">
                        {active.name}
                      </span>
                      <span className="text-white/50 text-sm">—</span>
                      <span className="text-sm text-gold/90 font-sans">{active.role}</span>
                      <div className="flex gap-1 ml-auto">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="w-4 h-4 fill-gold text-gold" />
                        ))}
                      </div>
                    </div>

                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-white mb-4">
                      {active.headline}
                    </h3>

                    <p className="text-base md:text-lg text-white/75 leading-relaxed font-sans">
                      {active.text}
                    </p>
                  </motion.div>
                </AnimatePresence>

                {/* pagination dots */}
                <div className="flex items-center gap-2 mt-8">
                  {reviews.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setIndex(idx)}
                      className={`h-2 rounded-full transition-all duration-100 ${
                        idx === index ? "w-8 bg-gold" : "w-2 bg-white/25 hover:bg-white/50"
                      }`}
                      aria-label={`Go to testimonial ${idx + 1}`}
                    />
                  ))}
                </div>

                {/* closing quote mark, bottom right */}
                <Quote className="absolute bottom-6 right-6 md:right-10 w-8 h-8 md:w-10 md:h-10 text-gold/40 rotate-180" fill="currentColor" />
              </div>

            </div>
          </motion.div>

        </div>
      </section>

      {/* Scattered customer feedback wall */}
      <section className="pb-24 px-6 md:px-8 relative z-10 overflow-hidden">
        <div className="w-full max-w-[1400px] mx-auto">

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="text-xs md:text-sm uppercase tracking-[0.4em] font-sans font-bold text-[#8a6314] block mb-4">
              Real Conversations, Real Love
            </span>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif text-foreground font-bold">
              What Our Customers Say
            </h2>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {screenshots.map((shot, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.85, rotate: shot.rotate }}
                whileInView={{ opacity: 1, scale: 1, rotate: shot.rotate }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: (idx % 5) * 0.08 }}
                whileHover={{ rotate: 0, scale: 1.08, zIndex: 20 }}
                className="relative w-[150px] h-[200px] sm:w-[170px] sm:h-[225px] md:w-[190px] md:h-[250px] rounded-xl overflow-hidden border-4 border-white shadow-[0_10px_25px_rgba(0,0,0,0.25)] cursor-pointer transition-shadow duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.35)]"
                style={{ transformOrigin: "center center" }}
              >
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  fill
                  sizes="(max-width: 640px) 150px, (max-width: 768px) 170px, 190px"
                  className="object-cover object-top"
                />
              </motion.div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}