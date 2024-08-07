import { FormBodyEducation, FormBodyEmployment, FormBodyHistory, FormBodyPersonal, FormBodySkill, FormBodyStrength, ListItemEducation, ListItemEmployment, ListItemHistory, ListItemSkill, ListItemStrength } from "../components";
import { getClientSection } from "../lib/client/section";
import { getStateSection } from "../lib/redux/reducers/section";
import { BodyComponentType, ItemComponentType } from "@/types/hook";
import { FieldValues } from "react-hook-form";
import { SectionEnums, SectionType } from "@/types/section";

export function getSectionFormBodyComponent<SchemaType extends FieldValues>(sectionType: SectionType): BodyComponentType<SchemaType> {
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

export function getSectionListItemComponent<ItemType>(sectionType: SectionType): ItemComponentType<ItemType> {
    switch(sectionType) {
        case SectionEnums.education:
            return ListItemEducation;
        case SectionEnums.employment:
            return ListItemEmployment;
        case SectionEnums.employmentHistory:
            return ListItemHistory;
        case SectionEnums.skill:
            return ListItemSkill;
        case SectionEnums.strength:
            return ListItemStrength;
        default:
            return () => null;
    }
}

export function getSection(sectionType: SectionType) {
    return { state: getStateSection(sectionType), client: getClientSection(sectionType)}
}
