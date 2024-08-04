"use client"

import { addEmploymentHistory, updateEmploymentHistory } from "@/lib/client/employmentHistory";
import { setEmploymentHistory } from "@/lib/redux/reducers/employment";
import { useAppDispatch } from "@/lib/redux/store";
import { handleErrorResponse, ResponseStatus } from "@/lib/response";
import { EmploymentHistorySchema, EmploymentHistorySchemaType } from "@/types/form";
import { getDisplayDateFromDate } from "@/util/date";
import { zodResolver } from "@hookform/resolvers/zod";
import { EmploymentHistory } from "@prisma/client";
import { useForm } from "react-hook-form";

export default function(history?: EmploymentHistory) {
    const dispatch = useAppDispatch();
    const form = useForm<EmploymentHistorySchemaType>({ resolver: zodResolver(EmploymentHistorySchema), defaultValues: {
        title: history?.title ?? '',
        startDate: getDisplayDateFromDate(history?.startDate) ?? '',
        endDate: history?.endDate ? getDisplayDateFromDate(history?.endDate) : '',
        description: history?.description ?? '',
    }});
    
    const editing = !!history;

    const save = async(employmentId: string, formData: EmploymentHistorySchemaType, onSave: () => void) => {
        const response = history?.id ? await updateEmploymentHistory(history.id, employmentId, formData) : await addEmploymentHistory(employmentId, formData);

        if (response.status === ResponseStatus.success) {
            dispatch(setEmploymentHistory(response.payload.history));
        }
        if (response.status === ResponseStatus.error) {
            return handleErrorResponse(response, form.setError);
        }
        onSave()
        if (!editing) form.reset();
    }

    return { history, save, form, editing }
}