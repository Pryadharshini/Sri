#!/usr/bin/env node
/*
  One-time DB seed script.
  Usage (locally):
    DATABASE_URL="<your_conn>" node scripts/seed-db.js

  It will create tables if missing, then insert categories and images
  from src/data/content.json. Designed for Neon/Postgres.
*/
const fs = require('fs')
const path = require('path')
const { Pool } = require('pg')

async function main() {
  const databaseUrl = process.env.DATABASE_URL
  if (!databaseUrl) {
    console.error('Missing DATABASE_URL environment variable')
    process.exit(1)
  }

  const pool = new Pool({ connectionString: databaseUrl })

  try {
    // Ensure schema
    await pool.query(`
      CREATE TABLE IF NOT EXISTS categories (
        id TEXT PRIMARY KEY,
        section TEXT NOT NULL,
        title TEXT NOT NULL,
        subtitle TEXT NOT NULL,
        cover TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS images (
        id SERIAL PRIMARY KEY,
        category_id TEXT NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
        src TEXT NOT NULL,
        category TEXT NOT NULL,
        size TEXT NOT NULL,
        colors TEXT
      );
    `)

    const dataPath = path.join(process.cwd(), 'src', 'data', 'content.json')
    const raw = fs.readFileSync(dataPath, 'utf8')
    const content = JSON.parse(raw)

    let catCount = 0
    let imgCount = 0

    for (const section of ['beauty', 'bharathanatyam', 'tailoring']) {
      const categories = content[section] || []
      for (const cat of categories) {
        const { id, title, subtitle, cover, images } = cat
        if (!id) continue
        await pool.query(
          `INSERT INTO categories (id, section, title, subtitle, cover)
           VALUES ($1,$2,$3,$4,$5)
           ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, subtitle = EXCLUDED.subtitle, cover = EXCLUDED.cover`,
          [id, section, title, subtitle, cover]
        )
        catCount++

        // Remove existing images for this category then insert from file
        await pool.query('DELETE FROM images WHERE category_id = $1', [id])
        if (Array.isArray(images)) {
          for (const img of images) {
            await pool.query(
              `INSERT INTO images (category_id, src, category, size, colors) VALUES ($1,$2,$3,$4,$5)`,
              [id, img.src, img.category || title, img.size || 'tall', img.colors || null]
            )
            imgCount++
          }
        }
      }
    }

    console.log(`Seed complete: ${catCount} categories, ${imgCount} images inserted/updated.`)
  } catch (err) {
    console.error('Seed failed:', err)
    process.exitCode = 1
  } finally {
    await pool.end()
  }
}

main()
