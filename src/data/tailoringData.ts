export interface GalleryItem {
  id: number;
  src: string;
  category: string;
  size: "square" | "wide" | "tall" | "large";
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

export const familyComboImages: GalleryItem[] = buildGallery(
  "family combo",
  "fc",
  13,
  "Family Combo",
  ["large", "tall", "square", "wide", "square", "tall", "square", "large", "wide", "square", "tall", "large", "square"]
);

export const blouseDesignImages: GalleryItem[] = buildGallery(
  "blouse designs",
  "bd",
  15,
  "Blouse Design",
  ["large", "tall", "square", "wide", "square", "tall", "square", "large", "wide", "square", "tall", "large", "square", "wide", "square"]
);

export const longGownImages: GalleryItem[] = buildGallery(
  "longgown",
  "lg",
  16,
  "Long Gown",
  ["large", "tall", "square", "wide", "square", "tall", "square", "large", "wide", "square", "tall", "large", "square", "wide", "square", "tall"]
);

export const pattuPavadaiImages: GalleryItem[] = buildGallery(
  "pattupavadai",
  "pp",
  19,
  "Pattu Pavadai",
  ["large", "tall", "square", "wide", "square", "tall", "square", "large", "wide", "square", "tall", "large", "square", "wide", "square", "tall", "large", "square", "wide"]
);

export const machineEmbroideryImages: GalleryItem[] = buildGallery(
  "machineembroidery",
  "me",
  58,
  "Machine Embroidery",
  "tall"
);

export const lehengaImages: GalleryItem[] = buildGallery(
  "lehenga",
  "le",
  14,
  "Lehenga",
  ["large", "tall", "square", "wide", "square", "tall", "square", "large", "wide", "square", "tall", "large", "square", "wide"]
);

export const kidsGownImages: GalleryItem[] = buildGallery(
  "kidsgown",
  "kg",
  18,
  "Kids Gown",
  ["large", "tall", "square", "wide", "square", "tall", "square", "large", "wide", "square", "tall", "large", "square", "wide", "square", "tall", "large", "square"]
);

export const momDaughterImages: GalleryItem[] = buildGallery(
  "mom_and_daughter",
  "md",
  30,
  "Mom & Daughter",
  [
    "large", "tall", "square", "wide", "square", "tall", "square", "large", "wide", "square",
    "tall", "large", "square", "wide", "square", "tall", "large", "square", "wide", "tall",
    "square", "large", "wide", "square", "tall", "large", "square", "wide", "tall", "square"
  ]
);

export const siblingsComboImages: GalleryItem[] = buildGallery(
  "siblings_combo",
  "sc",
  14,
  "Siblings Combo",
  ["large", "tall", "square", "wide", "square", "tall", "square", "large", "wide", "square", "tall", "large", "square", "wide"]
);

export const readyMadeBlousesImages: GalleryItem[] = buildGallery(
  "readymade_blouses",
  "rb",
  10,
  "Ready-Made Blouses",
  "tall"
);

export const tailoringCustomerReviewsImages: GalleryItem[] = buildGallery(
  "tailoring_customer_reviews",
  "tcr",
  22,
  "Customer Reviews",
  "tall"
);

export const aariWorkImages: GalleryItem[] = buildGallery(
  "aariwork",
  "aw",
  5,
  "Aari Work",
  "tall"
);

export const customizedChudiSetImages: GalleryItem[] = buildGallery(
  "customized_chudi_set",
  "ccs",
  15,
  "Customized Chudi Set",
  "tall"
);

export const tailoringCustomerPhotosImages: GalleryItem[] = Array.from({ length: 46 }, (_, i) => ({
  id: i + 1,
  src: `/assets/Tailorcustomer/t1 (${i + 1}).jpeg`,
  category: "Customer Photos",
  size: "tall" as Size,
}));

export const tailoringCategories = [
  {
    id: 'customized-chudi-sets',
    title: 'Customized Chudi Sets',
    subtitle: 'Elegant Ethnic Wear',
    cover: customizedChudiSetImages[0]?.src,
    images: customizedChudiSetImages
  },
  {
    id: 'aari-work-blouses',
    title: 'Aari Work Blouses',
    subtitle: 'Handcrafted Embroidery',
    cover: aariWorkImages[0]?.src,
    images: aariWorkImages
  },
  {
    id: "siblings-combo",
    title: "Siblings Combo",
    subtitle: "Matching Outfits",
    cover: siblingsComboImages[0]?.src,
    images: siblingsComboImages
  },
  {
    id: "mom-and-daughter-combo",
    title: "Mom & Daughter Combo",
    subtitle: "Matching Outfits",
    cover: momDaughterImages[0]?.src,
    images: momDaughterImages
  },
  {
    id: "kids-gown",
    title: "Kids Gown",
    subtitle: "Custom Stitching",
    cover: kidsGownImages[0]?.src,
    images: kidsGownImages
  },
  {
    id: "lehenga",
    title: "Lehenga",
    subtitle: "Designer Wear",
    cover: lehengaImages[0]?.src,
    images: lehengaImages
  },
  {
    id: "machine-embroidery",
    title: "Machine Embroidery",
    subtitle: "Detailed Work",
    cover: machineEmbroideryImages[0]?.src,
    images: machineEmbroideryImages
  },
  {
    id: "pattu-pavadai",
    title: "Pattu Pavadai",
    subtitle: "Traditional Wear",
    cover: pattuPavadaiImages[0]?.src,
    images: pattuPavadaiImages
  },
  {
    id: "blouse-designs",
    title: "Blouse Designs",
    subtitle: "Exquisite Creations",
    cover: blouseDesignImages[0]?.src,
    images: blouseDesignImages
  },
  {
    id: "ready-made-blouses",
    title: "Ready-Made Blouses",
    subtitle: "Instant Elegance",
    cover: readyMadeBlousesImages[0]?.src,
    images: readyMadeBlousesImages
  },
  {
    id: "long-gowns",
    title: "Long Gowns",
    subtitle: "Adult Wear",
    cover: longGownImages[0]?.src,
    images: longGownImages
  },
  {
    id: "family-combos",
    title: "Family Combos",
    subtitle: "Coordinated Outfits",
    cover: familyComboImages[0]?.src,
    images: familyComboImages
  },
  {
    id: "customer-photos",
    title: "Customer Photos",
    subtitle: "Happy Clients",
    cover: tailoringCustomerPhotosImages[0]?.src,
    images: tailoringCustomerPhotosImages
  },
  {
    id: "customer-reviews",
    title: "Customer Reviews",
    subtitle: "What our clients say",
    cover: tailoringCustomerReviewsImages[0]?.src,
    images: tailoringCustomerReviewsImages
  }
];