"use client";
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { User, Phone, CalendarDays, Clock, MessageSquare, Send, ChevronDown } from 'lucide-react';

export interface BookAppointmentFormProps {
  heading?: string;
  tagline?: string;
  categories?: string[];
  /** Country code + number, no "+", no spaces, e.g. "919876543210" */
  whatsappNumber?: string;
}

interface BookingFormState {
  name: string;
  phone: string;
  category: string;
  date: string;
  time: string;
  details: string;
}

type FormErrors = Partial<Record<keyof BookingFormState, string>>;

/**
 * Reusable WhatsApp booking form.
 *
 * Usage (see TailoringBookNow.tsx / BharathanatyamBookNow.tsx / BeautyBookNow.tsx
 * for ready-made examples):
 *
 * <BookAppointmentForm
 *   heading="Book Your Order"
 *   tagline="Sri Sanjana Tailoring"
 *   categories={["Blouse Designs", "Lehenga", ...]}
 *   whatsappNumber="919999999999"
 * />
 */
export default function BookAppointmentForm({
  heading = "Book Your Order",
  tagline = "Sri Sanjana",
  categories = [],
  whatsappNumber = "919999999999",
}: BookAppointmentFormProps) {
  const [form, setForm] = useState<BookingFormState>({
    name: "",
    phone: "",
    category: categories[0] || "",
    date: "",
    time: "",
    details: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange =
    (field: keyof BookingFormState) =>
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const { value } = e.target;
      setForm((prev) => ({ ...prev, [field]: value }));
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  const validate = (): boolean => {
    const next: FormErrors = {};
    if (!form.name.trim()) next.name = "Please enter your name";
    if (!form.phone.trim()) next.phone = "Please enter your phone number";
    else if (!/^\+?\d{7,15}$/.test(form.phone.replace(/\s/g, "")))
      next.phone = "Enter a valid phone number";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    const lines: string[] = [
      `*New Booking Request* 🧵`,
      `*Name:* ${form.name}`,
      `*Phone:* ${form.phone}`,
      form.category ? `*Service:* ${form.category}` : "",
      form.date ? `*Preferred Date:* ${form.date}` : "",
      form.time ? `*Preferred Time:* ${form.time}` : "",
      form.details ? `*Details:* ${form.details}` : "",
    ].filter((line): line is string => Boolean(line));

    const message = encodeURIComponent(lines.join("\n"));
    const url = `https://wa.me/${whatsappNumber}?text=${message}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const inputClass =
    "w-full rounded-xl border border-gold/30 bg-white/70 dark:bg-white/5 px-4 py-3 text-sm font-sans text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all duration-300";

  return (
    <section className="w-full py-24 bg-background relative z-20">
      <div className="max-w-[700px] mx-auto px-6 md:px-12">

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="text-foreground/80 tracking-[0.4em] uppercase text-xs font-bold block mb-4">
            {tagline}
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-foreground font-bold text-center leading-tight">
            {heading}
          </h2>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative overflow-hidden rounded-[28px] shadow-xl bg-gradient-to-b from-[#fdf0f3] to-[#fbe4ea] dark:from-zinc-900 dark:to-zinc-950 border border-gold/30"
        >
          <div
            className="absolute inset-0 opacity-[0.35] pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)',
              backgroundSize: '18px 18px',
              color: 'var(--gold, #c9a15a)'
            }}
          />

          {/* Ornate header band */}
          <div className="relative z-10 bg-foreground px-8 py-7 text-center">
            <h3 className="text-xl font-serif text-white uppercase tracking-[0.25em] font-bold">
              Order Details
            </h3>
            <div className="flex items-center justify-center gap-3 mt-3">
              <span className="h-px w-10 bg-gold/60"></span>
              <span className="w-1.5 h-1.5 rotate-45 bg-gold"></span>
              <span className="h-px w-10 bg-gold/60"></span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="relative z-10 p-8 md:p-10 space-y-5">

            {/* Name */}
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-foreground/80 mb-2">
                <User className="w-4 h-4 text-gold" /> Full Name
              </label>
              <input
                type="text"
                placeholder="Your name"
                value={form.name}
                onChange={handleChange("name")}
                className={inputClass}
              />
              {errors.name && <p className="text-xs text-rose-600 mt-1">{errors.name}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-foreground/80 mb-2">
                <Phone className="w-4 h-4 text-gold" /> WhatsApp Number
              </label>
              <input
                type="tel"
                placeholder="e.g. 9876543210"
                value={form.phone}
                onChange={handleChange("phone")}
                className={inputClass}
              />
              {errors.phone && <p className="text-xs text-rose-600 mt-1">{errors.phone}</p>}
            </div>

            {/* Category */}
            {categories.length > 0 && (
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-foreground/80 mb-2">
                  <MessageSquare className="w-4 h-4 text-gold" /> Service
                </label>
                <div className="relative">
                  <select
                    value={form.category}
                    onChange={handleChange("category")}
                    className={`${inputClass} appearance-none pr-10`}
                  >
                    {categories.map((c, i) => (
                      <option key={i} value={c}>{c}</option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-gold absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            )}

           
            {/* Details */}
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-foreground/80 mb-2">
                <MessageSquare className="w-4 h-4 text-gold" /> Order Details / Measurements
              </label>
              <textarea
                rows={4}
                placeholder="Tell us what you need — fabric, measurements, reference photos, etc."
                value={form.details}
                onChange={handleChange("details")}
                className={`${inputClass} resize-none`}
              />
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group relative w-full overflow-hidden rounded-[28px] shadow-xl bg-gradient-to-r from-[#e2c07f] via-[#c9a15a] to-[#a9803e] py-4 flex items-center justify-center gap-3 hover:shadow-2xl transition-all duration-300"
            >
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={{ x: "-120%" }}
                animate={{ x: "220%" }}
                transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 1.5, ease: "easeInOut" }}
                style={{ width: "40%", skewX: -20 }}
              />
              <Send className="relative z-10 w-5 h-5 text-white" />
              <span className="relative z-10 text-lg font-serif font-bold text-white drop-shadow-sm">
                Send Order via WhatsApp
              </span>
            </motion.button>

            <p className="text-center text-xs text-foreground/50 pt-1">
              You'll be redirected to WhatsApp with your order pre-filled — just hit send.
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
}