import { addPersonal, updatePersonal } from './personal';
import { addEducation, deleteEducation, setEducationSortOrders, updateEducation } from './education';
import { addEmployment, deleteEmployment, setEmploymentSortOrders, updateEmployment } from './employment';
import { addSkill, deleteSkill, setSkillSortOrders, updateSkill } from './skill';
import { addStrength, deleteStrength, setStrengthSortOrders, updateStrength } from './strength';
import { addEmploymentHistory, deleteEmploymentHistory, setEmploymentHistorySortOrders, updateEmploymentHistory } from './employmentHistory';
import { SectionType } from '@/types/section';

const personalActions = ({
    addItem: addPersonal, 
    updateItem: updatePersonal,
})

const educationActions = ({
    addItem: addEducation, 
    updateItem: updateEducation, 
    deleteItem: deleteEducation, 
    setSortOrders: setEducationSortOrders
})

const employmentActions = ({
    addItem: addEmployment, 
    updateItem: updateEmployment, 
    deleteItem: deleteEmployment, 
    setSortOrders: setEmploymentSortOrders
})

const employmentHistoryActions = ({
    addItem: addEmploymentHistory, 
    updateItem: updateEmploymentHistory, 
    deleteItem: deleteEmploymentHistory, 
    setSortOrders: setEmploymentHistorySortOrders
})

const skillActions = ({
    addItem: addSkill, 
    updateItem: updateSkill, 
    deleteItem: deleteSkill, 
    setSortOrders: setSkillSortOrders
})

const strengthActions = ({
    addItem: addStrength, 
    updateItem: updateStrength, 
    deleteItem: deleteStrength, 
    setSortOrders: setStrengthSortOrders
})

const allActions = {
    personal: personalActions,
    education: educationActions,
    employment: employmentActions,
    employmentHistory: employmentHistoryActions,
    skill: skillActions,
    strength: strengthActions,
}

export const getClientSection =  <Name extends SectionType>(sectionType: Name): typeof allActions[Name] => allActions[sectionType];