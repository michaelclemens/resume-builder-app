"use client"

import { useAppDispatch } from "@/lib/redux/store";
import { handleErrorResponse, ResponseStatus } from "@/lib/response";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { setEducation } from "@/lib/redux/reducers/education";
import { EducationSchema, EducationSchemaType } from "@/types/form";
import { addEducation, updateEducation } from "@/lib/client/education";
import { Education } from "@prisma/client";
import { getDefaultValuesEducation } from "@/util/form";

export default function(education?: Education) {
    const dispatch = useAppDispatch();
    const form = useForm<EducationSchemaType>({ 
        resolver: zodResolver(EducationSchema), 
        defaultValues: getDefaultValuesEducation(education)
    });

    const editing = !!education;
    
    const save = async(resumeId: string, formData: EducationSchemaType, onSave: () => void) => {
        const response = education?.id ? await updateEducation(education.id, resumeId, formData) : await addEducation(resumeId, formData);

        if (response.status === ResponseStatus.success) {
            dispatch(setEducation(response.payload.education));
        }
        if (response.status === ResponseStatus.error) {
            return handleErrorResponse(response, form.setError);
        }
        onSave()
        if (!editing) form.reset();
    }

    return { save, form, editing }
}