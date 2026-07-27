import fs from 'fs/promises'
import path from 'path'
import { getPool } from './db'
import {
  fetchContentFromDb,
  addCategoryToDb,
  updateCategoryInDb,
  deleteCategoryFromDb,
  addImageToDb,
  updateImageInDb,
  deleteImageFromDb,
} from './db-content-store'
import { type Category, type ContentData, type ImageSize, type Section } from './types'

// Re-export so other files (like route.ts) can import these types from content-store
export type { Category, ContentData, ImageSize, Section }

// content.json lives at src/data/content.json, alongside your existing
// beautyData.ts / bharathanatyamData.ts / tailoringData.ts
const DATA_PATH = path.join(process.cwd(), 'src', 'data', 'content.json')

function nextId(items: { id: number }[]) {
  return items.length ? Math.max(...items.map((i) => i.id)) + 1 : 1
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export async function readContent(): Promise<ContentData> {
  const pool = await getPool()
  if (pool) {
    return await fetchContentFromDb()
  }

  const raw = await fs.readFile(DATA_PATH, 'utf-8')
  return JSON.parse(raw)
}

async function writeContent(data: ContentData) {
  await fs.writeFile(DATA_PATH, JSON.stringify(data, null, 2), 'utf-8')
}

export async function addCategory(
  section: Section,
  payload: { title: string; subtitle: string; cover: string }
) {
  const pool = await getPool()
  if (pool) {
    return await addCategoryToDb(section, payload)
  }

  const data = await readContent()
  const id = slugify(payload.title) || `category-${Date.now()}`
  data[section].push({ id, title: payload.title, subtitle: payload.subtitle, cover: payload.cover, images: [] })
  await writeContent(data)
  return data
}

export async function updateCategory(
  section: Section,
  categoryId: string,
  updates: { title?: string; subtitle?: string; cover?: string }
) {
  const pool = await getPool()
  if (pool) {
    return await updateCategoryInDb(section, categoryId, updates)
  }

  const data = await readContent()
  const category = data[section].find((c) => c.id === categoryId)
  if (category) Object.assign(category, updates)
  await writeContent(data)
  return data
}

export async function deleteCategory(section: Section, categoryId: string) {
  const pool = await getPool()
  if (pool) {
    return await deleteCategoryFromDb(section, categoryId)
  }

  const data = await readContent()
  data[section] = data[section].filter((c) => c.id !== categoryId)
  await writeContent(data)
  return data
}

export async function addImage(
  section: Section,
  categoryId: string,
  payload: { src: string; size: ImageSize; colors?: string }
) {
  const pool = await getPool()
  if (pool) {
    return await addImageToDb(section, categoryId, payload)
  }

  const data = await readContent()
  const category = data[section].find((c) => c.id === categoryId)
  if (category) {
    category.images.push({
      id: nextId(category.images),
      src: payload.src,
      category: category.title,
      size: payload.size,
      colors: payload.colors,
    })
    // First image becomes the cover if none is set yet
    if (!category.cover) category.cover = payload.src
  }
  await writeContent(data)
  return data
}

export async function updateImage(
  section: Section,
  categoryId: string,
  imageId: number,
  updates: { src?: string; size?: ImageSize; colors?: string }
) {
  const pool = await getPool()
  if (pool) {
    return await updateImageInDb(section, categoryId, imageId, updates)
  }

  const data = await readContent()
  const category = data[section].find((c) => c.id === categoryId)
  const image = category?.images.find((i) => i.id === imageId)
  if (image) Object.assign(image, updates)
  await writeContent(data)
  return data
}

export async function deleteImage(section: Section, categoryId: string, imageId: number) {
  const pool = await getPool()
  if (pool) {
    return await deleteImageFromDb(section, categoryId, imageId)
  }

  const data = await readContent()
  const category = data[section].find((c) => c.id === categoryId)
  if (category) {
    category.images = category.images.filter((i) => i.id !== imageId)
  }
  await writeContent(data)
  return data
}