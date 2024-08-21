'use server'

import { StrengthSchema, StrengthSchemaType } from '@/types/form'
import prisma from '@/lib/prisma'
import { Strength } from '@prisma/client'
import { response, ResponseStatus } from '../response'
import { SectionEnums } from '@/types/section'

const createDataPayload = (parentId: string, formData: StrengthSchemaType) => {
  StrengthSchema.parse(formData)
  return { resumeId: parentId, ...formData }
}

export async function getStrengths(resumeId: string) {
  try {
    return await prisma.strength.findMany({ where: { resumeId } })
  } catch (error) {
    console.error(error)
    return []
  }
}

export async function addStrength(parentId: string, formData: StrengthSchemaType) {
  try {
    const strength = await prisma.strength.create({ data: createDataPayload(parentId, formData) })
    return response(ResponseStatus.success, { payload: { [SectionEnums.strength]: strength } })
  } catch (error) {
    return response(ResponseStatus.error, { error })
  }
}

export async function updateStrength(id: string, parentId: string, formData: StrengthSchemaType) {
  try {
    const strength = await prisma.strength.update({ where: { id }, data: createDataPayload(parentId, formData) })
    return response(ResponseStatus.success, { payload: { [SectionEnums.strength]: strength } })
  } catch (error) {
    return response(ResponseStatus.error, { error })
  }
}

export async function setStrengthSortOrders(items: Strength[]) {
  try {
    for (const strength of items) {
      await prisma.strength.update({ where: { id: strength.id }, data: { order: strength.order } })
    }
  } catch (error) {
    console.error(error)
  }
}

export async function deleteStrength(id: string) {
  try {
    return await prisma.strength.delete({ where: { id } })
  } catch (error) {
    console.error(error)
  }
}
