import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {
  readContent,
  addCategory,
  updateCategory,
  deleteCategory,
  addImage,
  updateImage,
  deleteImage,
  type Section,
} from '@/lib/content-store'

const VALID_SECTIONS: Section[] = ['beauty', 'bharathanatyam', 'tailoring']

function isValidSection(section: unknown): section is Section {
  return typeof section === 'string' && VALID_SECTIONS.includes(section as Section)
}

export async function GET() {
  const data = await readContent()
  return NextResponse.json(data)
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { action, section, categoryId, imageId, payload } = body

  if (!isValidSection(section)) {
    return NextResponse.json({ message: 'Invalid section' }, { status: 400 })
  }

  try {
    let data
    switch (action) {
      case 'addCategory':
        data = await addCategory(section, payload)
        break
      case 'updateCategory':
        data = await updateCategory(section, categoryId, payload)
        break
      case 'deleteCategory':
        data = await deleteCategory(section, categoryId)
        break
      case 'addImage':
        data = await addImage(section, categoryId, payload)
        break
      case 'updateImage':
        data = await updateImage(section, categoryId, imageId, payload)
        break
      case 'deleteImage':
        data = await deleteImage(section, categoryId, imageId)
        break
      default:
        return NextResponse.json({ message: 'Unknown action' }, { status: 400 })
    }
    return NextResponse.json(data)
  } catch (err) {
    console.error(err)
    return NextResponse.json({ message: 'Server error' }, { status: 500 })
  }
}
