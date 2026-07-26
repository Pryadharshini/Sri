import { tailoringCategories } from "@/data/tailoringData";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ImageGallery from "@/components/ImageGallery";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function generateStaticParams() {
  return tailoringCategories.map((cat) => ({
    category: cat.id,
  }));
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const resolvedParams = await params;
  const categoryData = tailoringCategories.find(c => c.id === resolvedParams.category);

  if (!categoryData) {
    notFound();
  }

  return (
    <main className="w-full min-h-screen relative selection:bg-foreground selection:text-white flex flex-col bg-background">
      <Navbar />
      
      <div className="flex-grow pt-32 pb-12 px-6 max-w-[1400px] mx-auto w-full relative z-20">
        <section className="text-center mb-0 mt-8">
          <Link href="/tailoring#collections" className="inline-flex items-center gap-2 text-foreground/50 hover:text-foreground text-xs uppercase tracking-widest font-bold transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Tailoring Categories
          </Link>
        </section>

        <ImageGallery 
          title={categoryData.title} 
          subtitle={categoryData.subtitle} 
          images={categoryData.images} 
        />

        {/* Contact CTA */}
        <div className="mt-32 text-center border-t border-foreground/10 pt-20 max-w-4xl mx-auto">
          <h2 className="text-3xl font-serif text-foreground font-bold mb-6">
            Interested in this design?
          </h2>
          <p className="text-foreground/70 font-sans mb-8">
            Contact us today to inquire about custom stitching, alterations, and pricing.
          </p>
          <a 
            href="/#contact" 
            className="inline-flex items-center justify-center bg-foreground text-white px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-transparent hover:text-foreground border border-foreground transition-colors duration-300 rounded-lg shadow-xl"
          >
            Inquire Now
          </a>
        </div>
      </div>

      <Footer />
    </main>
  );
}
