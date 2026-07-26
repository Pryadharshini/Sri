"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { href: "/bharathanatyam", label: "Bharathanatyam" },
  { href: "/tailoring", label: "Tailoring" },
  { href: "/beauty", label: "Beauty Parlour" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav className="fixed top-3 sm:top-5 left-0 right-0 z-50 px-3 sm:px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-[1400px] mx-auto h-16 sm:h-20 rounded-2xl sm:rounded-3xl bg-[#2b0f18]/95 backdrop-blur-lg shadow-2xl px-4 sm:px-6 lg:px-10 flex items-center justify-between"
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 sm:gap-3 flex-shrink-0 min-w-0"
          >
            <div className="relative w-9 h-9 sm:w-11 sm:h-11 bg-white rounded-full overflow-hidden shadow-md flex-shrink-0">
              <Image
                src="/assets/finallogo1.png"
                alt="Sri Sanjana"
                fill
                priority
                sizes="44px"
                className="object-contain p-1"
              />
            </div>

            <span className="font-serif text-white text-xs sm:text-sm lg:text-base tracking-[0.1em] sm:tracking-[0.15em] uppercase font-bold truncate">
              Sri Sanjana
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm uppercase font-semibold tracking-[0.15em] text-white hover:text-yellow-400 transition-colors whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white p-2 -mr-2 flex-shrink-0"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </motion.div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-xl flex flex-col justify-center items-center overflow-y-auto px-6 py-16"
          >
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-6 right-6 sm:top-8 sm:right-8 text-white p-2"
              aria-label="Close menu"
            >
              <X className="w-7 h-7 sm:w-8 sm:h-8" />
            </button>

            <div className="flex flex-col items-center gap-6 sm:gap-8 text-center">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-2xl sm:text-3xl font-serif uppercase tracking-[0.1em] sm:tracking-[0.15em] text-white hover:text-yellow-400 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <p className="absolute bottom-6 sm:bottom-8 text-[10px] sm:text-xs uppercase tracking-[0.3em] text-white/50 text-center px-4">
              Sri Sanjana Atelier
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}