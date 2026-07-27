import { NextResponse } from 'next/server'
import { readContent } from '@/lib/content-store'

export const dynamic = 'force-dynamic'

export async function GET() {
  const data = await readContent()
  return NextResponse.json(data)
}