import { FunctionComponent } from "react"
import { UseFormReturn } from "react-hook-form"
import { ListItemType } from "./section"
import { SectionSchemaValueType } from "./form"

export type BodyComponentProps = {
    form: UseFormReturn<SectionSchemaValueType, any, undefined>
    editing: boolean
}

export type ItemComponentProps<ItemType extends ListItemType> = {
    item: ItemType
    remove: (item: ListItemType) => Promise<void>
    setEditing: (editing: boolean) => void
    onSave: () => void
    editing: boolean
    deleting: boolean
}

export type BodyComponentType = FunctionComponent<BodyComponentProps>