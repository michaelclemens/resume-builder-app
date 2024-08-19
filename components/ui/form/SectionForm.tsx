"use client"

import { useSectionForm } from "@/hooks";
import { SectionItemType, SectionType } from "@/types/section";
import { getSectionFormBodyComponent } from "@/util/form";
import Loading from "../Loading";

export default function SectionForm(
    { sectionType, parentId, item, onSave = () => {} }: 
    { sectionType: SectionType, parentId: string, item?: SectionItemType, onSave?: () => void }
) {
    const { save, form, editing } = useSectionForm(sectionType, item);
    const FormBodyComponent = getSectionFormBodyComponent(sectionType);

    return (
        <div className="relative mt-3 mb-1 mx-1 p-3 backdrop-blur-sm shadow-md rounded-lg ring-1 ring-slate-300/60 dark:ring-slate-400/20 dark:text-black ">
            <form role="form" onSubmit={form.handleSubmit(async(formData) => save(parentId, formData, onSave))}>
                <FormBodyComponent form={form} editing={editing} />
            </form>
            {form.formState.isLoading && <Loading/>}
        </div>
    )
}