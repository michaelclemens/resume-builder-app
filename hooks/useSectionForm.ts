"use client"

import { useAppDispatch } from "@/lib/redux/store";
import { handleErrorResponse, ResponseStatus } from "@/lib/response";
import { getSection } from "@/util/section";
import { getDefaultValues, getSchema } from "@/util/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SectionItemType, SectionType } from "@/types/section";
import { SectionSchemaValueType } from "@/types/form";

export default function(
    sectionType: SectionType, 
    item?: SectionItemType
) {
    const { state, client } = getSection(sectionType);
    const dispatch = useAppDispatch();
    const form = useForm<SectionSchemaValueType>({ 
        resolver: zodResolver(getSchema(sectionType)), 
        defaultValues: getDefaultValues(sectionType, item)
    })
    
    const editing = !!item;

    const save = async(parentId: string, formData, onSave: () => void) => {
        const response = editing ? await client.updateItem(item.id, parentId, formData) : await client.addItem(parentId, formData);

        if (response.status === ResponseStatus.success && response.payload) {
            const responseItem = response.payload[sectionType];
            dispatch(editing ? state.actions.updateItem(responseItem) : state.actions.addItem(responseItem));
        }
        if (response.status === ResponseStatus.error) {
            return handleErrorResponse(response, form.setError);
        }
        onSave()
        if (!editing) form.reset();
    }

    return { save, form, editing }
}