import { ListItemComponentProps } from "@/types/hook";

export default function<ItemType>({ item, useListHook, itemComponent: ItemComponent, parentId }: ListItemComponentProps<ItemType>) {
    const { remove, setEditing, editing, deleting } = useListHook({ parentId });
    return (
        <ItemComponent 
            item={item} 
            remove={remove} 
            setEditing={setEditing}
            onSave={() => setEditing(false)} 
            editing={editing} 
            deleting={deleting}
        />
    )
}