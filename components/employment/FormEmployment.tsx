"use client"

import { useEmploymentForm } from "@/hooks";
import { InputText, SubmitButton } from "@/components/form";
import { handleErrorResponse, ResponseStatus } from "@/lib/response";
import { EmploymentSchemaType } from "@/types/employment";
import { SubmitHandler } from "react-hook-form";

export default function FormEmployment({ resumeId, employmentId, onSave = () => {} }: { resumeId: string, employmentId?: string, onSave?: () => void }) {
    const { save, register, handleSubmit, setError, reset, formState: { isSubmitting, errors }} = useEmploymentForm(employmentId);
    const editing = !!employmentId;

    const onSubmit: SubmitHandler<EmploymentSchemaType> = async(data) => {
        const response = await save(resumeId, data);

        if (response.status === ResponseStatus.error) {
            return handleErrorResponse(response, setError);
        }
        onSave();
        if (!editing) reset();
    }

    return (
        <div className="my-3 mx-1 bg-gray-50 p-3 rounded-lg ring-1 ring-slate-700/10">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-2 gap-5">
                    <InputText label="Employer" disabled={isSubmitting} error={errors.employer?.message} {...register('employer')} required />
                    <InputText label="City" disabled={isSubmitting} error={errors.city?.message} {...register('city')} />
                </div>

                <SubmitButton label={editing ? 'Save' : 'Add Employment'} disabled={isSubmitting} />
            </form>
        </div>
    );
}