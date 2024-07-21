"use client"

import { useStrength } from "@/hooks";
import { Strength } from "@prisma/client";
import { FormEvent, useState } from "react";
import { InputText, SubmitButton } from '@/components/form';

export default function FormStrength({ resumeId, strength, editing = false, onSave = () => {} }: { resumeId: string, strength?: Strength, editing?: boolean, onSave?: () => void }) {
    const { save } = useStrength();
    const [saving, setSaving] = useState(false);
    
    const onSubmit = async(event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSaving(true);
        try {
            const formData = new FormData(event.currentTarget);
            await save(resumeId, formData, strength?.id);
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
                <InputText name="name" label="Name" defaultValue={strength?.name} required disabled={saving} />
                <SubmitButton label={editing ? 'Save' : 'Add Strength'} disabled={saving} />
            </form>
        </div>
    );
}