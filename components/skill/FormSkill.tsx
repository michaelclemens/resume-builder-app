"use client"

import useSkill from "@/hooks/useSkill";
import { Skill } from "@prisma/client";
import { FormEvent, useState } from "react";
import { InputText, SubmitButton } from '@/components/form';

export default function FormSkill({ resumeId, skill, isEditing = false, onSave = () => {} }: { resumeId: string, skill?: Skill, isEditing?: boolean, onSave?: () => void }) {
    const { save } = useSkill();
    const [saving, setSaving] = useState(false);

    const onSubmit = async(event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSaving(true);
        try {
            const formData = new FormData(event.currentTarget);
            await save(resumeId, formData, skill?.id);
            if (isEditing) { onSave() }
        } catch(error) {
            console.error(error)
        } finally {
            setSaving(false);
        }
    }

    return (
        <div className="mt-3 bg-gray-100 p-3 rounded-lg">
            <form onSubmit={onSubmit}>
                <InputText name="name" label="Name" defaultValue={skill?.name} required disabled={saving} />
                <SubmitButton label={isEditing ? 'Save' : 'Add Skill'} disabled={saving} />
            </form>
        </div>
    )
}