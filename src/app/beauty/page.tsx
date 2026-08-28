import Navbar from "@/components/Navbar";
import BeautyHero from "@/components/beauty/BeautyHero";
import BeautyDescription from "@/components/beauty/BeautyDescription";
import Footer from "@/components/Footer";

export default function BeautyParlour() {
  return (
    <main className="w-full min-h-screen relative selection:bg-foreground selection:text-white flex flex-col">
      <Navbar />
      
      <div className="relative z-10">
        <BeautyHero />
        <BeautyDescription />
        <Footer />
      </div>
    </main>
  );
}
