'use server'

import { Education } from '@prisma/client'
import { sanitize } from 'isomorphic-dompurify'
import { EducationSchema, EducationSchemaType } from '@/types/form'
import { SectionEnums } from '@/types/section'
import prisma from '@/lib/prisma'
import { response, ResponseStatus } from '../response'

const createDataPayload = (parentId: string, formData: EducationSchemaType) => {
  EducationSchema.parse(formData)
  return {
    resumeId: parentId,
    ...formData,
    description: formData.description && sanitize(formData.description),
  }
}

export async function getEducations(resumeId: string) {
  try {
    return await prisma.education.findMany({ where: { resumeId } })
  } catch (error) {
    console.error(error)
    return []
  }
}

export async function addEducation(parentId: string, formData: EducationSchemaType) {
  try {
    const education = await prisma.education.create({ data: createDataPayload(parentId, formData) })
    return response(ResponseStatus.success, { payload: { [SectionEnums.education]: education } })
  } catch (error) {
    return response(ResponseStatus.error, { error })
  }
}

export async function updateEducation(id: string, parentId: string, formData: EducationSchemaType) {
  try {
    const education = await prisma.education.update({ where: { id }, data: createDataPayload(parentId, formData) })
    return response(ResponseStatus.success, { payload: { [SectionEnums.education]: education } })
  } catch (error) {
    return response(ResponseStatus.error, { error })
  }
}

export async function setEducationSortOrders(items: Education[]) {
  try {
    for (const education of items) {
      await prisma.education.update({ where: { id: education.id }, data: { order: education.order } })
    }
  } catch (error) {
    console.error(error)
  }
}

export async function deleteEducation(id: string) {
  try {
    return await prisma.education.delete({ where: { id } })
  } catch (error) {
    console.error(error)
  }
}
