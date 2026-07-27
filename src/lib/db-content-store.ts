import { getPool } from './db'
import { type Category, type ContentData } from './types'

function toCategoryRow(row: any): Category {
  return {
    id: row.id,
    title: row.title,
    subtitle: row.subtitle,
    cover: row.cover,
    images: [],
  }
}

function toImageRow(row: any) {
  return {
    id: row.id,
    src: row.src,
    category: row.category,
    size: row.size,
    colors: row.colors || undefined,
  }
}

export async function fetchContentFromDb(): Promise<ContentData> {
  const pool = await getPool()
  if (!pool) throw new Error('Database not configured')

  const categoriesRes = await pool.query('SELECT * FROM categories')
  const imagesRes = await pool.query('SELECT * FROM images ORDER BY id')

  const data: ContentData = { beauty: [], bharathanatyam: [], tailoring: [] }

  const imageMap: Record<string, ReturnType<typeof toImageRow>[]> = {}
  for (const row of imagesRes.rows) {
    const image = toImageRow(row)
    imageMap[row.category_id] = imageMap[row.category_id] || []
    imageMap[row.category_id].push(image)
  }

  for (const row of categoriesRes.rows) {
    const category = toCategoryRow(row)
    category.images = imageMap[category.id] || []
    const section = row.section as keyof ContentData
    if (data[section]) {
      data[section].push(category)
    }
  }

  return data
}

export async function addCategoryToDb(section: string, payload: { title: string; subtitle: string; cover: string }) {
  const pool = await getPool()
  if (!pool) throw new Error('Database not configured')

  const id = payload.title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

  await pool.query(
    'INSERT INTO categories (id, section, title, subtitle, cover) VALUES ($1, $2, $3, $4, $5)',
    [id, section, payload.title, payload.subtitle, payload.cover]
  )

  return await fetchContentFromDb()
}

export async function updateCategoryInDb(section: string, categoryId: string, updates: { title?: string; subtitle?: string; cover?: string }) {
  const pool = await getPool()
  if (!pool) throw new Error('Database not configured')

  const fields = []
  const values = []
  let idx = 1

  if (updates.title) {
    fields.push(`title = $${idx++}`)
    values.push(updates.title)
  }
  if (updates.subtitle) {
    fields.push(`subtitle = $${idx++}`)
    values.push(updates.subtitle)
  }
  if (updates.cover) {
    fields.push(`cover = $${idx++}`)
    values.push(updates.cover)
  }

  if (fields.length === 0) return await fetchContentFromDb()

  values.push(section, categoryId)
  await pool.query(
    `UPDATE categories SET ${fields.join(', ')} WHERE section = $${idx++} AND id = $${idx++}`,
    values
  )

  return await fetchContentFromDb()
}

export async function deleteCategoryFromDb(section: string, categoryId: string) {
  const pool = await getPool()
  if (!pool) throw new Error('Database not configured')
  await pool.query('DELETE FROM categories WHERE section = $1 AND id = $2', [section, categoryId])
  return await fetchContentFromDb()
}

export async function addImageToDb(
  section: string,
  categoryId: string,
  payload: { src: string; size: string; colors?: string }
) {
  const pool = await getPool()
  if (!pool) throw new Error('Database not configured')

  const categoryRes = await pool.query('SELECT id, title FROM categories WHERE id = $1 AND section = $2', [categoryId, section])
  if (!categoryRes.rows.length) throw new Error('Category not found')

  await pool.query(
    'INSERT INTO images (category_id, src, category, size, colors) VALUES ($1, $2, $3, $4, $5)',
    [categoryId, payload.src, categoryRes.rows[0].title, payload.size, payload.colors || null]
  )

  return await fetchContentFromDb()
}

export async function updateImageInDb(
  section: string,
  categoryId: string,
  imageId: number,
  updates: { src?: string; size?: string; colors?: string }
) {
  const pool = await getPool()
  if (!pool) throw new Error('Database not configured')

  const fields = []
  const values = []
  let idx = 1

  if (updates.src) {
    fields.push(`src = $${idx++}`)
    values.push(updates.src)
  }
  if (updates.size) {
    fields.push(`size = $${idx++}`)
    values.push(updates.size)
  }
  if (updates.colors !== undefined) {
    fields.push(`colors = $${idx++}`)
    values.push(updates.colors)
  }

  if (fields.length === 0) return await fetchContentFromDb()

  values.push(imageId, categoryId)
  await pool.query(
    `UPDATE images SET ${fields.join(', ')} WHERE id = $${idx++} AND category_id = $${idx++}`,
    values
  )

  return await fetchContentFromDb()
}

export async function deleteImageFromDb(section: string, categoryId: string, imageId: number) {
  const pool = await getPool()
  if (!pool) throw new Error('Database not configured')

  await pool.query('DELETE FROM images WHERE id = $1 AND category_id = $2', [imageId, categoryId])
  return await fetchContentFromDb()
}