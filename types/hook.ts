import { FunctionComponent } from "react"
import { FieldValues, UseFormReturn } from "react-hook-form"

export type SortableItemType = {
    id: string,
    order: number | null
}

export type UseFormHookType<ItemType, SchemaType extends FieldValues> = (item?: ItemType) => {
    save: (resumeId: string, formData: SchemaType, onSave: () => void) => Promise<void>
    form: UseFormReturn<SchemaType>
    editing: boolean
}

export type UseListHookType<ItemType> = ({ initialItems, parentId }: { initialItems?: ItemType[], parentId?: string }) => {
    items: ItemType[]|null
    saveSortOrder: (items: ItemType[]) => Promise<void>
}

export type BodyComponentProps<SchemaType extends FieldValues> = {
    form: UseFormReturn<SchemaType>
    editing: boolean
}

export type BodyComponentType<SchemaType extends FieldValues> = FunctionComponent<BodyComponentProps<SchemaType>>

export type ItemComponentType<ItemType> = FunctionComponent<ItemType>