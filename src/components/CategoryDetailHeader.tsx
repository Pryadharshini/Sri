"use client";
import React from 'react';
import Link from 'next/link';
import { ArrowLeft, CalendarCheck } from 'lucide-react';

interface Category {
  id: string;
  title: string;
  subtitle: string;
  description?: string;
}

export default function CategoryDetailHeader({ category }: { category: Category }) {
  return (
    <div className="w-full bg-[#f3a9c2] px-6 md:px-12 pt-10 pb-20">
      <div className="max-w-[1300px] mx-auto">

        <Link
          href="/tailoring"
          className="inline-flex items-center gap-2 text-sm font-bold tracking-wide text-foreground/80 hover:text-foreground transition-colors duration-300 mb-10"
        >
          <ArrowLeft className="w-4 h-4" />
          BACK TO TAILORING CATEGORIES
        </Link>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-2xl">
            <p className="uppercase tracking-[0.3em] text-xs font-bold text-foreground/70 mb-4">
              {category.subtitle}
            </p>
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-foreground leading-tight mb-4">
              {category.title}
            </h1>
            {category.description && (
              <p className="text-base md:text-lg text-foreground/70 leading-relaxed">
                {category.description}
              </p>
            )}
          </div>

          <Link
            href={`/tailoring/book-now?service=${encodeURIComponent(category.title)}`}
            className="shrink-0 inline-flex items-center gap-2 bg-foreground text-white font-bold rounded-full px-6 py-3.5 hover:brightness-110 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 self-start md:self-auto"
          >
            <CalendarCheck className="w-4 h-4" />
            Book Now
          </Link>
        </div>

      </div>
    </div>
  );
}