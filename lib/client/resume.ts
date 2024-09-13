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

export async function updateResume(id: string, data: Prisma.ResumeUpdateInput, revalidate: boolean = false) {
  try {
    const resume = await prisma.resume.update({ where: { id }, data })
    if (revalidate) revalidatePath('/')
    return resume
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

export async function cloneResume(id: string) {
  try {
    const sourceResume = await getResumeFull(id)

    const { id: resumeId } = await prisma.resume.create({
      data: {
        title: 'Undefined',
        template: sourceResume.template,
        templateOptions: sourceResume.templateOptions ?? undefined,
      },
    })

    if (sourceResume.personal) {
      await prisma.personal.create({
        data: { ...sourceResume.personal, resumeId, id: undefined, createdAt: undefined, updatedAt: undefined },
      })
    }

    for (const education of sourceResume.educations) {
      await prisma.education.create({ data: { ...education, resumeId, id: undefined, createdAt: undefined, updatedAt: undefined } })
    }

    for (const employment of sourceResume.employments) {
      const { id: employmentId } = await prisma.employment.create({
        data: { ...employment, resumeId, id: undefined, createdAt: undefined, updatedAt: undefined, history: undefined },
      })

      for (const history of employment.history) {
        await prisma.employmentHistory.create({ data: { ...history, employmentId, id: undefined, createdAt: undefined, updatedAt: undefined } })
      }
    }

    for (const skill of sourceResume.skills) {
      await prisma.skill.create({ data: { ...skill, resumeId, id: undefined, createdAt: undefined, updatedAt: undefined } })
    }

    for (const strength of sourceResume.strengths) {
      await prisma.strength.create({ data: { ...strength, resumeId, id: undefined, createdAt: undefined, updatedAt: undefined } })
    }

    revalidatePath('/')
  } catch (error) {
    console.error(error)
  }
}
