import { NextResponse } from 'next/server'
import { getPool } from '@/lib/db'
import contentData from '@/data/content.json'

const SECTIONS = ['beauty', 'bharathanatyam', 'tailoring'] as const

export async function GET(request: Request) {
  const url = new URL(request.url)
  const key = url.searchParams.get('key')

  if (key !== process.env.SEED_SECRET) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const pool = await getPool()
  if (!pool) {
    return NextResponse.json({ message: 'Database not configured' }, { status: 500 })
  }

  let categoriesInserted = 0
  let imagesInserted = 0

  for (const section of SECTIONS) {
    const categories = (contentData as any)[section] || []

    for (const category of categories) {
      const newCategoryId = `${section}-${category.id}`

      await pool.query(
        `INSERT INTO categories (id, section, title, subtitle, cover)
         VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT (id) DO NOTHING`,
        [newCategoryId, section, category.title, category.subtitle, category.cover]
      )
      categoriesInserted++

      for (const image of category.images || []) {
        await pool.query(
          `INSERT INTO images (category_id, src, category, size, colors)
           VALUES ($1, $2, $3, $4, $5)`,
          [newCategoryId, image.src, image.category, image.size, image.colors || null]
        )
        imagesInserted++
      }
    }
  }

  return NextResponse.json({
    message: 'Seed complete',
    categoriesInserted,
    imagesInserted,
  })
}