"use client"

import { UseFormHookType, BodyComponentType } from "@/types/hook";
import { FieldValues } from "react-hook-form";

export default function Form<ItemType, SchemaType extends FieldValues>(
    { parentId, useFormHook, formBody: FormBodyComponent, item, onSave = () => {} }: 
    { parentId: string, useFormHook: UseFormHookType<ItemType, SchemaType>, formBody: BodyComponentType<SchemaType>, item?: ItemType, onSave?: () => void }
) {
    const { save, form, editing } = useFormHook(item);
    return (
        <div className="my-3 mx-1 bg-gray-50 p-3 rounded-lg ring-1 ring-slate-700/10">
            <form role="form" onSubmit={form.handleSubmit(async(formData) => save(parentId, formData, onSave))}>
                <FormBodyComponent form={form} editing={editing} />
            </form>
        </div>
    );
}