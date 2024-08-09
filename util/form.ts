import { Education, Employment, EmploymentHistory, Personal, Skill, Strength } from "@prisma/client";
import { getDisplayDateFromDate } from "./date";
import { SectionEnums, SectionItemType, SectionType } from "@/types/section";
import { EducationSchema, EmploymentHistorySchema, EmploymentSchema, PersonalSchema, SectionSchemaType, SkillSchema, StrengthSchema } from "@/types/form";
import { FormBodyEducation, FormBodyEmployment, FormBodyHistory, FormBodyPersonal, FormBodySkill, FormBodyStrength } from "../components";
import { BodyComponentType } from "@/types/hook";

export const richTextEditorClassName = 'rte-editor';

const getDefaultValuesPersonal = (personal?: Personal) => ({
    firstName: personal?.firstName ?? '',
    lastName: personal?.lastName ?? '',
    position: personal?.position ?? '',
    summary: personal?.summary ?? '',
    email: personal?.email ?? '',
    phone: personal?.phone ?? '',
    city: personal?.city ?? '',
    country: personal?.country ?? ''
})

const getDefaultValuesEmployment = (employment?: Employment) => ({
    employer: employment?.employer ?? '',
    city: employment?.city ?? '',
})

const getDefaultValuesEmploymentHistory = (history?: EmploymentHistory) => ({
    title: history?.title ?? '',
    startDate: getDisplayDateFromDate(history?.startDate) ?? '',
    endDate: history?.endDate ? getDisplayDateFromDate(history?.endDate) : '',
    description: history?.description ?? '',
})

const getDefaultValuesEducation = (education?: Education) => ({
    school: education?.school ?? '',
    degree: education?.degree ?? '',
    startDate: getDisplayDateFromDate(education?.startDate) ?? '',
    endDate: education?.endDate ? getDisplayDateFromDate(education?.endDate) : '',
    city: education?.city ?? '',
    description: education?.description ?? '',
})

const getDefaultValuesSkill = (skill?: Skill) => ({ name: skill?.name ?? '' })

const getDefaultValuesStrength = (strength?: Strength) => ({ name: strength?.name ?? '' })

export function getDefaultValues(sectionType: SectionType, item?: SectionItemType) {
    switch (sectionType) {
        case SectionEnums.personal:
            return getDefaultValuesPersonal(item as Personal);
        case SectionEnums.education:
            return getDefaultValuesEducation(item as Education);
        case SectionEnums.employment:
            return getDefaultValuesEmployment(item as Employment);
        case SectionEnums.employmentHistory:
            return getDefaultValuesEmploymentHistory(item as EmploymentHistory);
        case SectionEnums.skill:
            return getDefaultValuesSkill(item as Skill);
        case SectionEnums.strength:
            return getDefaultValuesStrength(item as Strength);
    }
}

export function getSchema(sectionType: SectionType): SectionSchemaType {
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
            throw new Error(`Section ${sectionType} is not implemented`)
    }
}

export function getSectionFormBodyComponent(sectionType: SectionType): BodyComponentType {
    switch(sectionType) {
        case SectionEnums.personal:
            return FormBodyPersonal;
        case SectionEnums.education:
            return FormBodyEducation;
        case SectionEnums.employment:
            return FormBodyEmployment;
        case SectionEnums.employmentHistory:
            return FormBodyHistory;
        case SectionEnums.skill:
            return FormBodySkill;
        case SectionEnums.strength:
            return FormBodyStrength;
        default:
            return () => null;
    }
}