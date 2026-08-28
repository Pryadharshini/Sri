import Navbar from "@/components/Navbar";
import TailoringHero from "@/components/tailoring/TailoringHero";
import TailoringDescription from "@/components/tailoring/TailoringDescription";
import Footer from "@/components/Footer";

export default function TailoringHome() {
  return (
    <main className="w-full min-h-screen relative selection:bg-foreground selection:text-white flex flex-col">
      <Navbar />
      
      <div className="relative z-10">
        <TailoringHero />
        <TailoringDescription />
        <Footer />
      </div>
    </main>
  );
}
