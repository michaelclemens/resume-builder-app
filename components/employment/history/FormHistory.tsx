"use client"

import { useEmploymentHistoryForm } from "@/hooks";
import { InputText, InputTypeEnum, SubmitButton } from "@/components/form";
import { EmploymentHistorySchemaType } from "@/types/employment";
import { SubmitHandler } from "react-hook-form";
import { handleErrorResponse, ResponseStatus } from "@/lib/response";

export default function FormHistory({ employmentId, historyId, onSave = () => {} }: { employmentId: string, historyId?: string, onSave?: () => void }) {
    const { save, register, handleSubmit, setError, reset, formState: { isSubmitting, errors }} = useEmploymentHistoryForm(employmentId, historyId);
    const editing = !!historyId;

    const onSubmit: SubmitHandler<EmploymentHistorySchemaType> = async(data) => {
        const response = await save(employmentId, data);

        if (response.status === ResponseStatus.error) {
            return handleErrorResponse(response, setError);
        }
        onSave();
        if (!editing) reset();
    }

    return (
        <div className="mt-3 mx-1 mb-1 bg-gray-50 p-3 rounded-lg ring-1 ring-slate-700/10">
            <form onSubmit={handleSubmit(onSubmit)}>
                <InputText label="Title" disabled={isSubmitting} error={errors.title?.message} {...register('title')} required />

                <div className="grid grid-cols-2 gap-5">
                    <InputText type={InputTypeEnum.date} label="Start Date" disabled={isSubmitting} error={errors.startDate?.message} {...register('startDate')} required />
                    <InputText type={InputTypeEnum.date} label="End Date" disabled={isSubmitting} error={errors.endDate?.message} {...register('endDate')} />
                </div>
                <InputText type={InputTypeEnum.rte} label="Descripition" disabled={isSubmitting} error={errors.description?.message} {...register('description')} />

                <SubmitButton label={editing ? 'Save' : 'Add Employment History'} disabled={isSubmitting} />
            </form>
        </div>
    );
}