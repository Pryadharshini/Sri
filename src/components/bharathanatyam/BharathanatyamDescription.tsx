"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function BharathanatyamDescription() {
  const menuCategories = [
    { name: "Sun Pleated Pant Model with Silk Zari Border", link: "/bharathanatyam/sun-pleated-pant", icon: "🏵️" },
    { name: "Sun Pleated Pant Model with Thread Border", link: "/bharathanatyam/sun-pleated-pant-thread-border", icon: "🧵" },
    { name: "Skirt Model", link: "/bharathanatyam/skirt-model", icon: "👗" },
    { name: "Practice Sarees", link: "/bharathanatyam/practice-sarees", icon: "💃" },
    { name: "Saree Convert Costumes", link: "/bharathanatyam/saree-convert-costumes", icon: "✂️" },
    { name: "Jewelry & Accessories", link: "/bharathanatyam/jewelery-and-accessories", icon: "💎" },
  ];

  const features = [
    { icon: "✨", title: "Custom Fit", text: "Customized designs with perfect fitting and quality stitching.", tag: "Perfect Fitting" },
    { icon: "📦", title: "Worldwide", text: "Worldwide shipping available across the globe.", tag: "Global Shipping" },
    { icon: "💳", title: "Prepaid Only", text: "Prepaid orders only.\n(No cash on delivery)", tag: "Secure Prepaid" },
  ];

  return (
    <section className="w-full min-h-screen py-24 px-6 md:px-12 relative z-20 overflow-hidden">

      {/* Decorative Needle & Thread Background Motif */}
      <svg
        className="pointer-events-none select-none absolute -z-10"
        style={{ top: '4%', left: '-4%', width: '55%', maxWidth: 780, opacity: 0.14 }}
        viewBox="0 0 900 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Wavy stitched thread trail */}
        <path
          d="M20 340 C 100 260, 160 260, 200 320 C 240 380, 300 380, 340 300 C 380 220, 440 220, 470 280 C 500 340, 560 340, 590 260 C 620 180, 680 180, 710 220"
          stroke="var(--gold, #c9a15a)"
          strokeWidth="3"
          strokeDasharray="10 8"
          strokeLinecap="round"
        />
        {/* Needle body */}
        <g transform="translate(660,150) rotate(38)">
          <line x1="0" y1="0" x2="230" y2="0" stroke="var(--gold, #c9a15a)" strokeWidth="6" strokeLinecap="round" />
          <path d="M230 0 L 260 0" stroke="var(--gold, #c9a15a)" strokeWidth="6" strokeLinecap="round" />
          {/* Needle point */}
          <path d="M260 0 L 292 0" stroke="var(--gold, #c9a15a)" strokeWidth="3" strokeLinecap="round" />
          {/* Eye of the needle */}
          <ellipse cx="18" cy="0" rx="9" ry="5" stroke="var(--gold, #c9a15a)" strokeWidth="4" />
        </g>
      </svg>

      <svg
        className="pointer-events-none select-none absolute -z-10"
        style={{ bottom: '2%', right: '-6%', width: '48%', maxWidth: 680, opacity: 0.10, transform: 'scaleX(-1)' }}
        viewBox="0 0 900 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20 340 C 100 260, 160 260, 200 320 C 240 380, 300 380, 340 300 C 380 220, 440 220, 470 280 C 500 340, 560 340, 590 260 C 620 180, 680 180, 710 220"
          stroke="var(--gold, #c9a15a)"
          strokeWidth="3"
          strokeDasharray="10 8"
          strokeLinecap="round"
        />
        <g transform="translate(660,150) rotate(38)">
          <line x1="0" y1="0" x2="230" y2="0" stroke="var(--gold, #c9a15a)" strokeWidth="6" strokeLinecap="round" />
          <path d="M230 0 L 260 0" stroke="var(--gold, #c9a15a)" strokeWidth="6" strokeLinecap="round" />
          <path d="M260 0 L 292 0" stroke="var(--gold, #c9a15a)" strokeWidth="3" strokeLinecap="round" />
          <ellipse cx="18" cy="0" rx="9" ry="5" stroke="var(--gold, #c9a15a)" strokeWidth="4" />
        </g>
      </svg>

      <div className="max-w-[1300px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-foreground/80 tracking-[0.4em] uppercase text-xs font-bold block mb-4">
            Our Dance Collection
          </span>
          <h2 className="text-4xl md:text-6xl font-serif text-foreground font-bold text-center leading-tight">
            <span className="text-foreground/30 text-2xl md:text-3xl hidden md:inline-block mr-4 align-middle">✨</span>
            Traditional Attire
            <span className="text-foreground/30 text-2xl md:text-3xl hidden md:inline-block ml-4 align-middle">✨</span>
          </h2>
        </motion.div>

        {/* Split Layout: Categories (Left) + Customer Photos & Reviews (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8 items-stretch mb-24">

          {/* LEFT: Select a Model */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative overflow-hidden rounded-[40px] shadow-xl bg-gradient-to-b from-[#3a1420] to-[#2B0E16] border border-gold/30"
          >
            <div
              className="absolute inset-0 opacity-[0.25] pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)',
                backgroundSize: '18px 18px',
                color: 'var(--gold, #c9a15a)'
              }}
            />
            <span className="absolute top-5 left-6 text-gold/40 text-lg select-none">✦</span>
            <span className="absolute top-5 right-6 text-gold/40 text-lg select-none">✦</span>

            <div className="relative z-10 h-full flex flex-col">
              <div className="relative bg-gold px-8 py-7 text-center rounded-t-[40px]">
                <h3 className="text-2xl font-serif text-foreground uppercase tracking-[0.25em] font-bold">
                  Select a Model
                </h3>
                <div className="flex items-center justify-center gap-3 mt-3">
                  <span className="h-px w-10 bg-foreground/60"></span>
                  <span className="w-1.5 h-1.5 rotate-45 bg-foreground"></span>
                  <span className="h-px w-10 bg-foreground/60"></span>
                </div>
              </div>

              <div className="p-8 md:p-10">
                <ul className="flex flex-col">
                  {menuCategories.map((category, index) => (
                    <li key={index} className="border-b border-dashed border-gold/30 last:border-b-0">
                      <Link
                        href={category.link}
                        className="flex items-center justify-between py-4 px-4 -mx-4 my-1 rounded-full border border-transparent group/item transition-all duration-300 hover:border-gold/50 hover:bg-gold/10 hover:shadow-md"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-11 h-11 rounded-full border-2 border-gold/40 flex items-center justify-center shrink-0 bg-white/10 group-hover/item:border-gold group-hover/item:bg-gold/15 transition-all duration-300">
                            <span className="text-lg">{category.icon}</span>
                          </div>
                          <span className="font-sans text-base font-bold tracking-wide text-white group-hover/item:text-gold transition-colors duration-300">
                            {category.name}
                          </span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gold opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-300 shrink-0" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Customer Photos + Customer Reviews */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="flex flex-col gap-6 h-full"
          >
            <Link
              href="/bharathanatyam/book-now"
              className="group relative overflow-hidden rounded-full shadow-xl bg-gold p-6 flex items-center justify-between gap-4 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={{ x: "-120%" }}
                animate={{ x: "220%" }}
                transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 1.5, ease: "easeInOut" }}
                style={{ width: "40%", skewX: -20 }}
              />
              <div className="relative z-10 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-foreground/10 flex items-center justify-center shrink-0">
                  <span className="text-xl">📅</span>
                </div>
                <span className="text-lg md:text-xl font-serif font-bold text-foreground drop-shadow-sm">
                  Book Now
                </span>
              </div>
              <ArrowRight className="relative z-10 w-6 h-6 text-foreground shrink-0 group-hover:translate-x-2 transition-transform" />
            </Link>

            <Link
              href="/bharathanatyam/customer-photos"
              className="group flex-1 relative overflow-hidden rounded-[40px] shadow-xl bg-gradient-to-br from-[#3a1420] to-[#2B0E16] border border-gold/30 text-white p-8 flex flex-col justify-center hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="w-14 h-14 rounded-full border-2 border-gold/50 flex items-center justify-center bg-gold/10 mb-5 group-hover:border-gold group-hover:bg-gold/20 transition-all duration-300">
                    <span className="text-2xl">📸</span>
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-white">Customer Photos</h3>
                  <p className="text-white/70 mt-2 text-sm">
                    View our latest dance costume works and completed outfits.
                  </p>
                </div>
                <ArrowRight className="w-6 h-6 text-gold shrink-0 group-hover:translate-x-2 transition-transform" />
              </div>
            </Link>

            <Link
              href="/bharathanatyam/customer-reviews"
              className="group flex-1 relative overflow-hidden rounded-[40px] shadow-xl border border-gold/40 bg-gradient-to-br from-[#3a1420] to-[#2B0E16] text-white p-8 flex flex-col justify-center hover:shadow-2xl hover:-translate-y-1 hover:border-gold transition-all duration-300"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="w-14 h-14 rounded-full border-2 border-gold/50 flex items-center justify-center bg-gold/15 mb-5 group-hover:border-gold group-hover:bg-gold/25 transition-all duration-300">
                    <span className="text-2xl">⭐</span>
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-white">Customer Reviews</h3>
                  <p className="text-white/70 mt-2 text-sm">
                    Read genuine reviews from our happy customers.
                  </p>
                </div>
                <ArrowRight className="w-6 h-6 text-gold shrink-0 group-hover:translate-x-2 transition-transform" />
              </div>
            </Link>
          </motion.div>

        </div>

        {/* Bottom Section: Numbered Flow (Text Inside Circles) */}
        <div className="relative mb-12">
          <div className="relative pt-2">
            {/* Connector line - thicker */}
            <div
              className="hidden md:block absolute top-[80px] h-1 bg-gold/60 rounded-full"
              style={{ left: '16.66%', right: '16.66%' }}
            />
            {/* Dot on the connector line between circles */}
            <span className="hidden md:block absolute top-[76px] left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-gold" />

            {/* Row of numbered circles with text inside */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
              {features.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full border-[3px] border-gold flex flex-col items-center justify-center bg-gradient-to-b from-[#3a1420] to-[#2B0E16] shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 z-10 p-6">
                    <span className="absolute -top-2 -right-2 w-9 h-9 rounded-full bg-gold border-2 border-white/80 flex items-center justify-center text-sm text-foreground font-extrabold shadow-md">
                      {String(i + 1).padStart(2, '0')}
                    </span>

                    <span className="text-3xl mb-2">{feature.icon}</span>
                    <h4 className="font-serif font-bold text-base text-white uppercase tracking-wide mb-1">
                      {feature.title}
                    </h4>
                    <p className="font-sans text-xs text-white/70 leading-snug whitespace-pre-line px-2">
                      {feature.text}
                    </p>
                  </div>

                 <span className="inline-flex items-center gap-1.5 text-xs font-bold text-gold bg-[#2B0E16] border border-gold/50 rounded-full px-3 py-1 mt-5 shadow-sm">
                    ✦ {feature.tag}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}