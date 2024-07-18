"use client"

import useSkill from "@/hooks/useSkill";
import { Skill } from "@prisma/client";
import { FormEvent } from "react";

export default function FormSkill({ resumeId, skill, isEditing = false, onSave = () => {} }: { resumeId: string, skill?: Skill, isEditing?: boolean, onSave?: () => void }) {
    const { save } = useSkill();

    const onSubmit = async(event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        await save(resumeId, formData, skill?.id);
        if (isEditing) {
            onSave();
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <input type="text" name="name" defaultValue={skill?.name ?? ''} required />
            <button type="submit">{isEditing ? 'Save' : 'Add Skill'}</button>
        </form>
    )
}