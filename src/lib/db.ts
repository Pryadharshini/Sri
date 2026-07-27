import { Pool } from 'pg'

let pool: Pool | null = null
let initialized = false

function getDatabaseUrl() {
  return process.env.DATABASE_URL?.trim() || null
}

async function ensureSchema(pool: Pool) {
  await pool.query(
    `
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
    `
  )
}

export async function getPool() {
  if (pool) return pool
  const databaseUrl = getDatabaseUrl()
  if (!databaseUrl) return null

  pool = new Pool({
    connectionString: databaseUrl,
    ssl:
      process.env.NODE_ENV === 'production'
        ? { rejectUnauthorized: false }
        : undefined,
  })

  if (!initialized) {
    await ensureSchema(pool)
    initialized = true
  }

  return pool
}
