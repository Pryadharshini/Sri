"use client";
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Craftsmanship() {
  const features = [
    {
      id: "01",
      title: "Bharathanatyam Costumes",
      subtitle: "Authentic Attire",
      description: "Authentic, traditionally tailored Bharathanatyam costumes designed for maximum mobility, durability, and striking stage presence.",
      image: "/assets/bharathanatyam_dancers.png",
      link: "/bharathanatyam"
    },
    {
      id: "02",
      title: "Custom Tailoring & Design",
      subtitle: "Bespoke Perfection",
      description: "From impeccable custom stitching to luxurious bespoke global outfits, our master tailors ensure every garment breathes, moves seamlessly, and fits flawlessly.",
      image: "/assets/tailoring_machine_new.png",
      link: "/tailoring"
    },
    {
      id: "03",
      title: "Beauty Parlour & Aesthetics",
      subtitle: "Professional Care",
      description: "Our beauty parlor offers exquisite, traditional Mehendi designs, professional makeup, and highly detailed styling services, delivering intricate artistry for all occasions.",
      image: "/assets/facial_beauty_new.png",
      link: "/beauty"
    }
  ];

  return (
    <section className="w-full py-24 px-6 md:px-12 relative z-20">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-20">
          <span className="text-sm font-sans tracking-[0.4em] uppercase text-foreground/70 font-bold block mb-4">
            Service Excellence
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-foreground font-bold">
            The Anatomy of Perfection
          </h2>
        </div>

        <div className="flex flex-col gap-24">
          {features.map((feature, index) => (
            <Link href={feature.link} key={feature.id} className="group block">
              <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 lg:gap-24`} >
              <motion.div 
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="w-full md:w-1/2 relative h-[400px] lg:h-[500px] glass-panel overflow-hidden p-2"
              >
                <Image 
                  src={feature.image} 
                  alt={feature.title} 
                  fill 
                  className="object-cover p-2 rounded-xl transition-transform duration-700 hover:scale-105"
                />
              </motion.div>

              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: { 
                    opacity: 1, 
                    transition: { staggerChildren: 0.15, delayChildren: 0.2 } 
                  }
                }}
                className="w-full md:w-1/2 relative"
              >
                <motion.span variants={{ hidden: { opacity: 0, scale: 0.5 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } } }} className="text-6xl md:text-8xl font-serif text-foreground/10 font-bold absolute -z-10 -translate-y-10 -translate-x-10">
                  {feature.id}
                </motion.span>

                <motion.span variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }} className="text-xs uppercase tracking-[0.3em] font-sans font-bold text-[#8a6314] block mb-3">
                  {feature.subtitle}
                </motion.span>

                <motion.div variants={{ hidden: { opacity: 0, scaleX: 0 }, visible: { opacity: 1, scaleX: 1, transition: { duration: 0.4 } } }} className="w-10 h-[2px] bg-[#8a6314] mb-4 origin-left" />

                <motion.h3 variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }} className="text-3xl lg:text-5xl font-serif text-[#3a1420] font-extrabold mb-6 tracking-tight">
                  {feature.title}
                </motion.h3>

                <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }} className="text-base font-sans text-[#3a1420] leading-relaxed max-w-md">
                  {feature.description}
                </motion.p>

                <motion.div 
                  variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }} 
                  className="mt-8"
                >
                  <span className="inline-flex items-center gap-2 rounded-full border border-foreground/30 px-6 py-2.5 text-xs font-bold uppercase tracking-[0.2em] text-foreground transition-all duration-300 group-hover:bg-foreground group-hover:text-background group-hover:border-foreground">
                    Explore
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </motion.div>
              </motion.div>
            </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}