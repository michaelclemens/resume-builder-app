import { addPersonal, updatePersonal } from './personal'
import { addEducation, deleteEducation, setEducationSortOrders, updateEducation } from './education'
import { addEmployment, deleteEmployment, setEmploymentSortOrders, updateEmployment } from './employment'
import { addSkill, deleteSkill, setSkillSortOrders, updateSkill } from './skill'
import { addStrength, deleteStrength, setStrengthSortOrders, updateStrength } from './strength'
import { addEmploymentHistory, deleteEmploymentHistory, setEmploymentHistorySortOrders, updateEmploymentHistory } from './employmentHistory'
import { EmploymentWithHistory, SectionItemType, SectionType } from '@/types/section'
import {
  EducationSchemaType,
  EmploymentHistorySchemaType,
  EmploymentSchemaType,
  PersonalSchemaType,
  SectionSchemaType,
  SkillSchemaType,
  StrengthSchemaType,
} from '@/types/form'
import { Education, EmploymentHistory, Skill, Strength } from '@prisma/client'

const personalActions = {
  addItem: async (parentId: string, formData: SectionSchemaType) => addPersonal(parentId, formData as PersonalSchemaType),
  updateItem: async (id: string, parentId: string, formData: SectionSchemaType) => updatePersonal(id, parentId, formData as PersonalSchemaType),
}

const educationActions = {
  addItem: async (parentId: string, formData: SectionSchemaType) => addEducation(parentId, formData as EducationSchemaType),
  updateItem: async (id: string, parentId: string, formData: SectionSchemaType) => updateEducation(id, parentId, formData as EducationSchemaType),
  deleteItem: deleteEducation,
  setSortOrders: async (items: SectionItemType[]) => setEducationSortOrders(items as Education[]),
}

const employmentActions = {
  addItem: async (parentId: string, formData: SectionSchemaType) => addEmployment(parentId, formData as EmploymentSchemaType),
  updateItem: async (id: string, parentId: string, formData: SectionSchemaType) => updateEmployment(id, parentId, formData as EmploymentSchemaType),
  deleteItem: deleteEmployment,
  setSortOrders: async (items: SectionItemType[]) => setEmploymentSortOrders(items as EmploymentWithHistory[]),
}

const employmentHistoryActions = {
  addItem: async (parentId: string, formData: SectionSchemaType) => addEmploymentHistory(parentId, formData as EmploymentHistorySchemaType),
  updateItem: async (id: string, parentId: string, formData: SectionSchemaType) =>
    updateEmploymentHistory(id, parentId, formData as EmploymentHistorySchemaType),
  deleteItem: deleteEmploymentHistory,
  setSortOrders: async (items: SectionItemType[]) => setEmploymentHistorySortOrders(items as EmploymentHistory[]),
}

const skillActions = {
  addItem: async (parentId: string, formData: SectionSchemaType) => addSkill(parentId, formData as SkillSchemaType),
  updateItem: async (id: string, parentId: string, formData: SectionSchemaType) => updateSkill(id, parentId, formData as SkillSchemaType),
  deleteItem: deleteSkill,
  setSortOrders: async (items: SectionItemType[]) => setSkillSortOrders(items as Skill[]),
}

const strengthActions = {
  addItem: async (parentId: string, formData: SectionSchemaType) => addStrength(parentId, formData as StrengthSchemaType),
  updateItem: async (id: string, parentId: string, formData: SectionSchemaType) => updateStrength(id, parentId, formData as StrengthSchemaType),
  deleteItem: deleteStrength,
  setSortOrders: async (items: SectionItemType[]) => setStrengthSortOrders(items as Strength[]),
}

const allActions = {
  personal: personalActions,
  education: educationActions,
  employment: employmentActions,
  employmentHistory: employmentHistoryActions,
  skill: skillActions,
  strength: strengthActions,
}

export const getClientSection = <Name extends SectionType>(sectionType: Name): (typeof allActions)[Name] => allActions[sectionType]
