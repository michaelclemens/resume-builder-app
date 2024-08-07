import { useAppSelector } from "@/lib/redux/store";
import { SectionType } from "@/types/section";
import { getSection } from "@/util/section";

export default function<ItemType>(sectionType: SectionType, initialItem?: ItemType|null) {
    const { state } = getSection(sectionType);
    const item = useAppSelector(state.selectors.selectItem);
    return { item: item ?? initialItem ?? null }
}