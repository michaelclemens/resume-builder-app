"use client"

import { useSectionForm } from "@/hooks";
import { SectionItemType, SectionType } from "@/types/section";
import { getSectionFormBodyComponent } from "@/util/form";

export default function SectionForm(
    { sectionType, parentId, item, onSave = () => {} }: 
    { sectionType: SectionType, parentId: string, item?: SectionItemType, onSave?: () => void }
) {
    const { save, form, editing } = useSectionForm(sectionType, item);
    const FormBodyComponent = getSectionFormBodyComponent(sectionType);
    return (
        <div className="my-3 mx-1 bg-slate-50 p-3 rounded-lg ring-1 ring-slate-700/10 dark:bg-slate-800 dark:text-black dark:ring-slate-700">
            <form role="form" onSubmit={form.handleSubmit(async(formData) => save(parentId, formData, onSave))}>
                <FormBodyComponent form={form} editing={editing} />
            </form>
        </div>
    );
}