"use client"

import { useAppDispatch } from "@/lib/redux/store";
import { handleErrorResponse, ResponseStatus } from "@/lib/response";
import { getSection } from "@/util/section";
import { getDefaultValues, getSchema } from "@/util/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DefaultValues, FieldValues, useForm } from "react-hook-form";
import { SectionItemType, SectionType } from "@/types/section";
import { SectionSchemaType } from "@/types/form";

export default function useSectionForm<TFormValues extends SectionSchemaType & FieldValues>(
    sectionType: SectionType, 
    item?: SectionItemType
) {
    const { state, client } = getSection(sectionType);
    const dispatch = useAppDispatch();
    const form = useForm<TFormValues>({ 
        resolver: zodResolver(getSchema(sectionType)), 
        defaultValues: getDefaultValues(sectionType, item) as DefaultValues<TFormValues>
    })
    
    const editing = !!item;

    const save = async(parentId: string, formData: SectionSchemaType, onSave: () => void) => {
        const response = editing ? await client.updateItem(item.id, parentId, formData) : await client.addItem(parentId, formData);

        if (response.status === ResponseStatus.success && response.payload) {
            const responseItem = response.payload[sectionType];
            if (responseItem) {
                dispatch(editing ? state.actions.updateItem(responseItem) : state.actions.addItem(responseItem));
            }
        }
        if (response.status === ResponseStatus.error) {
            return handleErrorResponse(response, form.setError);
        }
        onSave()
        if (!editing) form.reset();
    }

    return { save, form, editing }
}