export interface GalleryItem {
  id: number;
  src: string;
  category: string;
  size: "square" | "wide" | "tall" | "large";
  colors?: string;
}

type Size = GalleryItem["size"];

// Helper: build a gallery array from a folder, filename prefix, count,
// category label, a fixed size or repeating size cycle, and an optional
// per-item colors list.
function buildGallery(
  folder: string,
  prefix: string,
  count: number,
  category: string,
  size: Size | Size[],
  colors?: string[]
): GalleryItem[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    src: `/assets/${folder}/${prefix}${i + 1}.jpeg`,
    category,
    size: Array.isArray(size) ? size[i % size.length] : size,
    ...(colors ? { colors: colors[i] } : {}),
  }));
}

const sunPleatedPantColors = [
  "Pink & Maroon", "Pink & Green", "Maroon & Pink", "Pink & Olive Green",
  "Pink & Forest Green", "Pink & Gold", "Pink & Red"
];

export const sunPleatedPantImages: GalleryItem[] = Array.from({ length: 33 }, (_, i) => {
  const isModel = [17, 25, 26, 28, 29, 30, 31].includes(i + 1);
  const folder = isModel ? "models/" : "";
  return {
    id: `sun-pleated-silk-${i + 1}`,
    src: `/assets/sun_pleated_pant_model_with_silk_zari_border/${folder}dress${i + 1}.jpeg`,
    category: "Sun Pleated Pant Model",
    size: "tall" as Size,
    colors: sunPleatedPantColors[i] || "Assorted",
  };
});

export const threadBorderImages: GalleryItem[] = [
  ...buildGallery(
    "sunpleated_pant_model_with_thread_border",
    "sp",
    16,
    "Thread Border",
    "tall",
    [
      "Blue & Royal Blue", "Cyan & Royal Blue", "Orange & Blue", "Cyan & Navy Blue",
      "Cyan & Blue", "Blue & Maroon", "Solid Red", "Red & Blue",
      "Yellow & Red", "Orange & Purple", "Blue & Pink", "Pink & Blue",
      "Pink & Blue", "Pink & Teal", "Pink & Teal", "Orange & Blue"
    ]
  ),
  {
    id: 17,
    src: "/assets/sunpleated_pant_model_with_thread_border/combination.jpeg",
    category: "Thread Border",
    size: "tall"
  }
];

export const practiceSareesImages: GalleryItem[] = buildGallery(
  "practice sarees",
  "ps",
  16,
  "Practice Sarees",
  "tall"
);

export const skirtModelImages: GalleryItem[] = [
  ...buildGallery(
    "skirtmodel",
    "sm",
    21,
    "Skirt Model",
    "tall"
  ),
  {
    id: 22,
    src: "/assets/skirtmodel/combination.jpeg",
    category: "Skirt Model",
    size: "tall"
  }
];

export const sareeConvertCostumesImages: GalleryItem[] = buildGallery(
  "sareeconvertcostumes",
  "sc",
  23,
  "Saree Convert Costumes",
  "tall"
);

export const bharathanatyamCustomerPhotosImages: GalleryItem[] = buildGallery(
  "bharathanatyam_customer_photos",
  "bcp",
  48,
  "Customer Photos",
  "tall"
);

export const bharathanatyamJewelryImages: GalleryItem[] = buildGallery(
  "bharathanatyam_jewelery and accessories",
  "j",
  10,
  "Jewelry & Accessories",
  "tall"
);

export const bharathanatyamCustomerReviewsImages: GalleryItem[] = buildGallery(
  "bharathanatyam_customer_reviews",
  "cr",
  10,
  "Customer Reviews",
  "tall"
);

export const practiceChudiImages: GalleryItem[] = buildGallery(
  "practice_chudi_set_kids_and_adults",
  "pc",
  8,
  "Practice Chudi Set Kids and Adult",
  "tall"
);

export const kathakaliDanceCostumesImages: GalleryItem[] = [
  { id: 1, src: "/assets/kathakalidancecostumes/kdc1.jpeg", category: "Kathakali Dance Costumes", size: "tall" },
  { id: 2, src: "/assets/kathakalidancecostumes/kdc3.jpeg", category: "Kathakali Dance Costumes", size: "tall" },
  { id: 3, src: "/assets/kathakalidancecostumes/kdc4.jpeg", category: "Kathakali Dance Costumes", size: "tall" },
  { id: 4, src: "/assets/kathakalidancecostumes/kdc2.jpeg", category: "Kathakali Dance Costumes", size: "tall" }
];

export const bharathanatyamCategories = [
  {
    id: "sun-pleated-pant",
    title: "Sun Pleated Pant Model with Silk Zari Border",
    subtitle: "Silk Zari Border",
    cover: sunPleatedPantImages[0]?.src,
    images: sunPleatedPantImages
  },
  {
    id: "sun-pleated-pant-thread-border",
    title: "Sun Pleated Pant Model with Thread Border",
    subtitle: "Thread Border",
    cover: threadBorderImages[0]?.src,
    images: threadBorderImages
  },
  {
    id: "kathakali-dance-costumes",
    title: "Kathakali Dance Costumes",
    subtitle: "Traditional Attire",
    cover: kathakaliDanceCostumesImages[0]?.src,
    images: kathakaliDanceCostumesImages
  },
 
  {
    id: "skirt-model",
    title: "Skirt Model",
    subtitle: "Classic Elegance",
    cover: skirtModelImages[0]?.src,
    images: skirtModelImages
  },
  {
    id: "practice-chudi-set-kids-and-adult",
    title: "Practice Chudi Set Kids and Adult",
    subtitle: "Comfortable Practice Wear",
    cover: practiceChudiImages[0]?.src,
    images: practiceChudiImages
  },

  {
    id: "practice-sarees",
    title: "Practice Sarees",
    subtitle: "Comfortable Practice Wear",
    cover: practiceSareesImages[0]?.src,
    images: practiceSareesImages
  },
  {
    id: "saree-convert-costumes",
    title: "Saree Convert Costumes",
    subtitle: "Custom Converted",
    cover: sareeConvertCostumesImages[0]?.src,
    images: sareeConvertCostumesImages
  },
  {
    id: "jewelery-and-accessories",
    title: "Jewelry & Accessories",
    subtitle: "Traditional Ornaments",
    cover: bharathanatyamJewelryImages[0]?.src,
    images: bharathanatyamJewelryImages
  },
  {
    id: "customer-photos",
    title: "Customer Photos",
    subtitle: "Happy Dancers",
    cover: bharathanatyamCustomerPhotosImages[0]?.src,
    images: bharathanatyamCustomerPhotosImages
  },
  {
    id: "customer-reviews",
    title: "Customer Reviews",
    subtitle: "What our clients say",
    cover: bharathanatyamCustomerReviewsImages[0]?.src,
    images: bharathanatyamCustomerReviewsImages
  }
];