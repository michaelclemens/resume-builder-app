"use client"

import { useAppDispatch } from "@/lib/redux/store";
import { handleErrorResponse, ResponseStatus } from "@/lib/response";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EducationSchema, EducationSchemaType } from "@/types/form";
import { addEducation, updateEducation } from "@/lib/client/education";
import { Education } from "@prisma/client";
import { getDefaultValuesEducation } from "@/util/form";
import { getSection, SectionEnums } from "@/lib/redux/reducers/sections";

export default function(education?: Education) {
    const { actions } = getSection(SectionEnums.education);
    const dispatch = useAppDispatch();
    const form = useForm<EducationSchemaType>({ 
        resolver: zodResolver(EducationSchema), 
        defaultValues: getDefaultValuesEducation(education)
    });

    const editing = !!education;
    
    const save = async(resumeId: string, formData: EducationSchemaType, onSave: () => void) => {
        const response = education?.id ? await updateEducation(education.id, resumeId, formData) : await addEducation(resumeId, formData);

        if (response.status === ResponseStatus.success) {
            dispatch(actions.setItem(response.payload.education));
        }
        if (response.status === ResponseStatus.error) {
            return handleErrorResponse(response, form.setError);
        }
        onSave()
        if (!editing) form.reset();
    }

    return { save, form, editing }
}