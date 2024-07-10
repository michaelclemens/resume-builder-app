"use client"

import useSkill from "@/hooks/useSkill";
import { Skill } from "@prisma/client";

export default function FormSkill({ resumeId, skill, isEditing = false, onSave = () => {} }: { resumeId: string, skill?: Skill, isEditing?: boolean, onSave?: () => void }) {
    const { save } = useSkill();

    async function submitFormAction(formData: FormData) {
        await save(resumeId, formData, skill?.id);
        if (isEditing) {
            onSave();
        }
    }

    return (
        <div>
            <form action={submitFormAction}>
                <input type="text" name="name" defaultValue={skill?.name ?? ''} required />
                <button type="submit">{isEditing ? 'Save' : 'Add Skill'}</button>
            </form>
        </div>
    );
}