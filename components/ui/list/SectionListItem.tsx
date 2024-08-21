import { useSectionList } from "@/hooks";
import { getSectionListItemComponent } from "@/util/list";
import { ListItemType, ListSectionType } from "@/types/section";
import Loading from "@/components/ui/Loading";

export default function SectionListItem(
    { sectionType, item, parentId, parentProperty }:
    { sectionType: ListSectionType, item: ListItemType, parentId?: string, parentProperty?: string }
) {
    const { remove, setEditing, editing, deleting } = useSectionList(sectionType, { parentId, parentProperty });
    const ListItemComponent = getSectionListItemComponent(sectionType)
    return (
        <>
            <ListItemComponent
                // @ts-ignore
                item={item} 
                remove={remove} 
                setEditing={setEditing}
                onSave={() => setEditing(false)} 
                editing={editing} 
                deleting={deleting}
            />
            {deleting && <Loading />}
        </>
    )
}