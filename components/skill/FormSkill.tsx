"use client"

import { addSkill, updateSkill } from "@/lib/client/skill";
import { Skill } from "@prisma/client";

export default function FormSkill({ resumeId, skill, isEditing = false, onSave = () => {} }: { resumeId: string, skill?: Skill, isEditing?: boolean, onSave?: () => void }) {
    async function submitFormAction(formData: FormData) {
        if (isEditing && skill?.id) {
            await updateSkill(skill?.id, resumeId, formData);
            onSave();
        } else {
            await addSkill(resumeId, formData);
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