'use server'

import { NextRequest } from 'next/server'
import { generatePDF } from '@/lib/puppeteer'

export async function GET(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params

  const { id } = params

  const searchParams = request.nextUrl.searchParams
  const filename = searchParams.get('filename') ?? 'My Resume'
  const pdf = await generatePDF(id)
  return new Response(pdf, {
    status: 200,
    headers: { 'Content-Type': 'application/pdf', 'Content-Disposition': `attachment; filename=${filename}.pdf` },
  })
}
