"use client"

import useEmployment from "@/hooks/useEmployment";
import { Employment } from "@prisma/client";

export default function FormEmployment({ resumeId, employment, isEditing = false, onSave = () => {} }: { resumeId: string, employment?: Employment, isEditing?: boolean, onSave?: () => void }) {
    const { save } = useEmployment();

    async function submitFormAction(formData: FormData) {
        await save(resumeId, formData, employment?.id);
        if (isEditing) {
            onSave();
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