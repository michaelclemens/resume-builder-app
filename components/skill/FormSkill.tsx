"use client"

import useSkill from "@/hooks/useSkill";
import { Skill } from "@prisma/client";
import { FormEvent, useState } from "react";
import { InputText, SubmitButton } from '@/components/form';

export default function FormSkill({ resumeId, skill, editing = false, onSave = () => {} }: { resumeId: string, skill?: Skill, editing?: boolean, onSave?: () => void }) {
    const { save } = useSkill();
    const [saving, setSaving] = useState(false);

    const onSubmit = async(event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSaving(true);
        try {
            const formData = new FormData(event.currentTarget);
            await save(resumeId, formData, skill?.id);
            onSave();
        } catch(error) {
            console.error(error)
        } finally {
            setSaving(false);
        }
    }

    return (
        <div className="my-3 mx-1 bg-gray-50 p-3 rounded-lg ring-1 ring-slate-700/10">
            <form onSubmit={onSubmit}>
                <InputText name="name" label="Name" defaultValue={skill?.name} required disabled={saving} />
                <SubmitButton label={editing ? 'Save' : 'Add Skill'} disabled={saving} />
            </form>
        </div>
    )
}