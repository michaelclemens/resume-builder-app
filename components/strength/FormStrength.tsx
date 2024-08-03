"use client"

import { InputText, SubmitButton } from '@/components/form';
import { SubmitHandler } from "react-hook-form";
import { handleErrorResponse, ResponseStatus } from "@/lib/response";
import { useStrengthForm } from "@/hooks/form";
import { StrengthSchemaType } from "@/types/form";
import { Strength } from '@prisma/client';

export default function FormStrength({ resumeId, strength, onSave = () => {} }: { resumeId: string, strength?: Strength, onSave?: () => void }) {
    const { save, form: { register, handleSubmit, setError, reset, formState: { isSubmitting, errors }}} = useStrengthForm(strength);
    const editing = !!strength;
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
            <form role="form" onSubmit={handleSubmit(onSubmit)}>
                <InputText label="Name" disabled={isSubmitting} error={errors.name} {...register('name')} required />
                <SubmitButton label={editing ? 'Save' : 'Add Strength'} disabled={isSubmitting} />
            </form>
        </div>
    );
}