import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const IMAGE_EXTENSIONS = ['.jpeg', '.jpg', '.png', '.webp', '.gif']

async function walk(dir: string, baseDir: string): Promise<string[]> {
  let entries
  try {
    entries = await fs.readdir(dir, { withFileTypes: true })
  } catch {
    return []
  }

  const files: string[] = []
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...(await walk(fullPath, baseDir)))
    } else if (IMAGE_EXTENSIONS.includes(path.extname(entry.name).toLowerCase())) {
      // Convert filesystem path to a public URL path, e.g. /assets/lehenga/le3.jpeg
      const relative = path.relative(baseDir, fullPath).split(path.sep).join('/')
      files.push(`/${relative}`)
    }
  }
  return files
}

export async function GET() {
  const assetsDir = path.join(process.cwd(), 'public', 'assets')
  const publicDir = path.join(process.cwd(), 'public')

  const files = await walk(assetsDir, publicDir)
  files.sort()

  return NextResponse.json({ files })
}