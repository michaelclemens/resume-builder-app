export enum SectionEnums {
    personal = 'personal',
    education = 'education',
    employment = 'employment',
    employmentHistory = 'employmentHistory',
    skill = 'skill',
    strength = 'strength',
}
export type SectionType = keyof typeof SectionEnums;