"use client"

import { addEmployment, updateEmployment } from "@/lib/client/employment";
import { setEmployment } from "@/lib/redux/reducers/employment";
import { useAppDispatch } from "@/lib/redux/store";
import { handleErrorResponse, ResponseStatus } from "@/lib/response";
import { EmploymentSchema, EmploymentSchemaType } from "@/types/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Employment } from "@prisma/client";
import { useForm } from "react-hook-form";

export default function(employment?: Employment) {
    const dispatch = useAppDispatch();
    const form = useForm<EmploymentSchemaType>({ resolver: zodResolver(EmploymentSchema), defaultValues: {
        employer: employment?.employer ?? '',
        city: employment?.city ?? '',
    }});

    const editing = !!employment;
    
    const save = async(resumeId: string, formData: EmploymentSchemaType, onSave: () => void) => {
        const response = employment?.id ? await updateEmployment(employment.id, resumeId, formData) : await addEmployment(resumeId, formData);

        if (response.status === ResponseStatus.success) {
            dispatch(setEmployment(response.payload.employment));
        }
        if (response.status === ResponseStatus.error) {
            return handleErrorResponse(response, form.setError);
        }
        onSave()
        if (!editing) form.reset();
    }

    return { employment, save, form, editing }
}