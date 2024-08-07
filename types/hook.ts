import { FunctionComponent } from "react"
import { FieldValues, UseFormReturn } from "react-hook-form"
import { SectionType } from "./section"

export type SortableItemType = {
    id: string,
    order: number | null
}

export type UseFormHookType<ItemType, SchemaType extends FieldValues> = (item?: ItemType) => {
    save: (resumeId: string, formData: SchemaType, onSave: () => void) => Promise<void>
    form: UseFormReturn<SchemaType>
    editing: boolean
}

export type UseListHookType<ItemType> = ({ initialItems, parentId }?: { initialItems?: ItemType[], parentId?: string }) => {
    items: ItemType[]|null
    saveSortOrder: (items: ItemType[]) => Promise<void>
    remove: (item: ItemType) => Promise<void>
    setEditing: (editing: boolean) => void
    editing: boolean
    deleting: boolean
}

export type BodyComponentProps<SchemaType extends FieldValues> = {
    form: UseFormReturn<SchemaType>
    editing: boolean
}

export type ListItemComponentProps<ItemType> = {
    sectionType: SectionType
    item: ItemType
    parentId?: string
}

export type ItemComponentProps<ItemType> = {
    item: ItemType
    remove: (item: ItemType) => Promise<void>
    setEditing: (editing: boolean) => void
    onSave: () => void
    editing: boolean
    deleting: boolean
}

export type BodyComponentType<SchemaType extends FieldValues> = FunctionComponent<BodyComponentProps<SchemaType>>
export type ItemComponentType<ItemType> = FunctionComponent<ItemComponentProps<ItemType>>