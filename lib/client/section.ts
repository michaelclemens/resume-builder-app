import { addPersonal, updatePersonal } from './personal';
import { addEducation, deleteEducation, setEducationSortOrders, updateEducation } from './education';
import { addEmployment, deleteEmployment, setEmploymentSortOrders, updateEmployment } from './employment';
import { addSkill, deleteSkill, setSkillSortOrders, updateSkill } from './skill';
import { addStrength, deleteStrength, setStrengthSortOrders, updateStrength } from './strength';
import { addEmploymentHistory, deleteEmploymentHistory, setEmploymentHistorySortOrders, updateEmploymentHistory } from './employmentHistory';
import { SectionEnums, SectionType } from '@/types/section';

type SectionConfig = {
    name: SectionType
}

const sectionConfigs: SectionConfig[] = [
    { name: SectionEnums.personal },
    { name: SectionEnums.education },
    { name: SectionEnums.employment },
    { name: SectionEnums.employmentHistory },
    { name: SectionEnums.skill },
    { name: SectionEnums.strength },
];

const getActions = (sectionConfig: SectionConfig) => {
    switch (sectionConfig.name) {
        case SectionEnums.personal:
            return { 
                addItem: addPersonal, 
                updateItem: updatePersonal
            }
        case SectionEnums.education:
            return { 
                addItem: addEducation, 
                updateItem: updateEducation, 
                deleteItem: deleteEducation, 
                setSortOrders: setEducationSortOrders
            }
        case SectionEnums.employment:
            return { 
                addItem: addEmployment, 
                updateItem: updateEmployment, 
                deleteItem: deleteEmployment, 
                setSortOrders: setEmploymentSortOrders
            }
        case SectionEnums.employmentHistory:
            return { 
                addItem: addEmploymentHistory, 
                updateItem: updateEmploymentHistory, 
                deleteItem: deleteEmploymentHistory, 
                setSortOrders: setEmploymentHistorySortOrders
            }
        case SectionEnums.skill:
            return { 
                addItem: addSkill, 
                updateItem: updateSkill, 
                deleteItem: deleteSkill, 
                setSortOrders: setSkillSortOrders
            }
        case SectionEnums.strength:
            return { 
                addItem: addStrength, 
                updateItem: updateStrength, 
                deleteItem: deleteStrength, 
                setSortOrders: setStrengthSortOrders
            }
    }
}

let sections = {};
for (const sectionConfig of sectionConfigs) {
  sections = {...sections, [sectionConfig.name]: { actions: getActions(sectionConfig) }}
}

export function getClientSection(sectionType: SectionType) { return sections[sectionType] }