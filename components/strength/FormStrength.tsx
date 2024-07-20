"use client"

import useStrength from "@/hooks/useStrength";
import { Strength } from "@prisma/client";
import { FormEvent, useState } from "react";
import { InputText, SubmitButton } from '@/components/form';

export default function FormStrength({ resumeId, strength, isEditing = false, onSave = () => {} }: { resumeId: string, strength?: Strength, isEditing?: boolean, onSave?: () => void }) {
    const { save } = useStrength();
    const [saving, setSaving] = useState(false);
    
    const onSubmit = async(event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSaving(true);
        try {
            const formData = new FormData(event.currentTarget);
            await save(resumeId, formData, strength?.id);
            if (isEditing) { onSave() }
        } catch(error) {
            console.error(error)
        } finally {
            setSaving(false);
        } 
    }

    return (
        <div className="mt-3 bg-gray-50 p-3 rounded-lg">
            <form onSubmit={onSubmit}>
                <InputText name="name" label="Name" defaultValue={strength?.name} required disabled={saving} />
                <SubmitButton label={isEditing ? 'Save' : 'Add Strength'} disabled={saving} />
            </form>
        </div>
    );
}