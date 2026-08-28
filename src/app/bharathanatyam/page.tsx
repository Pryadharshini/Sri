import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BharathanatyamHero from "@/components/bharathanatyam/BharathanatyamHero";
import BharathanatyamDescription from "@/components/bharathanatyam/BharathanatyamDescription";

export default function BharathanatyamHome() {
  return (
    <main className="w-full min-h-screen relative selection:bg-foreground selection:text-white flex flex-col">
      <Navbar />
      
      <div className="relative z-10">
        <BharathanatyamHero />
        <BharathanatyamDescription />
        <Footer />
      </div>
    </main>
  );
}
