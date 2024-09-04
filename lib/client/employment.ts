'use server'

import { EmploymentSchema, EmploymentSchemaType } from '@/types/form'
import { EmploymentWithHistory, SectionEnums } from '@/types/section'
import prisma from '@/lib/prisma'
import { response, ResponseStatus } from '../response'

const createDataPayload = (parentId: string, formData: EmploymentSchemaType) => {
  EmploymentSchema.parse(formData)
  return { resumeId: parentId, ...formData }
}

export async function getEmployments(resumeId: string) {
  try {
    return await prisma.employment.findMany({ where: { resumeId }, include: { history: true } })
  } catch (error) {
    console.error(error)
    return []
  }
}

export async function addEmployment(parentId: string, formData: EmploymentSchemaType) {
  try {
    const employment = await prisma.employment.create({ data: createDataPayload(parentId, formData) })
    return response(ResponseStatus.success, { payload: { [SectionEnums.employment]: employment } })
  } catch (error) {
    return response(ResponseStatus.error, { error })
  }
}

export async function updateEmployment(id: string, parentId: string, formData: EmploymentSchemaType) {
  try {
    const employment = await prisma.employment.update({ where: { id }, data: createDataPayload(parentId, formData) })
    return response(ResponseStatus.success, { payload: { [SectionEnums.employment]: employment } })
  } catch (error) {
    return response(ResponseStatus.error, { error })
  }
}

export async function setEmploymentSortOrders(items: EmploymentWithHistory[]) {
  try {
    for (const employment of items) {
      await prisma.employment.update({ where: { id: employment.id }, data: { order: employment.order } })
    }
  } catch (error) {
    console.error(error)
  }
}

export async function deleteEmployment(id: string) {
  try {
    return await prisma.employment.delete({ where: { id } })
  } catch (error) {
    console.error(error)
  }
}
