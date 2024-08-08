import { useSectionList } from "@/hooks";
import { getSectionListItemComponent } from "@/util/list";
import { ListItemComponentProps } from "@/types/hook";

export default function<ItemType>({ sectionType, item, parentId }: ListItemComponentProps<ItemType>) {
    const { remove, setEditing, editing, deleting } = useSectionList(sectionType, { parentId });
    const ListItemComponent = getSectionListItemComponent<ItemType>(sectionType)
    return (
        <ListItemComponent 
            item={item} 
            remove={remove} 
            setEditing={setEditing}
            onSave={() => setEditing(false)} 
            editing={editing} 
            deleting={deleting}
        />
    )
}