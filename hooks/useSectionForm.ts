"use client"

import { useAppDispatch } from "@/lib/redux/store";
import { handleErrorResponse, ResponseStatus } from "@/lib/response";
import { getSection } from "@/util/section";
import { SectionType } from "@/types/section";
import { getDefaultValues, getSchema } from "@/util/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";

export default function<SchemaType extends FieldValues, ItemType>(
    sectionType: SectionType, 
    item?: ItemType
) {
    const { state, client } = getSection(sectionType);
    const dispatch = useAppDispatch();
    const form = useForm<SchemaType>({ 
        resolver: zodResolver(getSchema(sectionType)), 
        defaultValues: getDefaultValues<ItemType>(sectionType, item)
    })

    const editing = !!item;
    
    const save = async(parentId: string, formData: SchemaType, onSave: () => void) => {
        const response = editing ? await client.actions.updateItem(item.id, parentId, formData) : await client.actions.addItem(parentId, formData);

        console.log(response);

        if (response.status === ResponseStatus.success) {
            const item = response.payload[sectionType];
            dispatch(editing ? state.actions.updateItem(item) : state.actions.addItem(item));
        }
        if (response.status === ResponseStatus.error) {
            return handleErrorResponse(response, form.setError);
        }
        onSave()
        if (!editing) form.reset();
    }

    return { save, form, editing }
}