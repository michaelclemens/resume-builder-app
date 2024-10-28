import { Education, EmploymentHistory, Personal, Prisma, Skill, Strength } from '@prisma/client'

export type EmploymentWithHistory = Prisma.EmploymentGetPayload<{ include: { history: true } }>

export enum SectionEnums {
  personal = 'personal',
  education = 'education',
  employment = 'employment',
  employmentHistory = 'employmentHistory',
  skill = 'skill',
  strength = 'strength',
}
export type ListSectionType = {
  education: SectionEnums.education
  employment: SectionEnums.employment
  employmentHistory: SectionEnums.employmentHistory
  skill: SectionEnums.skill
  strength: SectionEnums.strength
}
export type SingleItemSectionType = {
  personal: SectionEnums.personal
}
export type SectionType = SingleItemSectionType | ListSectionType
export type SingleItemType = Personal
export type ListItemType = Education | EmploymentHistory | Skill | Strength | EmploymentWithHistory
export type SectionItemType = SingleItemType | ListItemType
