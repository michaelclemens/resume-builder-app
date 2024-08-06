"use client"

import { addEmploymentHistory, updateEmploymentHistory } from "@/lib/client/employmentHistory";
import { getSection, SectionEnums } from "@/lib/redux/reducers/sections";
import { useAppDispatch } from "@/lib/redux/store";
import { handleErrorResponse, ResponseStatus } from "@/lib/response";
import { EmploymentHistorySchema, EmploymentHistorySchemaType } from "@/types/form";
import { getDefaultValuesEmploymentHistory } from "@/util/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EmploymentHistory } from "@prisma/client";
import { useForm } from "react-hook-form";

export default function(history?: EmploymentHistory) {
    const { actions } = getSection(SectionEnums.employment);
    const dispatch = useAppDispatch();
    const form = useForm<EmploymentHistorySchemaType>({ 
        resolver: zodResolver(EmploymentHistorySchema), 
        defaultValues: getDefaultValuesEmploymentHistory(history)
    });
    
    const editing = !!history;

    const save = async(employmentId: string, formData: EmploymentHistorySchemaType, onSave: () => void) => {        
        const response = history?.id ? await updateEmploymentHistory(history.id, employmentId, formData) : await addEmploymentHistory(employmentId, formData);

        if (response.status === ResponseStatus.success) {
            dispatch(actions.setSiblingItem(response.payload.history));
        }
        if (response.status === ResponseStatus.error) {
            return handleErrorResponse(response, form.setError);
        }
        onSave()
        if (!editing) form.reset();
    }

    return { save, form, editing }
}