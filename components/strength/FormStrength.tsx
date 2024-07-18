"use client"

import useStrength from "@/hooks/useStrength";
import { Strength } from "@prisma/client";
import { FormEvent } from "react";

export default function FormStrength({ resumeId, strength, isEditing = false, onSave = () => {} }: { resumeId: string, strength?: Strength, isEditing?: boolean, onSave?: () => void }) {
    const { save } = useStrength();
    
    const onSubmit = async(event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        await save(resumeId, formData, strength?.id);
        if (isEditing) {
            onSave();
        }
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="text" name="name" defaultValue={strength?.name ?? ''} required />
                <button type="submit">{isEditing ? 'Save' : 'Add Strength'}</button>
            </form>
        </div>
    );
}