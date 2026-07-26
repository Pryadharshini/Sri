export interface GalleryItem {
  id: number;
  src: string;
  category: string;
  size: "square" | "wide" | "tall" | "large";
  colors?: string;
}

type Size = GalleryItem["size"];

// Helper: build a gallery array from a folder, filename prefix, count,
// category label, and either a fixed size or a repeating size cycle.
function buildGallery(
  folder: string,
  prefix: string,
  count: number,
  category: string,
  size: Size | Size[]
): GalleryItem[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    src: `/assets/${folder}/${prefix}${i + 1}.jpeg`,
    category,
    size: Array.isArray(size) ? size[i % size.length] : size,
  }));
}

export const makeupImages: GalleryItem[] = buildGallery(
  "makeup and hairstyle",
  "mh",
  32,
  "Makeup & Hairstyle",
  [
    "large", "tall", "square", "wide", "square", "tall", "square", "large", "wide", "square",
    "tall", "large", "square", "wide", "square", "tall", "large", "square", "wide", "tall",
    "square", "large", "wide", "square", "tall", "large", "square", "wide", "tall", "square",
    "large", "square"
  ]
);

export const mehndiDesignsImages: GalleryItem[] = buildGallery(
  "mehendhi",
  "m",
  44,
  "Mehndi Designs",
  "tall"
);

export const sareePrePleatingImages: GalleryItem[] = buildGallery(
  "saree_prepleading",
  "sp",
  25,
  "Saree Pre-Pleating",
  "tall"
);

export const makeupReviewImages: GalleryItem[] = buildGallery(
  "makeupreview",
  "mrev",
  2,
  "Customer Reviews",
  "tall"
);

export const beautyCategories = [
  {
    id: "saree-pre-pleating",
    title: "Saree Pre-Pleating",
    subtitle: "Perfect Draping",
    cover: sareePrePleatingImages[0]?.src,
    images: sareePrePleatingImages
  },
  {
    id: "mehndi-designs",
    title: "Mehndi Designs",
    subtitle: "Beautiful Henna Art",
    cover: mehndiDesignsImages[0]?.src,
    images: mehndiDesignsImages
  },
  {
    id: "professional-makeup-and-hairdo",
    title: "Professional Makeup & Hairdo",
    subtitle: "Beauty Parlour Services",
    cover: makeupImages[0]?.src,
    images: makeupImages
  },

  {
    id: "customer-reviews",
    title: "Customer Reviews",
    subtitle: "What Our Clients Say",
    cover: makeupReviewImages[0]?.src,
    images: makeupReviewImages
  }
];