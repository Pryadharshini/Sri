"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav className="fixed top-5 left-0 right-0 z-50 px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-[1400px] mx-auto h-20 rounded-3xl bg-[#2b0f18]/95 backdrop-blur-lg shadow-2xl px-6 lg:px-10 flex items-center justify-between"
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 flex-shrink-0"
          >
            <div className="relative w-11 h-11 bg-white rounded-full overflow-hidden shadow-md">
              <Image
                src="/assets/finallogo1.png"
                alt="Sri Sanjana"
                fill
                priority
                className="object-contain p-1"
              />
            </div>

            <span className="font-serif text-white text-sm lg:text-base tracking-[0.15em] uppercase font-bold whitespace-nowrap">
              Sri Sanjana
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            <Link
              href="/bharathanatyam"
              className="text-sm uppercase font-semibold tracking-[0.15em] text-white hover:text-yellow-400 transition-colors"
            >
              Bharathanatyam
            </Link>

            <Link
              href="/tailoring"
              className="text-sm uppercase font-semibold tracking-[0.15em] text-white hover:text-yellow-400 transition-colors"
            >
              Tailoring
            </Link>

            <Link
              href="/beauty"
              className="text-sm uppercase font-semibold tracking-[0.15em] text-white hover:text-yellow-400 transition-colors"
            >
              Beauty Parlour
            </Link>

            <Link
              href="/contact"
              className="text-sm uppercase font-semibold tracking-[0.15em] text-white hover:text-yellow-400 transition-colors"
            >
              Contact
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white"
            onClick={() => setIsMobileMenuOpen(true)}
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
            className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-xl flex flex-col justify-center items-center"
          >
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-8 right-8 text-white"
            >
              <X className="w-8 h-8" />
            </button>

            <div className="flex flex-col items-center gap-8">
              <Link
                href="/bharathanatyam"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-3xl font-serif uppercase tracking-[0.15em] text-white hover:text-yellow-400 transition-colors"
              >
                Bharathanatyam
              </Link>

              <Link
                href="/tailoring"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-3xl font-serif uppercase tracking-[0.15em] text-white hover:text-yellow-400 transition-colors"
              >
                Tailoring
              </Link>

              <Link
                href="/beauty"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-3xl font-serif uppercase tracking-[0.15em] text-white hover:text-yellow-400 transition-colors"
              >
                Beauty Parlour
              </Link>

              <Link
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-3xl font-serif uppercase tracking-[0.15em] text-white hover:text-yellow-400 transition-colors"
              >
                Contact
              </Link>
            </div>

            <p className="absolute bottom-8 text-xs uppercase tracking-[0.3em] text-white/50">
              Sri Sanjana Atelier
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}