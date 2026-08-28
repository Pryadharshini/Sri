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

function getCategoryDescription(id: string, title: string, subtitle: string) {
  return `Explore our ${title.toLowerCase()} collection — ${subtitle.toLowerCase()}, custom tailored with attention to fit, fabric, and finish.`;
}

export default async function BharathanatyamCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  const content = await readContent();
  const categoryData = content.bharathanatyam.find((c) => c.id === category);

  if (!categoryData) {
    notFound();
  }

  const description = getCategoryDescription(
    categoryData.id,
    categoryData.title,
    categoryData.subtitle,
  );

  return (
    <main className="w-full min-h-screen relative selection:bg-foreground selection:text-white flex flex-col">
      <Navbar />

      <div className="flex-grow pt-32 pb-24 px-6 max-w-[1400px] mx-auto w-full">
        {/* Header & Back Button */}
        <section className="mb-4">
          <Link
            href="/bharathanatyam"
            className="inline-flex items-center gap-2 text-foreground/50 hover:text-foreground text-xs uppercase tracking-widest font-bold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Collection
          </Link>
        </section>

        {/* Gallery Component */}
        <ImageGallery
          title={categoryData.title}
          subtitle={categoryData.subtitle}
          description={description}
          bookNowHref="/bharathanatyam/book-now"
          images={categoryData.images}
        />

        {/* Contact CTA */}
        <div className="mt-32 text-center border-t border-foreground/10 pt-20 max-w-4xl mx-auto">
          <h2 className="text-3xl font-serif text-foreground font-bold mb-6">
            Interested in this design?
          </h2>
          <p className="text-foreground/70 font-sans mb-8">
            Contact us today to inquire about sizes, pricing, and custom
            alterations for this model.
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
