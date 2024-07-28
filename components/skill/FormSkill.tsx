"use client"

import { useSkillForm } from "@/hooks/form";
import { InputText, SubmitButton } from '@/components/form';
import { SkillSchemaType } from "@/types/form";
import { SubmitHandler } from "react-hook-form";
import { handleErrorResponse, ResponseStatus } from "@/lib/response";
import { Skill } from "@prisma/client";

export default function FormSkill({ resumeId, skill, onSave = () => {} }: { resumeId: string, skill?: Skill, onSave?: () => void }) {
    const { save, register, handleSubmit, setError, reset, formState: { isSubmitting, errors }} = useSkillForm(skill);
    const editing = !!skill;

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
                <InputText label="Name" disabled={isSubmitting} error={errors.name} {...register('name')} required />
                <SubmitButton label={editing ? 'Save' : 'Add Skill'} disabled={isSubmitting} />
            </form>
        </div>
    )
}