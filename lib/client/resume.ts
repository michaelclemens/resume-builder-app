'use server'

import { EmploymentHistory, Prisma } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { notFound, redirect } from 'next/navigation'
import { TemplateOptions } from '@/types/template'
import prisma from '@/lib/prisma'
import { generateScreenshot } from '../puppeteer'

export type ResumeFull = Prisma.ResumeGetPayload<{
  include: {
    personal: true
    employments: { include: { history: true } }
    educations: true
    skills: true
    strengths: true
  }
}> & { templateOptions: TemplateOptions; histories?: EmploymentHistory[] }

export async function createResumeAction() {
  let resume = null
  try {
    resume = await prisma.resume.create({ data: {} })
  } catch (error) {
    console.error(error)
  }

  if (!resume?.id) {
    return
  }

  redirect(`/resume/${resume.id}`)
}

export async function editResumeTitleAction(id: string, formData: FormData) {
  try {
    await prisma.resume.update({ where: { id }, data: { title: formData.get('title') as string } })
    revalidatePath('/')
  } catch (error) {
    console.error(error)
  }
}

export async function getResume(id: string) {
  try {
    return await prisma.resume.findUniqueOrThrow({ where: { id } })
  } catch (error) {
    console.error(error)
    return notFound()
  }
}

export async function getResumeFull(id: string) {
  try {
    return await prisma.resume.findUniqueOrThrow({
      where: { id },
      include: {
        personal: true,
        employments: { include: { history: true } },
        educations: true,
        skills: true,
        strengths: true,
      },
    })
  } catch (error) {
    console.error(error)
    return notFound()
  }
}

export async function getAllResumes() {
  try {
    return await prisma.resume.findMany({ take: 10, orderBy: { createdAt: 'asc' } })
  } catch (error) {
    console.error(error)
    return []
  }
}

export async function updateResume(id: string, data: Prisma.ResumeUpdateInput) {
  try {
    return await prisma.resume.update({ where: { id }, data })
  } catch (error) {
    console.error(error)
    return null
  }
}

export async function deleteResume(id: string) {
  try {
    await prisma.resume.delete({ where: { id } })
    revalidatePath('/')
  } catch (error) {
    console.error(error)
  }
}

export async function generateResumePreview(id: string) {
  if (process.env.GENERATE_RESUME_SCREENSHOTS !== 'true') return
  try {
    await generateScreenshot(id, `previews/${id}`)
    revalidatePath(`/resume/${id}/`)
  } catch (error) {
    console.error(error)
  }
}
