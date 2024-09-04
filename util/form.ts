import { Education, Employment, EmploymentHistory, Personal, Skill, Strength } from '@prisma/client'
import { EducationSchema, EmploymentHistorySchema, EmploymentSchema, PersonalSchema, SkillSchema, StrengthSchema } from '@/types/form'
import { SectionEnums, SectionItemType, SectionType } from '@/types/section'
import { FormBodyEducation, FormBodyEmployment, FormBodyHistory, FormBodyPersonal, FormBodySkill, FormBodyStrength } from '../components'
import { getInputDate } from './date'

export const richTextEditorClassName = 'rte-editor'

const getDefaultValuesPersonal = (personal?: Personal) => ({
  firstName: personal?.firstName ?? '',
  lastName: personal?.lastName ?? '',
  position: personal?.position ?? undefined,
  summary: personal?.summary ?? undefined,
  email: personal?.email ?? undefined,
  phone: personal?.phone ?? undefined,
  city: personal?.city ?? undefined,
  country: personal?.country ?? undefined,
})

const getDefaultValuesEmployment = (employment?: Employment) => ({
  employer: employment?.employer ?? '',
  city: employment?.city ?? undefined,
})

const getDefaultValuesEmploymentHistory = (history?: EmploymentHistory) => ({
  title: history?.title ?? '',
  startDate: getInputDate(history?.startDate) ?? '',
  endDate: history?.endDate ? getInputDate(history?.endDate) : undefined,
  description: history?.description ?? undefined,
})

const getDefaultValuesEducation = (education?: Education) => ({
  school: education?.school ?? '',
  degree: education?.degree ?? '',
  startDate: getInputDate(education?.startDate) ?? '',
  endDate: education?.endDate ? getInputDate(education?.endDate) : undefined,
  city: education?.city ?? undefined,
  description: education?.description ?? undefined,
})

const getDefaultValuesSkill = (skill?: Skill) => ({ name: skill?.name ?? '' })

const getDefaultValuesStrength = (strength?: Strength) => ({
  name: strength?.name ?? '',
})

export function getDefaultValues(sectionType: SectionType, item?: SectionItemType) {
  switch (sectionType) {
    case SectionEnums.personal:
      return getDefaultValuesPersonal(item as Personal)
    case SectionEnums.education:
      return getDefaultValuesEducation(item as Education)
    case SectionEnums.employment:
      return getDefaultValuesEmployment(item as Employment)
    case SectionEnums.employmentHistory:
      return getDefaultValuesEmploymentHistory(item as EmploymentHistory)
    case SectionEnums.skill:
      return getDefaultValuesSkill(item as Skill)
    case SectionEnums.strength:
      return getDefaultValuesStrength(item as Strength)
    default:
      throw new Error(`Section ${sectionType} is not implemented`)
  }
}

export function getSchema(sectionType: SectionType) {
  switch (sectionType) {
    case SectionEnums.personal:
      return PersonalSchema
    case SectionEnums.education:
      return EducationSchema
    case SectionEnums.employment:
      return EmploymentSchema
    case SectionEnums.employmentHistory:
      return EmploymentHistorySchema
    case SectionEnums.skill:
      return SkillSchema
    case SectionEnums.strength:
      return StrengthSchema
    default:
      throw new Error(`Section ${sectionType} is not implemented`)
  }
}

export function getSectionFormBodyComponent(sectionType: SectionType) {
  switch (sectionType) {
    case SectionEnums.personal:
      return FormBodyPersonal
    case SectionEnums.education:
      return FormBodyEducation
    case SectionEnums.employment:
      return FormBodyEmployment
    case SectionEnums.employmentHistory:
      return FormBodyHistory
    case SectionEnums.skill:
      return FormBodySkill
    case SectionEnums.strength:
      return FormBodyStrength
    default:
      throw new Error(`Section ${sectionType} is not implemented`)
  }
}
