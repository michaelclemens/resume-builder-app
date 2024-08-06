"use client"

import { StrengthSchema, StrengthSchemaType } from "@/types/form";
import { addStrength, updateStrength } from "@/lib/client/strength";
import { useAppDispatch } from "@/lib/redux/store";
import { handleErrorResponse, ResponseStatus } from "@/lib/response";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Strength } from "@prisma/client";
import { getDefaultValuesStrength } from "@/util/form";
import { getSection, SectionEnums } from "@/lib/redux/reducers/sections";

export default function(strength?: Strength) {
    const { actions } = getSection(SectionEnums.strength);
    const dispatch = useAppDispatch();
    const form = useForm<StrengthSchemaType>({ 
        resolver: zodResolver(StrengthSchema), 
        defaultValues: getDefaultValuesStrength(strength)
    });
    
    const editing = !!strength;

    const save = async(resumeId: string, formData: StrengthSchemaType, onSave: () => void) => {
        const response = strength?.id ? await updateStrength(strength.id, resumeId, formData) : await addStrength(resumeId, formData);

        if (response.status === ResponseStatus.success) {
            dispatch(actions.setItem(response.payload.strength));
        }
        if (response.status === ResponseStatus.error) {
            return handleErrorResponse(response, form.setError);
        }
        onSave()
        if (!editing) form.reset();
    }

    return { save, form, editing }
}