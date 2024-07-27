"use client"

import { InputText, SubmitButton } from '@/components/form';
import { SubmitHandler } from "react-hook-form";
import { handleErrorResponse, ResponseStatus } from "@/lib/response";
import { useStrengthForm } from "@/hooks";
import { StrengthSchemaType } from "@/types/strength";

export default function FormStrength({ resumeId, strengthId, onSave = () => {} }: { resumeId: string, strengthId?: string, onSave?: () => void }) {
    const { save, register, handleSubmit, setError, reset, formState: { isSubmitting, errors }} = useStrengthForm(strengthId);
    const editing = !!strengthId;
    
    const onSubmit: SubmitHandler<StrengthSchemaType> = async(data) => {
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
                <InputText label="Name" disabled={isSubmitting} error={errors.name?.message} {...register('name')} required />
                <SubmitButton label={editing ? 'Save' : 'Add Strength'} disabled={isSubmitting} />
            </form>
        </div>
    );
}