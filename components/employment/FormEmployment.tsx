"use client"

import { addEmploymentAction, updateEmploymentAction } from "@/lib/client/employment";
import { Employment } from "@prisma/client";

export default function FormEmployment({ resumeId, employment, isEditing = false, onSave = () => {} }: { resumeId: string, employment?: Employment, isEditing?: boolean, onSave?: () => void }) {
    async function submitFormAction(formData: FormData) {
        if (isEditing && employment?.id) {
            await updateEmploymentAction(employment?.id, resumeId, formData);
            onSave();
        } else {
            await addEmploymentAction(resumeId, formData);
        }
    }

    return (
        <div>
            <form action={submitFormAction}>
                <label htmlFor="employer">Employer:</label>
                <input type="text" name="employer" defaultValue={employment?.employer ?? ''} required />

                <label htmlFor="city">City:</label>
                <input type="text" name="city" defaultValue={employment?.city ?? ''} />

                <button type="submit">{isEditing ? 'Save' : 'Add Employment'}</button>
            </form>
        </div>
    );
}