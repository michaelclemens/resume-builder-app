"use client"

import { addStrength, updateStrength } from "@/lib/client/strength";
import { Strength } from "@prisma/client";

export default function FormStrength({ resumeId, strength, isEditing = false, onSave = () => {} }: { resumeId: string, strength?: Strength, isEditing?: boolean, onSave?: () => void }) {
    async function submitFormAction(formData: FormData) {
        if (isEditing && strength?.id) {
            await updateStrength(strength?.id, resumeId, formData);
            onSave();
        } else {
            await addStrength(resumeId, formData);
        }
    }

    return (
        <div>
            <form action={submitFormAction}>
                <input type="text" name="name" defaultValue={strength?.name ?? ''} required />
                <button type="submit">{isEditing ? 'Save' : 'Add Strength'}</button>
            </form>
        </div>
    );
}