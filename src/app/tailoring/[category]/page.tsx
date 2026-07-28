import { readContent } from "@/lib/content-store";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ImageGallery from "@/components/ImageGallery";
import Link from "next/link";
import { ArrowLeft, CalendarCheck } from "lucide-react";

// Read fresh data on every request instead of baking it in at build time,
// so categories/images added via /admin show up immediately.
export const dynamic = "force-dynamic";

// Topic-relevant descriptions per category. Falls back to a generic
// line built from the title/subtitle if a category id isn't listed here.
const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  "blouse-designs":
    "Handpicked blouse designs featuring intricate necklines, sleeve patterns, and finishing details — tailored to complement your saree or lehenga perfectly.",
  "ready-made-blouses":
    "Instantly elegant, ready-made blouses crafted with quality fabric and precise stitching — perfect for when you need a polished look without the wait.",
  "aari-work-blouses":
    "Traditional Aari embroidery blouses, hand-crafted with fine threadwork, beads, and sequins for a rich, festive finish.",
  "machine-embroidery":
    "Detailed machine embroidery work offering intricate patterns with consistent precision, ideal for blouses, dupattas, and borders.",
  "pattu-pavadai":
    "Traditional pattu pavadai sets in vibrant silk, designed with classic zari borders — perfect for little ones on festive occasions.",
  lehenga:
    "Designer lehengas tailored to fit, featuring rich fabrics, detailed embroidery, and flowing silhouettes for weddings and celebrations.",
  "customized-chudi-sets":
    "Fully customized chudi sets designed to your measurements and style preferences, blending comfort with elegant detailing.",
  "mom-and-daughter-combo":
    "Matching mom-and-daughter outfit sets, thoughtfully coordinated in fabric and design for that perfect twinning moment.",
  "siblings-combo":
    "Coordinated sibling outfit sets stitched with matching patterns and colors, made for family portraits and special occasions.",
  "family-combos":
    "Complete family combo outfits designed with a shared theme, giving every member a coordinated, festive look.",
  "long-gowns":
    "Elegant long gowns tailored for a flattering fit, available in a range of fabrics and styles for parties and formal occasions.",
  "kids-gown":
    "Adorable kids' gowns combining comfort and style, custom stitched to size for birthdays, functions, and special days.",
  saree:
    "Beautifully draped and finished saree styling with custom blouse pairing options, tailored to bring out the fabric's best.",
};

function getCategoryDescription(id: string, title: string, subtitle: string) {
  return (
    CATEGORY_DESCRIPTIONS[id] ??
    `Explore our ${title.toLowerCase()} collection — ${subtitle.toLowerCase()}, custom tailored with attention to fit, fabric, and finish.`
  );
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const resolvedParams = await params;
  const content = await readContent();
  const categoryData = content.tailoring.find(
    (c) => c.id === resolvedParams.category,
  );

  if (!categoryData) {
    notFound();
  }

  const description = getCategoryDescription(
    categoryData.id,
    categoryData.title,
    categoryData.subtitle,
  );

  return (
    <main className="w-full min-h-screen relative selection:bg-foreground selection:text-white flex flex-col bg-background">
      <Navbar />

      <div className="flex-grow pt-32 pb-12 px-6 max-w-[1400px] mx-auto w-full relative z-20">
        <section className="text-center mb-0 mt-8">
          <Link
            href="/tailoring#collections"
            className="inline-flex items-center gap-2 text-foreground/50 hover:text-foreground text-xs uppercase tracking-widest font-bold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Tailoring Categories
          </Link>
        </section>

        <ImageGallery
          title={categoryData.title}
          subtitle={categoryData.subtitle}
          description={description}
          bookNowHref="/tailoring/book-now"
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
