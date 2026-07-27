import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { put } from '@vercel/blob'

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
const MAX_SIZE_BYTES = 10 * 1024 * 1024 // 10MB

function sanitizeFilename(name: string) {
  const dotIndex = name.lastIndexOf('.')
  const ext = dotIndex >= 0 ? name.slice(dotIndex).toLowerCase() : ''
  const base = (dotIndex >= 0 ? name.slice(0, dotIndex) : name)
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

  const safeName = sanitizeFilename(file.name)
  const uniqueName = `${Date.now()}-${safeName}`

  const blob = await put(`uploads/${uniqueName}`, file, {
    access: 'public',
  })

  return NextResponse.json({ path: blob.url })
}