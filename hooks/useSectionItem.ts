import { useAppSelector } from "@/lib/redux/store";
import { SingleItemSectionType, SingleItemType } from "@/types/section";
import { getSection } from "@/util/section";

export default function(sectionType: SingleItemSectionType, initialItem?: SingleItemType|null) {
    const { state } = getSection(sectionType);
    const item = useAppSelector(state.selectors.selectItem);
    return { item: item ?? initialItem ?? null }
}