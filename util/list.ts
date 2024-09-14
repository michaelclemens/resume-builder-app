import dynamic from 'next/dynamic'
import { ListSectionType, SectionEnums } from '@/types/section'

const listItemComponentMap = {
  [SectionEnums.education]: dynamic(() => import('@/components/education/ListItemEducation')),
  [SectionEnums.employment]: dynamic(() => import('@/components/employment/ListItemEmployment')),
  [SectionEnums.employmentHistory]: dynamic(() => import('@/components/employment/history/ListItemHistory')),
  [SectionEnums.skill]: dynamic(() => import('@/components/skill/ListItemSkill')),
  [SectionEnums.strength]: dynamic(() => import('@/components/strength/ListItemStrength')),
}

export const getSectionListItemComponent = (sectionType: ListSectionType) => listItemComponentMap[sectionType]
