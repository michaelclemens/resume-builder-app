import { lazy } from 'react'
import { ListSectionType, SectionEnums } from '@/types/section'

const listItemComponentMap = {
  [SectionEnums.education]: lazy(() => import('@/components/education/ListItemEducation')),
  [SectionEnums.employment]: lazy(() => import('@/components/employment/ListItemEmployment')),
  [SectionEnums.employmentHistory]: lazy(() => import('@/components/employment/history/ListItemHistory')),
  [SectionEnums.skill]: lazy(() => import('@/components/skill/ListItemSkill')),
  [SectionEnums.strength]: lazy(() => import('@/components/strength/ListItemStrength')),
}

export const getSectionListItemComponent = (sectionType: ListSectionType) => listItemComponentMap[sectionType]
