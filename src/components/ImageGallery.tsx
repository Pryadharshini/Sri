"use client";
import React, { useState, useMemo, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarCheck, X, ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryItem {
  id: number;
  src: string;
  category: string;
  size: "square" | "wide" | "tall" | "large";
  colors?: string;
}

interface ImageGalleryProps {
  title: string;
  subtitle: string;
  description?: string;
  bookNowHref?: string;
  images: GalleryItem[];
}

export default function ImageGallery({
  title,
  subtitle,
  description,
  bookNowHref,
  images,
}: ImageGalleryProps) {
  // index into displayImages, or null when the viewer is closed
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Ordering logic hoisted out of the render so the viewer and the grid
  // walk the exact same list.
  const displayImages = useMemo(() => {
    if (title === "Sun Pleated Pant Model with Silk Zari Border") {
      const chartImage = images[images.length - 1];
      const modelImages = images.filter(
        (img) => img.src && img.src.includes("/models/")
      );
      const dressImages = images.filter(
        (img) =>
          img.id !== chartImage.id && (!img.src || !img.src.includes("/models/"))
      );
      return [...dressImages, ...modelImages, chartImage];
    }
    return images;
  }, [images, title]);

  const open = useCallback((index: number) => setActiveIndex(index), []);
  const close = useCallback(() => setActiveIndex(null), []);

  const step = useCallback(
    (delta: number) => {
      setActiveIndex((current) => {
        if (current === null) return current;
        const total = displayImages.length;
        return (current + delta + total) % total;
      });
    },
    [displayImages.length]
  );

  // Keyboard navigation + scroll lock while the viewer is open
  useEffect(() => {
    if (activeIndex === null) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex, close, step]);

  const activeImage = activeIndex !== null ? displayImages[activeIndex] : null;

  return (
    <section className="w-full pt-8 pb-24 px-6 md:px-12 relative z-20">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col gap-6 mb-16 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-xl"
            >
              <span className="text-sm font-sans tracking-[0.4em] uppercase text-foreground/70 font-bold block mb-4">
                {subtitle}
              </span>
              <h2 className="text-4xl md:text-5xl font-serif text-foreground font-bold max-w-lg">
                {title}
              </h2>
            </motion.div>

            {bookNowHref && (
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="shrink-0"
              >
                <Link
                  href={bookNowHref}
                  className="inline-flex items-center gap-2 bg-foreground text-white font-bold rounded-full px-7 py-3.5 text-sm hover:brightness-110 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                >
                  <CalendarCheck className="w-4 h-4" />
                  Book Now
                </Link>
              </motion.div>
            )}
          </div>

          {description && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-base text-foreground/70 font-sans leading-relaxed max-w-3xl mx-auto md:mx-0"
            >
              {description}
            </motion.p>
          )}
        </div>

        {/* Simple Standard Square Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {displayImages.map((item, i) => {
            const isTallCategory =
              title === "Long Gowns" ||
              title === "Lehenga" ||
              title === "Practice Chudi Set Kids and Adult";
            const isWideCategory =
              title === "Family Combos" || title === "Siblings Combo";
            const isSquareCategory =
              title.includes("Sun Pleated Pant Model") ||
              title === "Practice Sarees" ||
              title === "Skirt Model" ||
              title === "Saree Convert Costumes" ||
              title === "Customer Photos";

            let aspectClass = "aspect-[4/5]";
            const objectPos = "object-center";
            let objectFit = "object-cover";
            let bgClass = "";
            const colSpanClass = "";

            const isCustomColorChart =
              (title === "Sun Pleated Pant Model with Silk Zari Border" ||
                title === "Sun Pleated Pant Model with Thread Border" ||
                title === "Practice Chudi Set Kids and Adult" ||
                title === "Skirt Model" ||
                title === "Kathakali Dance Costumes") &&
              item.id === images[images.length - 1].id;

            if (isCustomColorChart) {
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="col-span-full mt-16 relative overflow-hidden rounded-[2.5rem] bg-[#1a0a10] border border-gold/20 shadow-2xl group flex flex-col md:flex-row items-stretch"
                >
                  {/* Background glow effects */}
                  <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none transition-transform duration-1000 group-hover:scale-110"></div>
                  <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#ff4d85]/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none"></div>

                  {/* Left: Text & CTA */}
                  <div className="w-full md:w-5/12 flex flex-col justify-center text-center md:text-left p-10 md:p-16 lg:p-20 relative z-10">
                    <div className="inline-flex items-center gap-3 justify-center md:justify-start mb-6">
                      <span className="w-12 h-[1px] bg-gold/60"></span>
                      <span className="text-gold uppercase tracking-[0.3em] text-xs font-bold">
                        Endless Possibilities
                      </span>
                    </div>

                    <h3 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white font-bold leading-[1.1] mb-6">
                      Custom <br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-[#ffd78a] to-gold">
                        Combinations
                      </span>
                    </h3>

                    <p className="text-white/60 text-base md:text-lg font-light leading-relaxed mb-10">
                      This model can be tailored in absolutely any color
                      combination you desire. Choose your perfect shades and let
                      us bring your vision to life.
                    </p>

                    <div>
                      <a
                        href={bookNowHref}
                        className="inline-flex items-center gap-3 bg-gradient-to-r from-gold to-[#c9a15a] text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform duration-300 shadow-[0_0_30px_rgba(201,161,90,0.3)]"
                      >
                        Inquire Now
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>

                  {/* Right: The Image Container */}
                  <div className="w-full md:w-7/12 min-h-[50vh] md:min-h-[70vh] relative bg-black/40 backdrop-blur-md border-l border-white/5 p-8 flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => open(i)}
                      aria-label="View colour chart full size"
                      className="w-full h-full relative rounded-[2rem] overflow-hidden bg-black/20 shadow-inner cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-gold group-hover:shadow-[inset_0_0_50px_rgba(201,161,90,0.1)] transition-shadow duration-500"
                    >
                      <Image
                        src={item.src}
                        alt="Customization Chart"
                        fill
                        className="object-contain object-center drop-shadow-2xl transition-transform duration-[3s] group-hover:scale-105"
                      />
                    </button>
                  </div>
                </motion.div>
              );
            }

            if (title === "Ready-Made Blouses") {
              aspectClass = "aspect-square";
            } else if (title === "Customer Reviews") {
              aspectClass = "aspect-[2/3]";
              objectFit = "object-contain";
              bgClass = "bg-black/40";
            } else if (
              title === "Mehndi Designs" ||
              title === "Saree Pre-Pleating" ||
              title === "Aari Work Blouses" ||
              title === "Machine Embroidery"
            ) {
              aspectClass = "aspect-[4/5]";
            } else if (title === "Jewelry & Accessories") {
              aspectClass = "aspect-square";
            } else if (isTallCategory) {
              aspectClass = "aspect-[2/3]";
            } else if (isWideCategory) {
              aspectClass = "aspect-square";
            } else if (isSquareCategory) {
              aspectClass = "aspect-square";
            }

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: (i % 10) * 0.1 }}
                className={`relative group overflow-hidden ${aspectClass} ${bgClass} ${colSpanClass} border border-foreground/10 rounded-xl`}
              >
                <button
                  type="button"
                  onClick={() => open(i)}
                  aria-label={`View ${item.category} full size`}
                  className="absolute inset-0 w-full h-full cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-xl"
                >
                  <Image
                    src={item.src}
                    alt={item.category}
                    fill
                    priority={i < 8}
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className={`${objectFit} ${objectPos} transition-transform duration-[2s] group-hover:scale-110`}
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 text-left">
                    <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-foreground/80 mb-2">
                      {item.category}
                    </span>
                    <div className="w-12 h-[1px] bg-foreground/50 mt-4"></div>
                  </div>
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Full-screen image viewer */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={activeImage.category}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-10"
          >
            {/* Close */}
            <button
              type="button"
              onClick={close}
              aria-label="Close image"
              className="absolute top-4 right-4 md:top-6 md:right-6 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {displayImages.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    step(-1);
                  }}
                  aria-label="Previous image"
                  className="absolute left-2 md:left-6 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white flex items-center justify-center transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    step(1);
                  }}
                  aria-label="Next image"
                  className="absolute right-2 md:right-6 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white flex items-center justify-center transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            <motion.div
              key={activeImage.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full h-full max-w-6xl"
            >
              <Image
                src={activeImage.src}
                alt={activeImage.category}
                fill
                sizes="100vw"
                priority
                className="object-contain"
              />
            </motion.div>

            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-center text-white/70 text-xs uppercase tracking-[0.3em] pointer-events-none">
              {activeImage.category}
              {displayImages.length > 1 && (
                <span className="ml-3 text-white/40">
                  {(activeIndex ?? 0) + 1} / {displayImages.length}
                </span>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}