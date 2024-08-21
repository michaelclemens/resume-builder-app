'use server'

import { generatePDF } from '@/lib/puppeteer'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest, { params: { id } }: { params: { id: string } }) {
  const searchParams = request.nextUrl.searchParams
  const filename = searchParams.get('filename') ?? 'My Resume'
  const pdf = await generatePDF(id)
  return new Response(pdf, {
    status: 200,
    headers: { 'Content-Type': 'application/pdf', 'Content-Disposition': `attachment; filename=${filename}.pdf` },
  })
}
