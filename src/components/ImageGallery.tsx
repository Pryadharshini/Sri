"use client";
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface GalleryItem {
  id: number;
  src: string;
  category: string;
  size: 'square' | 'wide' | 'tall' | 'large';
  colors?: string;
}

interface ImageGalleryProps {
  title: string;
  subtitle: string;
  images: GalleryItem[];
}

export default function ImageGallery({ title, subtitle, images }: ImageGalleryProps) {
  return (
    <section className="w-full pt-8 pb-24 px-6 md:px-12 relative z-20">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 gap-8 text-center md:text-left">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-sm font-sans tracking-[0.4em] uppercase text-foreground/70 font-bold block mb-4">
              {subtitle}
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-foreground font-bold max-w-lg">
              {title}
            </h2>
          </motion.div>
        </div>

        {/* Simple Standard Square Grid */}
        <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6`}>
          {images.map((item, i) => {
            const isTallCategory = title === "Long Gowns" || title === "Lehenga";
            const isWideCategory = title === "Family Combos" || title === "Siblings Combo";
            const isSquareCategory = title.includes("Sun Pleated Pant Model") || title === "Practice Sarees" || title === "Skirt Model" || title === "Saree Convert Costumes" || title === "Customer Photos";
            
            let aspectClass = "aspect-[4/5]";
            let objectPos = "object-center";
            let objectFit = "object-cover";
            let bgClass = "";
            
            if (title === "Ready-Made Blouses") {
              aspectClass = "aspect-square";
            } else if (title === "Customer Reviews") {
              aspectClass = "aspect-[2/3]";
              objectFit = "object-contain";
              bgClass = "bg-black/40";
            } else if (title === "Mehndi Designs" || title === "Saree Pre-Pleating" || title === "Aari Work Blouses" || title === "Machine Embroidery") {
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
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`relative group overflow-hidden ${aspectClass} ${bgClass} border border-foreground/10 rounded-xl`}
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
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                  <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-foreground/80 mb-2">
                    {item.category}
                  </span>
                  <div className="w-12 h-[1px] bg-foreground/50 mt-4"></div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
