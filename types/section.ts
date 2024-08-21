import { Education, Employment, EmploymentHistory, Personal, Prisma, Skill, Strength } from "@prisma/client";

export type EmploymentWithHistory = Prisma.EmploymentGetPayload<{
    include: { history?: true }
}>

export enum SectionEnums {
    personal = 'personal',
    education = 'education',
    employment = 'employment',
    employmentHistory = 'employmentHistory',
    skill = 'skill',
    strength = 'strength',
}
enum ListSectionEnums {
    education = SectionEnums.education,
    employment = SectionEnums.employment,
    employmentHistory = SectionEnums.employmentHistory,
    skill = SectionEnums.skill,
    strength = SectionEnums.strength
}
enum SingleItemSectionEnums {
    personal = SectionEnums.personal,
}

export type SingleItemSectionType = keyof typeof SingleItemSectionEnums;
export type ListSectionType = keyof typeof ListSectionEnums;
export type SectionType = SingleItemSectionType | ListSectionType;

export type SingleItemType = Personal;
export type ListItemType = Education | Employment | EmploymentWithHistory | EmploymentHistory | Skill | Strength;
export type SectionItemType = SingleItemType | ListItemType;