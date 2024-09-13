import { FunctionComponent } from 'react'
import { FieldValues, UseFormReturn } from 'react-hook-form'
import { SectionSchemaType } from './form'
import { ListItemType } from './section'

export type BodyComponentProps<TFormValues extends SectionSchemaType & FieldValues> = {
  form: UseFormReturn<TFormValues, unknown, undefined>
  editing: boolean
}

export type ItemComponentProps<ItemType extends ListItemType> = {
  item: ItemType
  remove: (item: ItemType) => Promise<void>
  setEditing: (editing: boolean) => void
  onSave: () => void
  editing: boolean
  deleting: boolean
}

export type BodyComponentType<SchemaValueType extends SectionSchemaType & FieldValues> = FunctionComponent<BodyComponentProps<SchemaValueType>>
