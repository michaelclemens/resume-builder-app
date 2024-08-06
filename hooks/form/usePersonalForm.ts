"use client"

import { addPersonal, updatePersonal } from "@/lib/client/personal";
import { getSection, SectionEnums } from "@/lib/redux/reducers/sections";
import { useAppDispatch } from "@/lib/redux/store";
import { handleErrorResponse, ResponseStatus } from "@/lib/response";
import { PersonalSchema, PersonalSchemaType } from "@/types/form";
import { getDefaultValuesPersonal } from "@/util/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Personal } from "@prisma/client";
import { useForm } from "react-hook-form";

export default function(personal?: Personal) {
    const { actions } = getSection(SectionEnums.personal);
    const dispatch = useAppDispatch();
    const form = useForm<PersonalSchemaType>({ 
        resolver: zodResolver(PersonalSchema), 
        defaultValues: getDefaultValuesPersonal(personal)
    })

    const editing = !!personal;
    
    const save = async(resumeId: string, formData: PersonalSchemaType, onSave: () => void) => {
        const response = personal?.id ? await updatePersonal(personal.id, resumeId, formData) : await addPersonal(resumeId, formData);

        if (response.status === ResponseStatus.success) {
            dispatch(actions.setItem(response.payload.personal));
        }
        if (response.status === ResponseStatus.error) {
            return handleErrorResponse(response, form.setError);
        }
        onSave()
        if (!editing) form.reset();
    }

    return { save, form, editing }
}