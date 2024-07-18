"use client"

import useEmployment from "@/hooks/useEmployment";
import { Employment } from "@prisma/client";
import { FormEvent } from "react";

export default function FormEmployment({ resumeId, employment, isEditing = false, onSave = () => {} }: { resumeId: string, employment?: Employment, isEditing?: boolean, onSave?: () => void }) {
    const { save } = useEmployment();

    const onSubmit = async(event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        await save(resumeId, formData, employment?.id);
        if (isEditing) {
            onSave();
        }
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <label htmlFor="employer">Employer:</label>
                <input type="text" name="employer" defaultValue={employment?.employer ?? ''} required />

                <label htmlFor="city">City:</label>
                <input type="text" name="city" defaultValue={employment?.city ?? ''} />

                <button type="submit">{isEditing ? 'Save' : 'Add Employment'}</button>
            </form>
        </div>
    );
}