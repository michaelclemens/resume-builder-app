import { Education, Employment, EmploymentHistory, Personal, Skill, Strength } from "@prisma/client";
import { getDisplayDateFromDate } from "./date";
import { SectionEnums, SectionType } from "@/types/section";
import { EducationSchema, EmploymentHistorySchema, EmploymentSchema, PersonalSchema, SkillSchema, StrengthSchema } from "@/types/form";

export const richTextEditorClassName = 'rte-editor';

export const getDefaultValuesPersonal = (personal?: Personal) => ({
    firstName: personal?.firstName ?? '',
    lastName: personal?.lastName ?? '',
    position: personal?.position ?? '',
    summary: personal?.summary ?? '',
    email: personal?.email ?? '',
    phone: personal?.phone ?? '',
    city: personal?.city ?? '',
    country: personal?.country ?? ''
})

export const getDefaultValuesEmployment = (employment?: Employment) => ({
    employer: employment?.employer ?? '',
    city: employment?.city ?? '',
})

export const getDefaultValuesEmploymentHistory = (history?: EmploymentHistory) => ({
    title: history?.title ?? '',
    startDate: getDisplayDateFromDate(history?.startDate) ?? '',
    endDate: history?.endDate ? getDisplayDateFromDate(history?.endDate) : '',
    description: history?.description ?? '',
})

export const getDefaultValuesEducation = (education?: Education) => ({
    school: education?.school ?? '',
    degree: education?.degree ?? '',
    startDate: getDisplayDateFromDate(education?.startDate) ?? '',
    endDate: education?.endDate ? getDisplayDateFromDate(education?.endDate) : '',
    city: education?.city ?? '',
    description: education?.description ?? '',
})

export const getDefaultValuesSkill = (skill?: Skill) => ({ name: skill?.name ?? '' })

export const getDefaultValuesStrength = (strength?: Strength) => ({ name: strength?.name ?? '' })

export function getDefaultValues<ItemType>(sectionType: SectionType, item?: ItemType) {
    switch (sectionType) {
        case SectionEnums.personal:
            return getDefaultValuesPersonal(item);
        case SectionEnums.education:
            return getDefaultValuesEducation(item);
        case SectionEnums.employment:
            return getDefaultValuesEmployment(item);
        case SectionEnums.employmentHistory:
            return getDefaultValuesEmploymentHistory(item);
        case SectionEnums.skill:
            return getDefaultValuesSkill(item);
        case SectionEnums.strength:
            return getDefaultValuesStrength(item);
    }
}

export function getSchema(sectionType: SectionType) {
    switch (sectionType) {
        case SectionEnums.personal:
            return PersonalSchema;
        case SectionEnums.education:
            return EducationSchema;
        case SectionEnums.employment:
            return EmploymentSchema;
        case SectionEnums.employmentHistory:
            return EmploymentHistorySchema;
        case SectionEnums.skill:
            return SkillSchema;
        case SectionEnums.strength:
            return StrengthSchema;
        default:
            return null
    }
}