"use client"

import { addEmployment, updateEmployment } from "@/lib/client/employment";
import { getSection, SectionEnums } from "@/lib/redux/reducers/sections";
import { useAppDispatch } from "@/lib/redux/store";
import { handleErrorResponse, ResponseStatus } from "@/lib/response";
import { EmploymentSchema, EmploymentSchemaType } from "@/types/form";
import { getDefaultValuesEmployment } from "@/util/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Employment } from "@prisma/client";
import { useForm } from "react-hook-form";

export default function(employment?: Employment) {
    const { actions } = getSection(SectionEnums.employment);
    const dispatch = useAppDispatch();
    const form = useForm<EmploymentSchemaType>({ 
        resolver: zodResolver(EmploymentSchema), 
        defaultValues: getDefaultValuesEmployment(employment)
    });

    const editing = !!employment;
    
    const save = async(resumeId: string, formData: EmploymentSchemaType, onSave: () => void) => {
        const response = employment?.id ? await updateEmployment(employment.id, resumeId, formData) : await addEmployment(resumeId, formData);

        if (response.status === ResponseStatus.success) {
            dispatch(actions.setItem(response.payload.employment));
        }
        if (response.status === ResponseStatus.error) {
            return handleErrorResponse(response, form.setError);
        }
        onSave()
        if (!editing) form.reset();
    }

    return { save, form, editing }
}