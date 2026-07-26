import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us | Sri Sanjana',
  description:
    'Get in touch with Sri Sanjana for Bharathanatyam costumes, custom tailoring, and beauty parlour services.',
};

export default function ContactPage() {
  return (
    <main className="relative w-full min-h-screen bg-[#1a1114] pt-40 pb-24 px-4 sm:px-8 overflow-hidden">
      {/* ambient background glow, consistent with hero gradient treatment */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/0 via-black/10 to-black/60 z-0" />

      <div className="relative z-10 max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="mb-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <span className="w-16 h-[3px] bg-gold" />
            <span className="text-sm uppercase tracking-[0.3em] font-sans font-bold text-gold">
              Get In Touch
            </span>
            <span className="w-16 h-[3px] bg-gold" />
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif text-white tracking-[0.05em] font-bold uppercase drop-shadow-2xl">
            Contact Us
          </h1>
          <p className="mt-6 text-base md:text-lg font-sans text-white/70 max-w-[600px] mx-auto leading-relaxed">
            Whether it&apos;s a Bharathanatyam costume, a custom outfit, or a beauty
            appointment — tell us what you need and we&apos;ll get back to you.
          </p>
        </div>

        {/* Content grid */}
        <ContactForm />
      </div>
    </main>
  );
}