import { Education, Employment, EmploymentHistory, Personal, Skill, Strength } from '@prisma/client'
import dynamic from 'next/dynamic'
import { EducationSchema, EmploymentHistorySchema, EmploymentSchema, PersonalSchema, SkillSchema, StrengthSchema } from '@/types/form'
import { SectionEnums, SectionItemType, SectionType } from '@/types/section'
import { getInputDate } from './date'

export const richTextEditorClassName = 'rte-editor'

const formComponentMap = {
  [SectionEnums.personal]: dynamic(() => import('@/components/personal/FormBodyPersonal')),
  [SectionEnums.education]: dynamic(() => import('@/components/education/FormBodyEducation')),
  [SectionEnums.employment]: dynamic(() => import('@/components/employment/FormBodyEmployment')),
  [SectionEnums.employmentHistory]: dynamic(() => import('@/components/employment/history/FormBodyHistory')),
  [SectionEnums.skill]: dynamic(() => import('@/components/skill/FormBodySkill')),
  [SectionEnums.strength]: dynamic(() => import('@/components/strength/FormBodyStrength')),
}

const schemaMap = {
  [SectionEnums.personal]: PersonalSchema,
  [SectionEnums.education]: EducationSchema,
  [SectionEnums.employment]: EmploymentSchema,
  [SectionEnums.employmentHistory]: EmploymentHistorySchema,
  [SectionEnums.skill]: SkillSchema,
  [SectionEnums.strength]: StrengthSchema,
}

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

const getDefaultValuesStrength = (strength?: Strength) => ({ name: strength?.name ?? '' })

const defaultValuesGetterMap = {
  [SectionEnums.personal]: getDefaultValuesPersonal,
  [SectionEnums.education]: getDefaultValuesEducation,
  [SectionEnums.employment]: getDefaultValuesEmployment,
  [SectionEnums.employmentHistory]: getDefaultValuesEmploymentHistory,
  [SectionEnums.skill]: getDefaultValuesSkill,
  [SectionEnums.strength]: getDefaultValuesStrength,
}

export const getDefaultValues = (sectionType: SectionType, item?: SectionItemType) => defaultValuesGetterMap[sectionType](item)
export const getSchema = (sectionType: SectionType) => schemaMap[sectionType]
export const getSectionFormBodyComponent = (sectionType: SectionType) => formComponentMap[sectionType]
