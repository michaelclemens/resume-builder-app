"use client"

import useStrength from "@/hooks/useStrength";
import { Strength } from "@prisma/client";

export default function FormStrength({ resumeId, strength, isEditing = false, onSave = () => {} }: { resumeId: string, strength?: Strength, isEditing?: boolean, onSave?: () => void }) {
    const { save } = useStrength();
    
    async function submitFormAction(formData: FormData) {
        await save(resumeId, formData, strength?.id);
        if (isEditing) {
            onSave();
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