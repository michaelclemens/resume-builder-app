"use client"

import { useSectionForm } from "@/hooks";
import { SectionType } from "@/types/section";
import { getSectionFormBodyComponent } from "@/util/section";
import { FieldValues } from "react-hook-form";

export default function SectionForm<ItemType, SchemaType extends FieldValues>(
    { sectionType, parentId, item, onSave = () => {} }: 
    { sectionType: SectionType, parentId: string, item?: ItemType, onSave?: () => void }
) {
    const { save, form, editing } = useSectionForm<SchemaType, ItemType>(sectionType, item);
    const FormBodyComponent = getSectionFormBodyComponent<SchemaType>(sectionType);
    return (
        <div className="my-3 mx-1 bg-gray-50 p-3 rounded-lg ring-1 ring-slate-700/10">
            <form role="form" onSubmit={form.handleSubmit(async(formData) => save(parentId, formData, onSave))}>
                <FormBodyComponent form={form} editing={editing} />
            </form>
        </div>
    );
}