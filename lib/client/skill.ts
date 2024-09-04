'use server'

import { Skill } from '@prisma/client'
import prisma from '@/lib/prisma'
import { SkillSchema, SkillSchemaType } from '@/types/form'
import { SectionEnums } from '@/types/section'
import { response, ResponseStatus } from '../response'

const createDataPayload = (parentId: string, formData: SkillSchemaType) => {
  SkillSchema.parse(formData)
  return { resumeId: parentId, ...formData }
}

export async function getSkills(resumeId: string) {
  try {
    return await prisma.skill.findMany({ where: { resumeId } })
  } catch (error) {
    console.error(error)
    return []
  }
}

export async function addSkill(parentId: string, formData: SkillSchemaType) {
  try {
    const skill = await prisma.skill.create({ data: createDataPayload(parentId, formData) })
    return response(ResponseStatus.success, { payload: { [SectionEnums.skill]: skill } })
  } catch (error) {
    return response(ResponseStatus.error, { error })
  }
}

export async function updateSkill(id: string, parentId: string, formData: SkillSchemaType) {
  try {
    const skill = await prisma.skill.update({ where: { id }, data: createDataPayload(parentId, formData) })
    return response(ResponseStatus.success, { payload: { [SectionEnums.skill]: skill } })
  } catch (error) {
    return response(ResponseStatus.error, { error })
  }
}

export async function setSkillSortOrders(items: Skill[]) {
  try {
    for (const skill of items) {
      await prisma.skill.update({ where: { id: skill.id }, data: { order: skill.order } })
    }
  } catch (error) {
    console.error(error)
  }
}

export async function deleteSkill(id: string) {
  try {
    return await prisma.skill.delete({ where: { id } })
  } catch (error) {
    console.error(error)
  }
}
