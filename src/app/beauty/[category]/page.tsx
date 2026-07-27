import { readContent } from "@/lib/content-store";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ImageGallery from "@/components/ImageGallery";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

// Read fresh data on every request instead of baking it in at build time,
// so categories/images added via /admin show up immediately.
export const dynamic = "force-dynamic";

export default async function BeautyCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  const content = await readContent();
  const categoryData = content.beauty.find((c) => c.id === category);

  if (!categoryData) {
    notFound();
  }

  return (
    <main className="w-full min-h-screen relative selection:bg-foreground selection:text-white flex flex-col">
      <Navbar />

      <div className="flex-grow pt-32 pb-24 px-6 max-w-[1400px] mx-auto w-full">
        <section className="mb-4">
          <Link
            href="/beauty"
            className="inline-flex items-center gap-2 text-foreground/50 hover:text-foreground text-xs uppercase tracking-widest font-bold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Services
          </Link>
        </section>

        <ImageGallery
          title={categoryData.title}
          subtitle={categoryData.subtitle}
          bookNowHref="/beauty/book-now"
          images={categoryData.images}
        />

        <div className="mt-32 text-center border-t border-foreground/10 pt-20 max-w-4xl mx-auto">
          <h2 className="text-3xl font-serif text-foreground font-bold mb-6">
            Book an Appointment
          </h2>
          <p className="text-foreground/70 font-sans mb-8">
            Contact us today to inquire about our premium beauty services for
            your next occasion.
          </p>
          <a
            href="/contact"
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
