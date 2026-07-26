import Image from "next/image";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Craftsmanship from "@/components/Craftsmanship";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="w-full min-h-screen relative selection:bg-foreground selection:text-white">

      {/* Single continuous pink thread & needle background for the whole page */}
      <div className="fixed inset-0 -z-50">
        <Image
          src="/assets/bc.png"
          alt=""
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      <div className="relative z-10">
        <Navbar />
        <Hero />
        <Features />
        <Craftsmanship />
        <Testimonials />
        <Footer />
      </div>
    </main>
  );
}