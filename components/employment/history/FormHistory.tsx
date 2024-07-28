"use client"

import { useEmploymentHistoryForm } from "@/hooks/form";
import { InputText, InputTypeEnum, RichTextEditor, SubmitButton } from "@/components/form";
import { EmploymentHistorySchemaType } from "@/types/form";
import { SubmitHandler } from "react-hook-form";
import { handleErrorResponse, ResponseStatus } from "@/lib/response";
import { EmploymentHistory } from "@prisma/client";

export default function FormHistory({ employmentId, history, onSave = () => {} }: { employmentId: string, history?: EmploymentHistory, onSave?: () => void }) {
    const { save, register, handleSubmit, setError, reset, control, formState: { isSubmitting, errors }} = useEmploymentHistoryForm(employmentId, history);
    const editing = !!history;

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
                <InputText label="Title" disabled={isSubmitting} error={errors.title} {...register('title')} required />

                <div className="grid grid-cols-2 gap-5">
                    <InputText type={InputTypeEnum.date} label="Start Date" disabled={isSubmitting} error={errors.startDate} {...register('startDate')} required />
                    <InputText type={InputTypeEnum.date} label="End Date" disabled={isSubmitting} error={errors.endDate} {...register('endDate')} />
                </div>
                <RichTextEditor<EmploymentHistorySchemaType> name="description" control={control} />

                <SubmitButton label={editing ? 'Save' : 'Add Employment History'} disabled={isSubmitting} />
            </form>
        </div>
    );
}