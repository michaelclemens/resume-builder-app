import { ListItemEducation, ListItemEmployment, ListItemHistory, ListItemSkill, ListItemStrength } from "@/components";
import { ItemComponentType } from "@/types/hook";
import { SectionEnums, SectionType } from "@/types/section";

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