"use client"

import { useSkillForm } from "@/hooks";
import { InputText, SubmitButton } from '@/components/form';
import { SkillSchemaType } from "@/types/skill";
import { SubmitHandler } from "react-hook-form";
import { handleErrorResponse, ResponseStatus } from "@/lib/response";

export default function FormSkill({ resumeId, skillId, onSave = () => {} }: { resumeId: string, skillId?: string, onSave?: () => void }) {
    const { save, register, handleSubmit, setError, reset, formState: { isSubmitting, errors }} = useSkillForm(skillId);
    const editing = !!skillId;

    const onSubmit: SubmitHandler<SkillSchemaType> = async(data) => {
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
                <SubmitButton label={editing ? 'Save' : 'Add Skill'} disabled={isSubmitting} />
            </form>
        </div>
    )
}