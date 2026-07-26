"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Loader2,
  CheckCircle2,
  AlertCircle,
  MapPin,
  Phone,
  Camera,
} from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

const services = [
  "Bharathanatyam Costumes",
  "Custom Tailoring & Designer Wear",
  "Aari & Hand Embroidery",
  "Beauty Parlour & Aesthetics",
  "Tattoo Services",
  "Other",
];

const WHATSAPP_NUMBER = "918344718008"; // replace if WhatsApp business number differs from call number

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: services[0],
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    const text =
      `New enquiry from website:\n` +
      `Name: ${form.name}\n` +
      `Email: ${form.email}\n` +
      `Phone: ${form.phone}\n` +
      `Service: ${form.service}\n` +
      `Message: ${form.message}`;

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      text
    )}`;

    window.open(whatsappUrl, "_blank");

    setStatus("success");

    setForm({
      name: "",
      email: "",
      phone: "",
      service: services[0],
      message: "",
    });
  };

  const inputClasses =
    "w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white placeholder:text-white/40 font-sans focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors";

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        hidden: {
          opacity: 0,
          y: 30,
        },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.7,
            staggerChildren: 0.1,
          },
        },
      }}
      className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start"
    >
      {/* LEFT CARD: Form */}
      <motion.form
        onSubmit={handleSubmit}
        variants={{
          hidden: { opacity: 0, y: 10 },
          visible: { opacity: 1, y: 0 },
        }}
        className="space-y-5 order-2 md:order-1 bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs uppercase tracking-[0.15em] font-bold text-white/60 mb-2">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              className={inputClasses}
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-[0.15em] font-bold text-white/60 mb-2">
              Phone
            </label>

            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="+91 00000 00000"
              className={inputClasses}
            />
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-[0.15em] font-bold text-white/60 mb-2">
            Email
          </label>

          <input
            type="email"
            name="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className={inputClasses}
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-[0.15em] font-bold text-white/60 mb-2">
            Service Interested In
          </label>

          <select
            name="service"
            value={form.service}
            onChange={handleChange}
            className={`${inputClasses} appearance-none cursor-pointer`}
          >
            {services.map((service) => (
              <option
                key={service}
                value={service}
                className="bg-[#1a1114]"
              >
                {service}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-[0.15em] font-bold text-white/60 mb-2">
            Message
          </label>

          <textarea
            name="message"
            rows={5}
            required
            value={form.message}
            onChange={handleChange}
            placeholder="Tell us about what you're looking for..."
            className={`${inputClasses} resize-none`}
          />
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="btn-structured border-gold bg-gold text-[#1a1114] hover:bg-transparent hover:text-gold hover:border-gold shadow-xl text-sm md:text-base w-full sm:w-auto flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === "loading" && (
            <Loader2 className="w-4 h-4 animate-spin" />
          )}

          {status === "loading" ? "Sending..." : "Send Message"}
        </button>

        {status === "success" && (
          <p className="mt-4 flex items-center gap-2 text-sm text-green-400">
            <CheckCircle2 className="w-4 h-4" />
            Thank you! We'll get back to you shortly.
          </p>
        )}

        {status === "error" && (
          <p className="mt-4 flex items-center gap-2 text-sm text-red-400">
            <AlertCircle className="w-4 h-4" />
            Something went wrong. Please try again.
          </p>
        )}
      </motion.form>

      {/* RIGHT CARD: Heading + Contact Info */}
      <div className="order-1 md:order-2 bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl">
        <motion.div
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          className="mb-10"
        >
          <span className="text-xs uppercase tracking-[0.3em] font-sans font-bold text-gold">
            Contact Us
          </span>

          <h2 className="mt-2 font-serif text-3xl text-white font-bold">
            Get In Touch
          </h2>

          <p className="mt-4 text-white/70 max-w-2xl leading-relaxed">
            We'd love to hear from you. Contact us for Bharathanatyam costumes,
            custom tailoring, beauty parlour services, or any enquiries.
          </p>
        </motion.div>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0 },
          }}
          className="grid gap-5"
        >
          <div className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-2xl p-5">
            <MapPin className="w-6 h-6 text-gold mt-1 flex-shrink-0" />

            <div>
              <h4 className="text-white font-semibold mb-1">Address</h4>
              <p className="text-white/70">
                Andikinatru St, Sivagami Puram
                <br />
                Virudhunagar, Tamil Nadu 626001
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-2xl p-5">
            <Phone className="w-6 h-6 text-gold mt-1 flex-shrink-0" />

            <div>
              <h4 className="text-white font-semibold mb-1">Phone</h4>

              
                <a href="tel:+918344718008"
                className="text-white/70 hover:text-gold transition-colors">
                +91 83447 18008
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-2xl p-5">
            <Camera className="w-6 h-6 text-gold mt-1 flex-shrink-0" />

            <div>
              <h4 className="text-white font-semibold mb-1">Instagram</h4>

              
                <a href="https://www.instagram.com/sri_sanjana_beautyparlour/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-gold transition-colors">
                @sri_sanjana_beautyparlour
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}