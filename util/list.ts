import { ListItemEducation, ListItemEmployment, ListItemHistory, ListItemSkill, ListItemStrength } from "@/components";
import { ListSectionType, SectionEnums } from "@/types/section";

export function getSectionListItemComponent(sectionType: ListSectionType) {
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
            throw new Error(`Section type ${sectionType} has no implementation`);
    }
}