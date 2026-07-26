import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="w-full bg-foreground border-t border-white/10 py-20 relative z-20">
      <div className="w-full max-w-[1400px] mx-auto px-8 flex flex-col items-center">
        
        {/* Logo & Brand */}
        <div className="mb-12 flex flex-col items-center">
          <div className="relative w-24 h-24 mb-6 bg-white rounded-full p-3 shadow-xl overflow-hidden">
            <Image src="/assets/finallogo1.png" alt="Sri Sanjana Logo" fill className="object-contain p-2" />
          </div>
          <h2 className="text-3xl font-serif text-white font-bold tracking-[0.1em] uppercase">
            Sri Sanjana
          </h2>
          <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-sans font-bold text-white/80 mt-4 mb-6 text-center">
            Bharathanatyam | Tailoring | Beauty Parlour
          </p>
          <div className="flex flex-col items-center gap-1 text-white/70 font-sans text-sm text-center">
            <p>Andikinatru St, Sivagami Puram</p>
            <p>Virudhunagar, Tamil Nadu 626001</p>
            <p className="mt-3 font-bold tracking-[0.1em] text-white">
              Ph: +91 83447 18008
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center gap-8 mb-16">
          <Link href="/bharathanatyam" className="text-xs uppercase tracking-[0.1em] font-sans font-bold text-white/90 hover:text-white transition-colors">
            Bharathanatyam
          </Link>
          <Link href="/tailoring" className="text-xs uppercase tracking-[0.1em] font-sans font-bold text-white/90 hover:text-white transition-colors">
            Tailoring
          </Link>
          <Link href="/beauty" className="text-xs uppercase tracking-[0.1em] font-sans font-bold text-white/90 hover:text-white transition-colors">
            Beauty Parlour
          </Link>
           <Link href="/contact" className="text-xs uppercase tracking-[0.1em] font-sans font-bold text-white/90 hover:text-white transition-colors">
    Contact
  </Link>
        </div>

        {/* Bottom Bar */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center border-t border-white/10 pt-8">
          <p className="text-xs font-sans text-white/60 mb-4 md:mb-0 font-bold">
            &copy; 2026 Sri Sanjana. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="https://www.instagram.com/sri_sanjana_beautyparlour/" target="_blank" rel="noopener noreferrer" className="text-xs font-sans text-white/80 hover:text-white transition-colors font-bold">Instagram</a>
            <Link href="#" className="text-xs font-sans text-white/80 hover:text-white transition-colors font-bold">Facebook</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
