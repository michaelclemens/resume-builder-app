"use client"

import { addEducationAction, updateEducationAction } from "@/lib/client/education";
import { Education } from "@prisma/client";

export default function FormEducation({ resumeId, education, isEditing = false, onSave = () => {} }: { resumeId: string, education?: Education, isEditing?: boolean, onSave?: () => void }) {
    async function submitFormAction(formData: FormData) {
        if (isEditing && education?.id) {
            await updateEducationAction(education?.id, resumeId, formData);
            onSave();
        } else {
            await addEducationAction(resumeId, formData);
        }
    }

    return (
        <div>
            <form action={submitFormAction}>
                <label htmlFor="school">School:</label>
                <input type="text" name="school" defaultValue={education?.school ?? ''} required />

                <label htmlFor="degree">Degree:</label>
                <input type="text" name="degree" defaultValue={education?.degree ?? ''} required />

                <label htmlFor="start_date">Start & End Date:</label>
                <input type="date" name="start_date" defaultValue={education?.startDate ? new Date(education.startDate).toISOString().substring(0, 10) : ''} required />
                <input type="date" name="end_date" defaultValue={education?.endDate ? new Date(education.endDate).toISOString().substring(0, 10) : ''} />

                <label htmlFor="city">City:</label>
                <input type="text" name="city" defaultValue={education?.city ?? ''} />

                <label htmlFor="description">Descripition:</label>
                <textarea name="description" rows={3} defaultValue={education?.description ?? ''} />

                <button type="submit">{isEditing ? 'Save' : 'Add Education'}</button>
            </form>
        </div>
    );
}