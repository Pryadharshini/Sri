import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
const MAX_SIZE_BYTES = 10 * 1024 * 1024 // 10MB

function sanitizeFilename(name: string) {
  const ext = path.extname(name).toLowerCase()
  const base = path
    .basename(name, ext)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
  return `${base || 'image'}${ext}`
}

export async function POST(request: NextRequest) {
  const formData = await request.formData()
  const file = formData.get('file')

  if (!file || !(file instanceof File)) {
    return NextResponse.json({ message: 'No file provided' }, { status: 400 })
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ message: 'Unsupported file type' }, { status: 400 })
  }

  if (file.size > MAX_SIZE_BYTES) {
    return NextResponse.json({ message: 'File too large (max 10MB)' }, { status: 400 })
  }

  const uploadsDir = path.join(process.cwd(), 'public', 'assets', 'uploads')
  await fs.mkdir(uploadsDir, { recursive: true })

  const safeName = sanitizeFilename(file.name)
  const uniqueName = `${Date.now()}-${safeName}`
  const filePath = path.join(uploadsDir, uniqueName)

  const buffer = Buffer.from(await file.arrayBuffer())
  await fs.writeFile(filePath, buffer)

  const publicPath = `/assets/uploads/${uniqueName}`

  return NextResponse.json({ path: publicPath })
}