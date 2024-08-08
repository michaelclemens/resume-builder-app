import { Education, Employment, EmploymentHistory, Skill, Strength } from "@prisma/client";

export enum SectionEnums {
    personal = 'personal',
    education = 'education',
    employment = 'employment',
    employmentHistory = 'employmentHistory',
    skill = 'skill',
    strength = 'strength',
}
export type SectionType = keyof typeof SectionEnums;

export type ListSectionType = SectionEnums.education | SectionEnums.employment | SectionEnums.employmentHistory | SectionEnums.skill | SectionEnums.strength;

export type ListItemTypes = Education | Employment | EmploymentHistory | Skill | Strength;