export type ImageSize = 'square' | 'wide' | 'tall' | 'large'

export type GalleryImage = {
  id: number
  src: string
  category: string
  size: ImageSize
  colors?: string
}

export type Category = {
  id: string
  title: string
  subtitle: string
  cover: string
  images: GalleryImage[]
}

export type ContentData = {
  beauty: Category[]
  bharathanatyam: Category[]
  tailoring: Category[]
}

export type Section = keyof ContentData
